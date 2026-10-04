import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
export const hasMongo = Boolean(uri);

const g = globalThis as unknown as { _mongo?: Promise<MongoClient> };

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  g._mongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 4000 }).connect();
  const client = await g._mongo;
  return client.db(process.env.MONGODB_DB || "epigrotive");
}
