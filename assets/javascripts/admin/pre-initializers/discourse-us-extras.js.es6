import { withPluginApi } from "discourse/lib/plugin-api";
import { on } from "ember-addons/ember-computed-decorators";

import {
  BuiltInFieldTypes,
  PhoneFieldType,
  StateFieldType,
  ZipCodeFieldType
} from "../lib/field-types";

const initializeDiscourseUsExtra = api => {
  api.modifyClassStatic("model:user-field", {
    fieldTypes() {
      return BuiltInFieldTypes.concat(
        PhoneFieldType,
        StateFieldType,
        ZipCodeFieldType
      );
    }
  });

  api.modifyClass("component:user-field", {
    @on("init")
    speak() {
      /* eslint no-console: 0 */
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
