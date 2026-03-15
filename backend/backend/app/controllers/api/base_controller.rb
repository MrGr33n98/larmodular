module Api
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_default_response_format
    before_action :authenticate_user_from_token!, unless: :devise_controller?
    before_action :authenticate_user!, unless: :devise_controller?
    before_action :check_rate_limit, only: [:create, :update, :destroy]
    
    helper_method :current_user, :user_signed_in?
    
    private
    
    def set_default_response_format
      request.format = :json
    end
    
    def render_success(data = nil, message = nil, meta = {})
      render json: {
        success: true,
        message: message,
        data: data,
        meta: meta
      }, status: :ok
    end
    
    def render_error(message, errors = nil, status = :unprocessable_entity)
      render json: {
        success: false,
        message: message,
        errors: errors
      }, status: status
    end
    
    def render_not_found(message = 'Resource not found')
      render json: {
        success: false,
        message: message
      }, status: :not_found
    end
    
    def render_rate_limit_exceeded
      render json: {
        success: false,
        message: 'Limite de requisições excedido. Tente novamente mais tarde.',
        error: 'rate_limit_exceeded'
      }, status: :too_many_requests
    end
    
    def paginate(collection)
      paginator = Kaminari.pagination_array(collection)
      {
        current_page: paginator.current_page,
        next_page: paginator.next_page,
        prev_page: paginator.prev_page,
        total_pages: paginator.total_pages,
        total_count: paginator.total_count
      }
    end
    
    def check_rate_limit
      key = "api:#{controller_name}:#{action_name}"
      identifier = current_user&.id || request.ip
      
      unless RateLimiter.allowed?(key, identifier)
        render_rate_limit_exceeded
      end
    end
    
    def authenticate_user_from_token!
      token = request.headers['Authorization']&.split(' ')&.last
      return unless token
      
      begin
        payload = JWT.decode(token, Rails.application.credentials.secret_key_base || ENV['JWT_SECRET_KEY'], true, algorithm: 'HS256').first
        @current_user = User.find_by(id: payload['user_id'])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        nil
      end
    end
    
    def authenticate_user!
      unless current_user
        render_error('Unauthorized', ['Faça login para continuar'], :unauthorized)
      end
    end
    
    def current_user
      @current_user
    end
    
    def user_signed_in?
      current_user.present?
    end
  end
end
