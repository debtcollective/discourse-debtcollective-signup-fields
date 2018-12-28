import { withPluginApi } from "discourse/lib/plugin-api";
import { i18n } from "discourse/lib/computed";
import { on } from "ember-addons/ember-computed-decorators";
import UserField from "admin/models/user-field";

const UserFieldType = Ember.Object.extend({
  name: i18n("id", "admin.user_fields.field_types.%@")
});

const builtInFieldTypes = UserField.fieldTypes();

const customFieldTypesIds = {
  state: "state",
  zip_code: "zip-code",
  phone_number: "phone-number"
};

const initializeDiscourseUsExtra = api => {
  api.modifyClassStatic("model:user-field", {
    fieldTypes() {
      return builtInFieldTypes.concat(
        UserFieldType.create({ id: customFieldTypesIds.phone_number }),
        UserFieldType.create({ id: customFieldTypesIds.state }),
        UserFieldType.create({ id: customFieldTypesIds.zip_code })
      );
    }
  });

  api.modifyClass("component:user-field", {
    @on("init")
    speak() {
      console.log(`Hi! I'm a ${this.field.field_type}`, this.field);
    }
  });
};

export default {
  name: "discourse-us-extras",
  before: "inject-discourse-objects",
  initialize() {
    withPluginApi("0.8.24", initializeDiscourseUsExtra);
  }
};
