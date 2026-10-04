import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
export const hasMongo = Boolean(uri);

const g = globalThis as unknown as { _mongo?: Promise<MongoClient> };

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!g._mongo) {
    // a failed attempt must not stay cached, or every later call would fail until a restart
    const p = new MongoClient(uri, { serverSelectionTimeoutMS: 4000 }).connect();
    p.catch(() => {
      if (g._mongo === p) g._mongo = undefined;
    });
    g._mongo = p;
  }
  const client = await g._mongo;
  return client.db(process.env.MONGODB_DB || "epigrotive");
}
