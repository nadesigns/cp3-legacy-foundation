import { NextRequest, NextResponse } from "next/server";
import { baseballCampRegistrationSchema } from "@/lib/baseballCampRegistration";

const CAMP_APPS_SCRIPT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzDXcuAQNH_zwuk2Xnr87V00vhz1egA6shMv6fzPk5hyzI_0uVTVNL9KfmtPcGMApCs/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = baseballCampRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
    }

    const data = parsed.data;

    const webhookResponse = await fetch(CAMP_APPS_SCRIPT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        type: "camp_registration",
        ...data,
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Apps Script webhook failed with status ${webhookResponse.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
