import { withPluginApi } from "discourse/lib/plugin-api";
import { on, observes } from "ember-addons/ember-computed-decorators";

import { states as usaStates } from "../lib/data/usa";
import {
  types,
  fieldTypesValidations,
  getBuiltInFieldTypes,
  PhoneFieldType,
  StateFieldType,
  ZipCodeFieldType
} from "../lib/field-types";

const initializeDiscourseUsExtra = api => {
  api.modifyClassStatic("model:user-field", {
    fieldTypes() {
      return getBuiltInFieldTypes().concat(
        PhoneFieldType,
        StateFieldType,
        ZipCodeFieldType
      );
    }
  });

  api.modifyClass("component:user-field", {
    classNameBindings: ["isValidFormat:sucess:error"],
    isValidFormat: false,

    @on("init")
    enhanceFieldComponentValidation() {
      this._enhancedValidationFn = fieldTypesValidations[this.field.field_type];
    },

    @on("init")
    bindFixedOptions() {
      let options;

      switch (this.field.field_type) {
        case types.state:
          options = usaStates;
          break;
        default:
          break;
      }

      this.field.options = options;
    },

    @observes("value")
    validateValue() {
      this._enhancedValidationFn &&
        Ember.run.debounce(
          this,
          value => {
            this.set("isValidFormat", this._enhancedValidationFn(value));
          },
          this.get("value"),
          250
        );
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
