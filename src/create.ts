import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { connectToDatabase } from "./db/connection";

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  const item = await db.collection("list").insertOne({ item: event.body });

  return {
    statusCode: 200,
    body: JSON.stringify(item, null, 2),
  };
};
