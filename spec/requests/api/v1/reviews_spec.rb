require 'rails_helper'

RSpec.describe "Api::V1::Reviews", type: :request do
  let!(:user) { create(:user) }
  let!(:company) { create(:company) }
  let!(:product) { create(:product, company: company) }
  let!(:review) { create(:review, user: user, company: company, approved: true) }

  describe "GET /api/v1/reviews" do
    it "lists approved reviews for a company" do
      get "/api/v1/reviews", params: { company_id: company.id }
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data'].any? { |r| r['id'] == review.id }).to be true
    end
  end

  describe "POST /api/v1/reviews" do
    let(:valid_params) do
      {
        review: {
          company_id: company.id,
          rating: 5,
          title: "Great company",
          comment: "Excellent service"
        }
      }
    end

    it "creates a review when authenticated" do
      expect {
        post "/api/v1/reviews", params: valid_params, headers: authenticated_header(user)
      }.to change(Review, :count).by(1)
      
      expect(response).to have_http_status(:ok)
    end

    it "returns unauthorized when not authenticated" do
      post "/api/v1/reviews", params: valid_params
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "PATCH /api/v1/reviews/:id" do
    it "updates the review if owned by user" do
      patch "/api/v1/reviews/#{review.id}", 
            params: { review: { title: "Updated Title" } }, 
            headers: authenticated_header(user)
      
      expect(response).to have_http_status(:ok)
      review.reload
      expect(review.title).to eq("Updated Title")
    end

    it "returns unauthorized if not owned by user" do
      other_user = create(:user)
      patch "/api/v1/reviews/#{review.id}", 
            params: { review: { title: "Hack" } }, 
            headers: authenticated_header(other_user)
      
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE /api/v1/reviews/:id" do
    it "deletes the review if owned by user" do
      expect {
        delete "/api/v1/reviews/#{review.id}", headers: authenticated_header(user)
      }.to change(Review, :count).by(-1)
      
      expect(response).to have_http_status(:ok)
    end
  end
end
