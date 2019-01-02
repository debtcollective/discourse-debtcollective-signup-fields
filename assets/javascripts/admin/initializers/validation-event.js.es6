import { withPluginApi } from "discourse/lib/plugin-api";

import { fieldTypesValidations } from "../lib/field-types";

const initializeValidationEvent = api => {
  api.modifyClass("controller:preferences/profile", {
    actions: {
      save() {
        const userFields = this.get("userFields");
        let isValidData = true;

        if (!Ember.isEmpty(userFields)) {
          /*
            TODO: It will be great to extend the actual UserField model to include isValid property
            that can be set onChange and which we can be checked here, instead running all validations again.
          */
          isValidData = userFields.every(userField => {
            const { field, value } = userField;
            const validationFn = fieldTypesValidations[field.field_type];
            return validationFn && validationFn(value);
          });
        }

        if (isValidData) {
          this._super();
        }
      }
    }
  });
};

export default {
  name: "validation-hook",
  initialize() {
    withPluginApi("0.8.24", initializeValidationEvent);
  }
};
