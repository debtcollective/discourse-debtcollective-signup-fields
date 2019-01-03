import { acceptance } from "helpers/qunit-helpers";

acceptance("DiscourseDebtcollectiveSignupFields", { loggedIn: true });

test("DiscourseDebtcollectiveSignupFields works", async assert => {
  await visit("/admin/plugins/discourse-debtcollective-signup-fields");

  assert.ok(false, "it shows the DiscourseDebtcollectiveSignupFields button");
});
