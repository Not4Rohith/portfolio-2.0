import { NextResponse, NextRequest } from 'next/server';
import { userAgent } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Get IP directly from Vercel headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'Unknown IP';
    
    // 2. Use VERCEL'S NATIVE Geolocation headers (No 3rd party API needed!)
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';
    const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown Region';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';

    // 3. Grab the Referer and User-Agent
    const referer = req.headers.get('referer') || 'Direct Visit';
    const { device, browser, os } = userAgent(req);
    
    const deviceInfo = [
      os.name ? `${os.name} ${os.version || ''}` : 'Unknown OS',
      browser.name ? `${browser.name} ${browser.version || ''}` : 'Unknown Browser',
      device.type ? `(${device.type})` : '(Desktop)'
    ].join(' • ');

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;
    if (!webhookUrl) return NextResponse.json({ error: 'No webhook URL' }, { status: 500 });

    // 4. Construct the message
    const message = {
      content: `👀 **New Portfolio Visitor!**`,
      embeds: [{
        title: `Visitor Insights`,
        color: 5814783,
        fields: [
          { name: '📍 Location', value: `${city}, ${region}, ${country}`, inline: true },
          { name: '🌐 IP Address', value: ip, inline: true },
          { name: '🔗 Came From', value: referer, inline: false },
          { name: '💻 Device & OS', value: deviceInfo, inline: false },
        ],
        footer: { text: `Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}` }
      }]
    };

    // 5. Send to Discord
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