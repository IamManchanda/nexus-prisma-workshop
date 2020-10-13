import { createTestContext } from "./__helpers";
const ctx = createTestContext();

it("ensures that a draft can be created and published", async () => {
  const draftResult = await ctx.client.request(`
    mutation createDraft {
      createDraft(title: "Nexus", body: "...") {
        id
        title
        body
        published
      }
    }
  `);
  expect(draftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "body": "...",
        "id": 1,
        "published": false,
        "title": "Nexus",
      },
    }
  `);

  const publishResult = await ctx.client.request(
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
      id: draftResult.createDraft.id,
    },
  );
  expect(publishResult).toMatchInlineSnapshot(`
    Object {
      "publishDraft": Object {
        "body": "...",
        "id": 1,
        "published": true,
        "title": "Nexus",
      },
    }
  `);
});
