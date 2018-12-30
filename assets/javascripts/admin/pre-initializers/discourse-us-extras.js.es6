import { withPluginApi } from "discourse/lib/plugin-api";
import { on, observes } from "ember-addons/ember-computed-decorators";

import {
  fieldTypesValidations,
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
    enhanceFieldComponentValidation() {
      this._enhancedValidationFn = fieldTypesValidations[this.field.field_type];
    },

    @observes("value")
    validateValue() {
      this._enhancedValidationFn &&
        this._enhancedValidationFn(this.get("value"));
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
