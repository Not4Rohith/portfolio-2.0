import { NextResponse, NextRequest } from 'next/server';
import { userAgent } from 'next/server'; // Next.js built-in parser!

export async function POST(req: NextRequest) {
  try {
    // 1. Get the visitor's IP securely from the server headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : '8.8.8.8';
    
    // 2. Grab the Referer to see where they came from (LinkedIn, Twitter, etc.)
    const referer = req.headers.get('referer') || 'Direct Visit (Typed in URL)';

    // 3. Parse the User-Agent using Next.js's awesome built-in helper
    const { device, browser, os } = userAgent(req);
    
    // Format the device info nicely
    const deviceInfo = [
      os.name ? `${os.name} ${os.version || ''}` : 'Unknown OS',
      browser.name ? `${browser.name} ${browser.version || ''}` : 'Unknown Browser',
      device.type ? `(${device.type})` : '(Desktop)'
    ].join(' • ');

    // 4. Fetch geolocation data SERVER-SIDE
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;
    if (!webhookUrl) return NextResponse.json({ error: 'No webhook URL' }, { status: 500 });

    // 5. Construct the ultra-detailed (but server-side) message
    const message = {
      content: `👀 **New Portfolio Visitor!**`,
      embeds: [{
        title: `Visitor Insights`,
        color: 5814783,
        fields: [
          { name: '📍 Location', value: `${geoData.city || 'Unknown'}, ${geoData.country_name || 'Unknown'}`, inline: true },
          { name: '🏢 ISP', value: geoData.org || 'Unknown', inline: true },
          { name: '🔗 Came From (Referer)', value: referer, inline: false },
          { name: '💻 Device & OS', value: deviceInfo, inline: false },
        ],
        footer: { text: `Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}` }
      }]
    };

    // 6. Send to Discord
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