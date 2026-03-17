require 'rails_helper'

RSpec.describe "Api::V1::Leads", type: :request do
  let!(:user) { create(:user) }
  let!(:company) { create(:company, user: user) }
  let!(:lead) { create(:lead, company: company) }

  describe "GET /api/v1/leads" do
    it "lists leads for the user's company" do
      get "/api/v1/leads", headers: authenticated_header(user)
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data'].any? { |l| l['id'] == lead.id }).to be true
    end
  end

  describe "POST /api/v1/leads" do
    let(:valid_params) do
      {
        company_id: company.id,
        lead: {
          name: "John Doe",
          email: "john@example.com",
          phone: "11999999999",
          source: "web"
        }
      }
    end

    it "creates a lead" do
      expect {
        post "/api/v1/leads", params: valid_params, headers: authenticated_header(user)
      }.to change(Lead, :count).by(1)
      
      expect(response).to have_http_status(:ok)
    end

    it "creates a lead even when not authenticated" do
      expect {
        post "/api/v1/leads", params: valid_params
      }.to change(Lead, :count).by(1)
      
      expect(response).to have_http_status(:ok)
    end
  end
end
