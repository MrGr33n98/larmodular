require 'rails_helper'

RSpec.describe '/api/v1/products', type: :request do
  let!(:category) { create(:category) }
  let!(:company) { create(:company) }
  let!(:product) { create(:product, category: category, company: company) }
  let!(:featured_product) { create(:product, category: category, company: company, featured: true) }

  describe 'GET /api/v1/products' do
    before { get '/api/v1/products' }

    it 'returns success' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns products' do
      json = JSON.parse(response.body)
      expect(json['data'].size).to eq(2)
    end
  end

  describe 'GET /api/v1/products?featured=true' do
    before { get '/api/v1/products?featured=true' }

    it 'returns only featured products' do
      json = JSON.parse(response.body)
      expect(json['data'].size).to eq(1)
      expect(json['data'].first['featured']).to eq(true)
    end
  end

  describe 'GET /api/v1/products/:id' do
    context 'when product exists' do
      before { get "/api/v1/products/#{product.id}" }

      it 'returns success' do
        expect(response).to have_http_status(:ok)
      end

      it 'increments views_count' do
        product.reload
        expect(product.views_count).to be > 0
      end
    end

    context 'when product does not exist' do
      before { get '/api/v1/products/99999' }

      it 'returns not found' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'GET /api/v1/products?category_id=:id' do
    let!(:other_category) { create(:category) }
    let!(:other_product) { create(:product, category: other_category, company: company) }

    before { get "/api/v1/products?category_id=#{category.id}" }

    it 'returns products filtered by category' do
      json = JSON.parse(response.body)
      expect(json['data'].size).to eq(2)
    end
  end
end
