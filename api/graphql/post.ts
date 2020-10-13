import { extendType, intArg, objectType, stringArg } from "@nexus/schema";

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
    t.list.field("drafts", {
      type: "Post",
      nullable: false,
      resolve(_root, _args, ctx) {
        return ctx.db.posts.filter((p) => p.published === false);
      },
    });

    t.list.field("posts", {
      type: "Post",
      nullable: false,
      resolve(_root, _args, ctx) {
        return ctx.db.posts.filter((p) => p.published === true);
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

    t.field("publishDraft", {
      type: "Post",
      nullable: false,
      args: {
        id: intArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        let draftToPublish = ctx.db.posts.find((p) => p.id === args.id);
        if (!draftToPublish) {
          throw new Error("Could not find draft with id " + args.id);
        }
        draftToPublish.published = true;
        return draftToPublish;
      },
    });
  },
});
