module Api
  module V1
    class AuthController < BaseController
      skip_before_action :authenticate_user_from_token!, only: [:login, :register]
      
      def login
        user = User.find_by(email: params[:email])
        
        if user&.valid_password?(params[:password])
          token = generate_jwt_token(user)
          render_success({
            user: UserSerializer.new(user).as_json,
            token: token
          }, 'Login realizado com sucesso')
        else
          render_error('Email ou senha inválidos', nil, :unauthorized)
        end
      end
      
      def register
        user = User.new(user_params)
        
        if user.save
          token = generate_jwt_token(user)
          render_success({
            user: UserSerializer.new(user).as_json,
            token: token
          }, 'Cadastro realizado com sucesso', { status: :created })
        else
          render_error('Erro ao criar conta', user.errors.full_messages, :unprocessable_entity)
        end
      end
      
      def me
        render_success(UserSerializer.new(current_user).as_json)
      end
      
      private
      
      def generate_jwt_token(user)
        payload = {
          user_id: user.id,
          email: user.email,
          exp: 7.days.from_now.to_i
        }
        JWT.encode(payload, Rails.application.credentials.secret_key_base || ENV['JWT_SECRET_KEY'], 'HS256')
      end
      
      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation, :name, :phone)
      end
    end
  end
end
