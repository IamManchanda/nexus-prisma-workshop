import { createTestContext } from "./__helpers";
const ctx = createTestContext();

it("ensures that a draft can be created and published as a post", async () => {
  const createDraftResult = await ctx.client.request(`
    mutation createDraft {
      createDraft(title: "Nexus", body: "...") {
        id
        title
        body
        published
      }
    }
  `);
  expect(createDraftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "body": "...",
        "id": 1,
        "published": false,
        "title": "Nexus",
      },
    }
  `);

  const fetchDraftsResult = await ctx.client.request(`
    query fetchDrafts {
      drafts {
        id
        title
        body
        published
      }
    }
  `);
  expect(fetchDraftsResult).toMatchInlineSnapshot(`
    Object {
      "drafts": Array [
        Object {
          "body": "...",
          "id": 1,
          "published": false,
          "title": "Nexus",
        },
      ],
    }
  `);

  const publishDraftResult = await ctx.client.request(
    `
    mutation publishDraft($id: Int!) {
      publishDraft(id: $id) {
        id
        title
        body
        published
      }
    }
  `,
    {
      id: createDraftResult.createDraft.id,
    },
  );
  expect(publishDraftResult).toMatchInlineSnapshot(`
    Object {
      "publishDraft": Object {
        "body": "...",
        "id": 1,
        "published": true,
        "title": "Nexus",
      },
    }
  `);

  const fetchPostsResult = await ctx.client.request(`
    query fetchPosts {
      posts {
        id
        title
        body
        published
      }
    }
  `);
  expect(fetchPostsResult).toMatchInlineSnapshot(`
    Object {
      "posts": Array [
        Object {
          "body": "...",
          "id": 1,
          "published": true,
          "title": "Nexus",
        },
      ],
    }
  `);

  const fetchDraftsResultAgain = await ctx.client.request(`
    query fetchDrafts {
      drafts {
        id
        title
        body
        published
      }
    }
  `);

  expect(fetchDraftsResultAgain).toMatchInlineSnapshot(`
    Object {
      "drafts": Array [],
    }
  `);
});
