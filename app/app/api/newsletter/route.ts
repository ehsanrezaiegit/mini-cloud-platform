import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    let body: { email?: unknown; company?: unknown };

    try {
      body = (await request.json()) as { email?: unknown; company?: unknown };
    } catch {
      return NextResponse.json({ ok: false, message: "Valid email required." }, { status: 400 });
    }

    if (typeof body.company === "string" && body.company.trim()) {
      return NextResponse.json({
        ok: true,
        message: "You're subscribed.",
      });
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!emailPattern.test(email)) {
      return NextResponse.json({ ok: false, message: "Valid email required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { ok: false, message: "Newsletter service is not configured yet." },
        { status: 503 },
      );
    }

    const resendResponse = await fetch(
      `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    if (resendResponse.ok || resendResponse.status === 409) {
      return NextResponse.json({
        ok: true,
        message: "You're subscribed.",
      });
    }

    const errorText = await resendResponse.text().catch(() => "");

    console.error("Resend newsletter subscription failed", {
      status: resendResponse.status,
      body: errorText,
    });

    return NextResponse.json({
      ok: false,
      message: "Newsletter signup is temporarily unavailable.",
    }, { status: 502 });
  } catch (error) {
    console.error("Newsletter POST failed", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
