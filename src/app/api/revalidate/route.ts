import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content/store";

/* Called by the admin product after it saves content:
   POST /api/revalidate with header `x-revalidate-secret: $REVALIDATE_SECRET`.
   Clears the cached content so the next visit reads MongoDB again. */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(secret ?? "");
  if (!secret || a.length !== b.length || !timingSafeEqual(a, b))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  revalidateTag(CONTENT_TAG, { expire: 0 });
  revalidatePath("/");
  // Next serves one stale response while it revalidates; take that hit here so
  // the first real visitor already gets the new content.
  await fetch(new URL("/", request.url), { cache: "no-store" }).catch(() => {});
  await fetch(new URL("/", request.url), { cache: "no-store" }).catch(() => {});
  return Response.json({ ok: true, at: Date.now() });
}
