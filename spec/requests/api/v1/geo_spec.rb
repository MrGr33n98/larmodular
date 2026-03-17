require 'rails_helper'

RSpec.describe "Api::V1::Geos", type: :request do
  let!(:region) { create(:region, active: true, code: 'SP') }
  let!(:city) { create(:city, region: region, active: true) }
  let!(:product) { create(:product, active: true) }

  describe "GET /api/v1/geo/detect" do
    it "detects location by IP or params" do
      get "/api/v1/geo/detect", params: { region_code: region.code }
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data']['region']['code']).to eq(region.code)
    end
  end

  describe "GET /api/v1/geo/regions" do
    it "lists active regions" do
      get "/api/v1/geo/regions"
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data'].any? { |r| r['id'] == region.id }).to be true
    end
  end

  describe "GET /api/v1/geo/cities" do
    it "lists cities by region" do
      get "/api/v1/geo/cities", params: { region_id: region.id }
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data'].any? { |c| c['id'] == city.id }).to be true
    end
  end

  describe "GET /api/v1/geo/prices" do
    it "returns price for a product in a region" do
      get "/api/v1/geo/prices", params: { product_id: product.id, region_code: region.code }
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data']['product_id']).to eq(product.id)
      expect(json['data']['region_code']).to eq(region.code)
    end

    it "returns 404 for non-existent product" do
      get "/api/v1/geo/prices", params: { product_id: 0, region_code: region.code }
      
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET /api/v1/geo/trending" do
    let!(:company) { create(:company, region: region) }
    let!(:trending_product) { create(:product, company: company, active: true, views_count: 100) }

    it "lists trending products in a region" do
      get "/api/v1/geo/trending", params: { region_code: region.code }
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data'].any? { |p| p['id'] == trending_product.id }).to be true
    end
  end
end
