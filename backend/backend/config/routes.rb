Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get 'users/profile'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get 'u/:id', to: 'users#profile', as: 'user'

  resources :posts do
    resources :comments
  end

  get 'home', to: 'pages#home'
  get 'about', to: 'pages#about'

  namespace :api do
    namespace :v1 do
      post 'auth/login', to: 'auth#login'
      post 'auth/register', to: 'auth#register'
      get 'auth/me', to: 'auth#me'
      
      resources :regions, only: [:index, :show]
      resources :cities, only: [:index, :show]
      resources :categories, only: [:index, :show]
      
      resources :companies, only: [:index, :show] do
        member do
          get :products
          get :reviews
        end
      end
      
      resources :products, only: [:index, :show] do
        member do
          get :reviews
          get :related
        end
      end
      
      resources :reviews, only: [:index, :show, :create, :update, :destroy]
      resources :favorites, only: [:index, :create, :destroy]
      
      resources :leads, only: [:index, :show, :create, :update]
      resources :quote_requests, only: [:index, :show, :create, :update]
      
      resources :plans, only: [:index, :show]
      resources :subscriptions, only: [:index, :show, :create, :update, :destroy]
      resources :payments, only: [:index, :show]
      
      resources :advertisers, only: [:index, :show]
      resources :ad_campaigns, only: [:index, :show]
      resources :ad_placements, only: [:index, :show]
      resources :ad_banners, only: [:index, :show]
      
      get 'geo/detect', to: 'geo#detect'
      get 'geo/regions', to: 'geo#regions'
      get 'geo/cities', to: 'geo#cities'
      get 'geo/prices', to: 'geo#prices'
      get 'geo/trending', to: 'geo#trending'
      
      post 'intent/events', to: 'intent#events'
      get 'intent/lead_score/:id', to: 'intent#lead_score'
      get 'intent/leaderboard', to: 'intent#leaderboard'
      
      get 'banners/:placement_id', to: 'ads#banners'
      post 'track_impression', to: 'ads#track_impression'
      post 'track_click', to: 'ads#track_click'
      
      get 'search', to: 'search#index'
      get 'featured', to: 'search#featured'
      get 'recommendations', to: 'recommendations#index'
      
      post 'stripe/webhook', to: 'stripe_webhooks#handle_event'
    end
  end

  root 'pages#home'
end
