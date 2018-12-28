import { acceptance } from "helpers/qunit-helpers";

acceptance("DiscourseUsExtras", { loggedIn: true });

test("DiscourseUsExtras works", async assert => {
  await visit("/admin/plugins/discourse-us-extras");

  assert.ok(false, "it shows the DiscourseUsExtras button");
});
