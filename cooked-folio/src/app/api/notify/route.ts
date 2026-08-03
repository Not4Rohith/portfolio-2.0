import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // You will need to add this to your .env file!
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;

    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
    }

    const message = {
      content: `🚨 New Portfolio Visitor!`,
      embeds: [{
        title: `Connection Details`,
        color: 5814783,
        fields: [
          { name: 'IP Address', value: data.ip || 'Unknown', inline: true },
          { name: 'Location', value: `${data.city || 'Unknown City'}, ${data.country_name || 'Unknown Country'}`, inline: true },
          { name: 'ISP', value: data.org || 'Unknown', inline: false }
        ]
      }]
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}