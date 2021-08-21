import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { connectToDatabase } from "./db/connection";

export const handler: APIGatewayProxyHandlerV2 = async (_, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  const list = await db.collection("list").find().sort().toArray();

  return {
    statusCode: 200,
    body: JSON.stringify(list, null, 2),
  };
};
