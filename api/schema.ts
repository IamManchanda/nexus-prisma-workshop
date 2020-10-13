import { makeSchema } from "@nexus/schema";
import { join } from "path";
import * as typeDefs from "./graphql";

export const schema = makeSchema({
  types: typeDefs,
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"), // 2
    schema: join(__dirname, "..", "schema.graphql"), // 3
  },
});
