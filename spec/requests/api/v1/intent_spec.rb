require 'rails_helper'

RSpec.describe "Api::V1::Intent", type: :request do
  include ActiveJob::TestHelper
  let!(:lead) { create(:lead) }

  describe "POST /api/v1/intent/events" do
    let(:valid_params) do
      {
        event_type: 'page_view',
        page_url: '/produtos'
      }
    end

    it "creates an IntentEvent and returns 201" do
      expect {
        post "/api/v1/intent/events", params: valid_params
      }.to change(IntentEvent, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data']['event_id']).to be_present
    end

    it "returns 422 for invalid event_type" do
      post "/api/v1/intent/events", params: { event_type: 'not_a_valid_type' }

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['success']).to be false
    end

    context "with a lead_id" do
      it "enqueues CalculateLeadScoreJob" do
        expect {
          post "/api/v1/intent/events", params: valid_params.merge(lead_id: lead.id)
        }.to have_enqueued_job(CalculateLeadScoreJob).with(lead.id)
      end
    end
  end

  describe "GET /api/v1/intent/lead_score/:id" do
    it "returns score info for an existing lead" do
      lead.update!(intent_score: 45, funnel_stage: 'consideration', qualification_status: 'new')

      get "/api/v1/intent/lead_score/#{lead.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      expect(json['data']['lead_id']).to eq(lead.id)
      expect(json['data']['score']).to eq(45)
      expect(json['data']['level']).to be_present
    end

    it "returns 404 for a non-existent lead" do
      get "/api/v1/intent/lead_score/99999"
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET /api/v1/intent/leaderboard" do
    before do
      create(:lead, intent_score: 85)
      create(:lead, intent_score: 70)
      create(:lead, intent_score: 10)
    end

    it "returns hot leads ordered by score desc" do
      get "/api/v1/intent/leaderboard"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['success']).to be true
      scores = json['data'].map { |l| l['intent_score'] }
      expect(scores).to eq(scores.sort.reverse)
    end

    it "does not include cold leads" do
      get "/api/v1/intent/leaderboard"
      json = JSON.parse(response.body)
      cold_ids = json['data'].select { |l| l['intent_score'] < 50 }.map { |l| l['id'] }
      expect(cold_ids).to be_empty
    end
  end
end
