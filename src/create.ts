import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { connectToDatabase } from "./db/connection";
import { itemValidator } from "./validators/item";

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const parsedBody = JSON.parse(String(event.body));
  const validator = await itemValidator(parsedBody);
  if (validator) {
    return {
      statusCode: 422,
      body: JSON.stringify(validator, null, 2),
    };
  }

  const db = await connectToDatabase();
  const item = await db.collection("list").insertOne({ item: parsedBody.item });

  return {
    statusCode: 200,
    body: JSON.stringify(item.ops[0], null, 2),
  };
};
