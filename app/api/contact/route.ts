import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/data";
import { buildMailto, validateContact, type ContactPayload } from "@/lib/contact";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Best-effort per-instance rate limit to deter spam bursts. */
function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields; pretend success so they don't retry.
  if (body.company) return NextResponse.json({ success: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later or email me directly." },
      { status: 429 }
    );
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    subject: body.subject!.trim(),
    message: body.message!.trim(),
  };

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // No mail provider configured: let the client open the visitor's email app instead.
    return NextResponse.json({ fallback: true, mailto: buildMailto(siteConfig.email, payload) });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        ...payload,
        subject: `[Portfolio] ${payload.subject}`,
        from_name: payload.name,
        replyto: payload.email,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await response.json().catch(() => ({}))) as { success?: boolean };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: "The message couldn't be delivered. Please email me directly." },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please email me directly." },
      { status: 500 }
    );
  }
}
