require 'rails_helper'

RSpec.describe '/api/v1/regions', type: :request do
  let!(:region) { create(:region, name: 'Sudeste', code: 'sudeste') }
  let!(:region2) { create(:region, name: 'Nordeste', code: 'nordeste', active: false) }

  describe 'GET /api/v1/regions' do
    before { get '/api/v1/regions' }

    it 'returns success' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns only active regions' do
      json = JSON.parse(response.body)
      expect(json['data'].size).to eq(1)
      expect(json['data'].first['name']).to eq('Sudeste')
    end
  end

  describe 'GET /api/v1/regions/:id' do
    context 'when region exists' do
      before { get "/api/v1/regions/#{region.id}" }

      it 'returns success' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns region data' do
        json = JSON.parse(response.body)
        expect(json['data']['name']).to eq('Sudeste')
      end
    end

    context 'when region does not exist' do
      before { get '/api/v1/regions/99999' }

      it 'returns not found' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
