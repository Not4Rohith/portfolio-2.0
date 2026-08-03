import { NextResponse, NextRequest } from 'next/server';
import { userAgent } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Get the TRUE referrer from the frontend payload
    const body = await req.json().catch(() => ({}));
    let referer = body.referrer;
    
    // Clean up the referrer display for Discord
    if (!referer) {
      referer = 'Direct Visit (Typed in URL)';
    } else if (referer.includes('rohith-n-r-portfolio.vercel.app')) {
      referer = 'Internal Navigation / Refresh';
    }

    // 2. Get IP from Vercel headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'Unknown IP';
    
    // 3. Use Vercel's native headers for location
    const vCity = req.headers.get('x-vercel-ip-city');
    const city = vCity ? decodeURIComponent(vCity) : 'Unknown City'; 
    const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown Region';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';

    // 4. Grab User-Agent from Next.js helper
    const { device, browser, os } = userAgent(req);
    const deviceInfo = [
      os.name ? `${os.name} ${os.version || ''}` : 'Unknown OS',
      browser.name ? `${browser.name} ${browser.version || ''}` : 'Unknown Browser',
      device.type ? `(${device.type})` : '(Desktop)'
    ].join(' • ');

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;
    if (!webhookUrl) return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });

    // 5. Construct the message (ISP removed, keeping it lean)
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

    // 6. Ping Discord
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