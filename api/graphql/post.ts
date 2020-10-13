import { extendType, objectType, stringArg } from "@nexus/schema";

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
      resolve(_root, _args, ctx) {
        return ctx.db.posts.filter((p) => p.published === false);
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDraft", {
      type: "Post",
      nullable: false,
      args: {
        title: stringArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        const draft = {
          id: ctx.db.posts.length + 1,
          title: args.title,
          body: args.body,
          published: false,
        };
        ctx.db.posts.push(draft);
        return draft;
      },
    });
  },
});
