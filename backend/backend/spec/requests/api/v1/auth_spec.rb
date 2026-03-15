require 'rails_helper'

RSpec.describe '/api/v1/auth', type: :request do
  let(:user) { create(:user, email: 'test@example.com', password: 'password123') }

  describe 'POST /api/v1/auth/login' do
    context 'with valid credentials' do
      before do
        post '/api/v1/auth/login', params: {
          email: 'test@example.com',
          password: 'password123'
        }
      end

      it 'returns success' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns token' do
        json = JSON.parse(response.body)
        expect(json['data']['token']).to be_present
      end

      it 'returns user data' do
        json = JSON.parse(response.body)
        expect(json['data']['user']['email']).to eq('test@example.com')
      end
    end

    context 'with invalid credentials' do
      before do
        post '/api/v1/auth/login', params: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      end

      it 'returns unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/auth/register' do
    context 'with valid data' do
      before do
        post '/api/v1/auth/register', params: {
          user: {
            email: 'newuser@example.com',
            password: 'password123',
            password_confirmation: 'password123',
            name: 'New User'
          }
        }
      end

      it 'returns created' do
        expect(response).to have_http_status(:ok)
      end

      it 'creates user' do
        expect(User.find_by(email: 'newuser@example.com')).to be_present
      end
    end

    context 'with invalid data' do
      before do
        post '/api/v1/auth/register', params: {
          user: {
            email: 'invalid',
            password: 'short'
          }
        }
      end

      it 'returns error' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
