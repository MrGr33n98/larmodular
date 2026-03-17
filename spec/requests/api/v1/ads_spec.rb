require 'rails_helper'

RSpec.describe "Api::V1::Ads", type: :request do
  let!(:placement) { create(:ad_placement) }
  let!(:banner) { create(:ad_banner, placement: placement) }

  describe "GET /api/v1/ads/banners" do
    it "returns active banners for a placement" do
      get "/api/v1/ads/banners", params: { placement_id: placement.id }
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data'].any? { |b| b['id'] == banner.id }).to be true
    end

    it "returns 404 for non-existent placement" do
      get "/api/v1/ads/banners", params: { placement_id: 0 }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/ads/track_impression" do
    it "records an impression" do
      expect {
        post "/api/v1/ads/track_impression", params: { banner_id: banner.id, session_id: 'abc' }
      }.to change(AdImpression, :count).by(1)
      
      expect(response).to have_http_status(:ok)
      banner.reload
      expect(banner.impressions_count).to eq(1)
    end
  end

  describe "POST /api/v1/ads/track_click" do
    it "records a click" do
      expect {
        post "/api/v1/ads/track_click", params: { banner_id: banner.id, session_id: 'abc' }
      }.to change(AdClick, :count).by(1)
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['data']['target_url']).to eq(banner.target_url)
      
      banner.reload
      expect(banner.clicks_count).to eq(1)
    end
  end
end
