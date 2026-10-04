import { getDb, hasMongo } from "@/lib/mongo";

/* Stores each message in MongoDB collection "submissions":
   { name, email, message, createdAt, ip, userAgent, read: false }.
   Without MONGODB_URI it only logs, so local dev still works. */

const LIMITS = { name: 100, email: 254, message: 2000 };
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip))
    return Response.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (
    !name || !message ||
    name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });

  const doc = {
    name,
    email,
    message,
    createdAt: new Date(),
    ip,
    userAgent: (request.headers.get("user-agent") ?? "").slice(0, 300),
    read: false,
  };

  if (!hasMongo) {
    console.log("Contact submission (no MONGODB_URI, not stored):", { name, email, message });
    return Response.json({ ok: true });
  }
  try {
    await (await getDb()).collection("submissions").insertOne(doc);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("contact: could not store submission:", e);
    return Response.json({ ok: false, error: "Could not send your message. Please try again." }, { status: 503 });
  }
}
