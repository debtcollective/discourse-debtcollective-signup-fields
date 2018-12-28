import { i18n } from "discourse/lib/computed";
import UserField from "admin/models/user-field";

// Get the displayable name of each field from locales
const UserFieldType = Ember.Object.extend({
  name: i18n("id", "discourse_us_extras.field_types.%@")
});

// Avoid hard-coded strings for convenience in custom field ids
const types = {
  state: "state",
  zip_code: "zip_code",
  phone_number: "phone_number"
};

// Get the already built in types from Discourse
export const BuiltInFieldTypes = UserField.fieldTypes();

// Define custom types to be injected
export const PhoneFieldType = UserFieldType.create({ id: types.phone_number });
export const StateFieldType = UserFieldType.create({ id: types.state });
export const ZipCodeFieldType = UserFieldType.create({ id: types.zip_code });
