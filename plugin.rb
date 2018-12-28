# name: DiscourseUsExtras
# about:
# version: 0.1
# authors: duranmla
# url: https://github.com/duranmla


register_asset "stylesheets/common/discourse-us-extras.scss"


enabled_site_setting :discourse_us_extras_enabled

PLUGIN_NAME ||= "DiscourseUsExtras".freeze

after_initialize do
  
  # see lib/plugin/instance.rb for the methods available in this context
  

  module ::DiscourseUsExtra
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace DiscourseUsExtra
    end
  end

  

  
  require_dependency "application_controller"
  class DiscourseUsExtras::ActionsController < ::ApplicationController
    requires_plugin PLUGIN_NAME

    before_action :ensure_logged_in

    def list
      render json: success_json
    end
  end

  DiscourseUsExtras::Engine.routes.draw do
    get "/list" => "actions#list"
  end

  Discourse::Application.routes.append do
    mount ::DiscourseUsExtras::Engine, at: "/discourse-us-extras"
  end
  
end
