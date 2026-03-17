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

    it "returns error when company is not found" do
      post "/api/v1/leads",
           params: valid_params.merge(company_id: 99999),
           headers: authenticated_header(user)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['success']).to be false
    end

    it "returns error when required fields are missing" do
      post "/api/v1/leads",
           params: { company_id: company.id, lead: { source: "web" } },
           headers: authenticated_header(user)

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "GET /api/v1/leads/:id" do
    it "returns the lead for authenticated user" do
      get "/api/v1/leads/#{lead.id}", headers: authenticated_header(user)

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['data']['id']).to eq(lead.id)
    end

    it "returns 404 for non-existent lead" do
      get "/api/v1/leads/99999", headers: authenticated_header(user)
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "PUT /api/v1/leads/:id" do
    it "updates the lead when authenticated" do
      put "/api/v1/leads/#{lead.id}",
          params: { lead: { notes: "Updated notes" } },
          headers: authenticated_header(user)

      expect(response).to have_http_status(:ok)
      expect(lead.reload.notes).to eq("Updated notes")
    end

    it "returns 401 when not authenticated" do
      put "/api/v1/leads/#{lead.id}",
          params: { lead: { notes: "Unauthorized update" } }

      expect(response).to have_http_status(:unauthorized)
    end

    it "returns 404 for non-existent lead" do
      put "/api/v1/leads/99999",
          params: { lead: { notes: "Notes" } },
          headers: authenticated_header(user)

      expect(response).to have_http_status(:not_found)
    end
  end
end
