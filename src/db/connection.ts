import * as mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
let cachedDb: any = null;

export async function connectToDatabase() {
  console.log(process.env.MONGODB_URI);
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(String(process.env.MONGODB_URI));
  cachedDb = await client.db("serverless-stack-demo");

  return cachedDb;
}
