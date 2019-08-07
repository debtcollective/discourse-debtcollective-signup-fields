# name: discourse-debtcollective-signup-fields
# about:
# version: 0.1
# authors: duranmla
# url: https://github.com/debtcollective/discourse-debtcollective-signup-fields

register_asset "stylesheets/common/discourse-debtcollective-signup-fields.scss"

register_asset "javascripts/admin/lib/field-types.js.es6"
register_asset "javascripts/admin/lib/validations.js.es6"
register_asset "javascripts/admin/lib/data/usa.js.es6"

enabled_site_setting :discourse_debtcollective_signup_fields

after_initialize do
  class DiscourseDebtcollectiveSignupFields
    def self.add_user_to_group(user)
      state = user.custom_fields['user_field_1']

      if state.nil?
        capture_message("A user was created without State", user_id: user.id)
        return
      end

      group_name = state.split.map(&:camelize).join
      group = Group.find_by_name(group_name)

      if group.nil?
        capture_message("A state group wasn't found", user_id: user.id, state: state, group_name: group_name)
        return
      end

      group.add(user)
      group.save
    end

    def self.capture_message(message, attrs = {})
      if Module.const_defined?('Raven')
        Raven.capture_message(message, attrs)
      end
    end
  end

  # on is a proxy to DiscourseEvent.on
  on(:user_created) do |user|
    DiscourseDebtcollectiveSignupFields.add_user_to_group(user)
  end
end
