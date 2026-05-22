import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_ACCESS_KEY = "74e796bd-b826-4813-b4d3-6ba67f87d553";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `CP3 Contact: ${subject || "New message"}`,
        from_name: "CP3 Family Legacy Foundation Website",
        name,
        email,
        message,
        replyto: email,
      }),
    });

    const result = await web3FormsResponse.json();

    if (!web3FormsResponse.ok || !result.success) {
      throw new Error(result.message || `Web3Forms failed with status ${web3FormsResponse.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
