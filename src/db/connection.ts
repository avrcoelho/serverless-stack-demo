import { MongoClient, Db } from "mongodb";

let cachedDb: Db;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(String(process.env.MONGODB_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = client.db("serverless-stack-demo");

  return cachedDb;
}
