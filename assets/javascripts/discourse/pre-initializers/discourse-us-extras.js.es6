import { withPluginApi } from "discourse/lib/plugin-api";
import { i18n } from "discourse/lib/computed";
import { observes, on } from "ember-addons/ember-computed-decorators";

const UserFieldType = Ember.Object.extend({
  name: i18n("id", "admin.user_fields.field_types.%@")
});

export default {
  name: "discourse-us-extras",
  before: "inject-discourse-objects",
  initialize() {
    withPluginApi("0.8.12", api => {
      api.modifyClassStatic("model:user-field", {
        fieldTypes() {
          if (!this._fieldTypes) {
            this._fieldTypes = [
              UserFieldType.create({ id: "text" }),
              UserFieldType.create({ id: "confirm" }),
              UserFieldType.create({ id: "dropdown", hasOptions: true }),
              UserFieldType.create({ id: "zip-code" })
            ];
          }

          return this._fieldTypes;
        }
      });

      api.modifyClass("component:user-field", {
        values: [],

        @on("init")
        init_values() {
          if (this.field.field_type == "zip-code" && this.get("value")) {
            this.set("values", JSON.parse(this.get("value")));
          }
        },

        @observes("values")
        setValue() {
          this.set("value", JSON.stringify(this.get("values")));
        }
      });
    });
  }
};
