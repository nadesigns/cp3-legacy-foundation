import { NextRequest, NextResponse } from "next/server";
import { baseballCampRegistrationSchema } from "@/lib/baseballCampRegistration";

const ZAPIER_CAMP_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/27698242/4owek6n/";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = baseballCampRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
    }

    const data = parsed.data;

    const webhookResponse = await fetch(ZAPIER_CAMP_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        type: "camp_registration",
        ...data,
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Zapier webhook failed with status ${webhookResponse.status}`);
    }

    const recipient = process.env.CAMP_REGISTRATION_EMAIL;

    if (process.env.RESEND_API_KEY && recipient) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const rows: Array<[string, string]> = [
        ["Camper", `${data.firstName} ${data.middleName ?? ""} ${data.lastName}`.replace(/\s+/g, " ").trim()],
        ["Address", data.address],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Gender", data.gender],
        ["Birthdate", data.birthdate],
        ["Grade", data.grade],
        ["School", data.school],
        ["Medical notes", data.medicalNotes || "None provided"],
        ["Emergency contact", data.emergencyName],
        ["Emergency phone", data.emergencyPhone],
        ["Guardian", data.guardianName],
        ["Guardian cell", data.guardianCell],
        ["Guardian home phone", data.guardianHomePhone || "Not provided"],
        ["Shirt size", data.shirtSize],
        ["Transportation", data.transportMethod],
        ["Authorized pickup", data.authorizedPickup || "Not provided"],
        ["Additional info", data.additionalInfo || "Not provided"],
        ["Insurance carrier / policy", data.insuranceCarrier],
        ["Medical conditions / protocol", data.medicalConditions || "Not provided"],
        ["Emergency treatment consent", data.emergencyConsent ? "Yes" : "No"],
        ["Parent release", data.parentRelease ? "Yes" : "No"],
        ["Guardian signature", data.guardianSignature],
        ["Signature date", data.signatureDate],
      ];

      await resend.emails.send({
        from: "CP3 Foundation <noreply@cp3legacyfoundation.com>",
        to: [recipient],
        replyTo: data.email,
        subject: `Baseball Camp Registration: ${data.firstName} ${data.lastName}`,
        html: `
          <h2>1Died4All Baseball Camp Registration</h2>
          <p>A new registration was submitted through the website.</p>
          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #d8d2c6;">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
              )
              .join("")}
          </table>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
