import { MongoClient } from "mongodb";
import { defaultContent } from "../src/lib/content/defaults";

/* npm run db:seed - writes the default content document once. Never overwrites
   an existing document (so admin edits are safe). */
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  const col = client.db(process.env.MONGODB_DB || "epigrotive").collection<{ _id: string; data: unknown }>("content");
  const r = await col.updateOne({ _id: "site" }, { $setOnInsert: { data: defaultContent } }, { upsert: true });
  console.log(r.upsertedCount ? "Seeded content document (_id: site)." : "Content document already exists - left untouched.");
  await client.db(process.env.MONGODB_DB || "epigrotive").collection("submissions").createIndex({ createdAt: -1 });
} catch (e) {
  console.error("Seed failed:", (e instanceof Error ? e.message : String(e)).replace(/mongodb(\+srv)?:\/\/[^\s]+/g, "<uri>"));
  process.exitCode = 1;
} finally {
  await client.close();
}
