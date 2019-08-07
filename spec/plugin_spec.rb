require 'rails_helper'

describe "DiscourseDebtcollectiveSignupFields" do
  before do
    SiteSetting.discourse_debtcollective_signup_fields = true
  end

  it 'adds user to specific group given their US state' do
    # create user custom field
    field = UserField.create({
      name: "State",
      description: "State",
      field_type: "state",
      required: true,
      editable: true,
      show_on_profile: false,
      show_on_user_card: false,
    })
    # create New York group
    state = "New York"
    group = Fabricate(:group, name: "NewYork", full_name: "New York members")

    # create user with user_field_1 New York
    user = Fabricate.build(:user)
    user.custom_fields['user_field_1'] = 'New York'
    user.save

    group.reload
    expect(group.users).to include(user)
  end
end
