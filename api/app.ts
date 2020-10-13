import { makeSchema } from "@nexus/schema";
import { join } from "path";
import { ApolloServer } from "apollo-server";
import * as typeDefs from "./graphql";

const schema = makeSchema({
  types: typeDefs,
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
