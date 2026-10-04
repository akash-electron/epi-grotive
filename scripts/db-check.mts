import { MongoClient } from "mongodb";

/* npm run db:check - connects, pings, lists collections. Never prints the URI. */
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}
const dbName = process.env.MONGODB_DB || "epigrotive";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  const db = client.db(dbName);
  await db.command({ ping: 1 });
  const cols = (await db.listCollections().toArray()).map((c) => c.name);
  console.log(`Connected. Database "${dbName}". Collections: ${cols.join(", ") || "(none yet)"}`);
} catch (e) {
  const m = e instanceof Error ? e.message : String(e);
  console.error("Connection failed:", m.replace(/mongodb(\+srv)?:\/\/[^\s]+/g, "<uri>"));
  if (/ENOTFOUND|ECONNREFUSED|timed out|Server selection/i.test(m))
    console.error("Hint: in Atlas, add this machine's IP under Network Access, and check the cluster host.");
  if (/auth/i.test(m)) console.error("Hint: check the database user and password.");
  process.exitCode = 1;
} finally {
  await client.close();
}
