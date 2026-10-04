import "server-only";
import { unstable_cache } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getDb, hasMongo } from "../mongo";
import { defaultContent } from "./defaults";
import { mergeWithDefaults } from "./merge";
import type { Content, SectionKey } from "./types";

/* Read-only. The separate admin product writes the content document to
   MongoDB (collection "content", _id "site", field `data`, keyed by section as
   in ./types). When MONGODB_URI is not set it reads .data/content.json. If the
   store is unreachable or a section is missing, the defaults are rendered.
   The admin calls POST /api/revalidate after every save (see below). */

const FILE = path.join(process.cwd(), ".data", "content.json");
export const CONTENT_TAG = "site-content";

type Saved = Partial<Record<SectionKey, unknown>>;

async function readSaved(): Promise<Saved> {
  if (hasMongo) {
    const db = await getDb();
    const doc = await db.collection<{ _id: string; data?: Saved }>("content").findOne({ _id: "site" });
    return doc?.data ?? {};
  }
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

/* Cached in Next's data cache with no expiry: Mongo is read once and the
   result is reused until the admin calls POST /api/revalidate. A failed read
   throws inside the cached function so the fallback is never cached. */
const cached = unstable_cache(async () => mergeWithDefaults(defaultContent, await readSaved()), ["site-content"], {
  tags: [CONTENT_TAG],
});

export async function getContent(): Promise<Content> {
  try {
    return await cached();
  } catch (e) {
    console.error("content: falling back to defaults:", e);
    return defaultContent;
  }
}
