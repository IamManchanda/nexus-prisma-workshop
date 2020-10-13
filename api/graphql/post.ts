import { extendType, objectType } from "@nexus/schema";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("body");
    t.boolean("published");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("drafts", {
      nullable: false,
      type: "Post",
      list: true,
      resolve() {
        return [
          {
            id: 1,
            title: "Nexus",
            body: "Nexus was the first web browser and editor.",
            published: false,
          },
        ];
      },
    });
  },
});
