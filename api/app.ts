import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { db } from "./db";

const server = new ApolloServer({
  schema,
  context: () => ({ db }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
