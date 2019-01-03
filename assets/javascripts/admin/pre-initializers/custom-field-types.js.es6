import { withPluginApi } from "discourse/lib/plugin-api";
import { on, observes } from "ember-addons/ember-computed-decorators";

import { states as usaStates } from "../lib/data/usa";
import { fieldTypesValidations } from "../lib/validations";
import {
  types,
  getBuiltInFieldTypes,
  PhoneFieldType,
  StateFieldType,
  ZipCodeFieldType
} from "../lib/field-types";

const initializeCustomFieldTypes = api => {
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
    classNameBindings: ["isValidFormat::error", "hasFormat:has-format"],
    isValidFormat: true,
    hasFormat: false,

    @on("init")
    enhanceFieldComponentValidation() {
      this._enhancedValidationFn = fieldTypesValidations[this.field.field_type];
      this.set("hasFormat", this._enhancedValidationFn !== undefined);
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
  name: "discourse-debtcollective-signup-fields",
  before: "inject-discourse-objects",
  initialize() {
    withPluginApi("0.8.24", initializeCustomFieldTypes);
  }
};
