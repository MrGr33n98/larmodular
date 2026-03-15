require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Larmodular
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    
    # Localization - PT-BR
    config.i18n.default_locale = :'pt-BR'
    config.i18n.available_locales = [:en, :'pt-BR']
    config.time_zone = 'Brasilia'
    config.active_record.default_timezone = :local

    # API Configuration
    config.api_only = false
    
    # CORS Configuration
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000', 'http://127.0.0.1:3000'
        
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          expose: ['Authorization']
      end
    end

    # Active Job
    config.active_job.queue_adapter = :async
    
    # Eager load paths
    config.eager_load_paths << Rails.root.join("app", "workers")
    config.eager_load_paths << Rails.root.join("app", "services")
  end
end
