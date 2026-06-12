import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, method } = body as {
      email?: string;
      amount?: string;
      method?: string;
    };

    if (!email || !amount || !method) {
      return NextResponse.json(
        { error: "email, amount, and method are required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "server misconfigured" },
        { status: 500 }
      );
    }

    const content = [
      `💰 **new donation!**`,
      `**email:** ${email}`,
      `**amount:** $${amount}`,
      `**method:** ${method}`,
    ].join("\n");

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "failed to send notification" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "unexpected error" },
      { status: 500 }
    );
  }
}
