require 'rails_helper'

RSpec.describe IntentTrackingService do
  include ActiveJob::TestHelper
  let(:valid_params) do
    {
      event_type: 'page_view',
      event_data: { 'count' => 1 },
      page_url:   '/produtos',
      session_id: 'test-session-1',
      ip_address: '127.0.0.1'
    }
  end

  describe '#track' do
    it 'creates an IntentEvent record' do
      expect {
        described_class.new(valid_params).track
      }.to change(IntentEvent, :count).by(1)
    end

    it 'returns the persisted event' do
      event = described_class.new(valid_params).track
      expect(event).to be_a(IntentEvent)
      expect(event).to be_persisted
    end

    context 'with invalid event_type' do
      it 'returns an unsaved event with errors' do
        event = described_class.new(valid_params.merge(event_type: 'not_valid')).track
        expect(event).not_to be_persisted
        expect(event.errors[:event_type]).to be_present
      end

      it 'does not change IntentEvent count' do
        expect {
          described_class.new(valid_params.merge(event_type: 'not_valid')).track
        }.not_to change(IntentEvent, :count)
      end
    end

    context 'when lead_id is present' do
      let(:lead) { create(:lead) }

      it 'enqueues CalculateLeadScoreJob' do
        expect {
          described_class.new(valid_params.merge(lead_id: lead.id)).track
        }.to have_enqueued_job(CalculateLeadScoreJob).with(lead.id)
      end
    end

    context 'when lead_id is absent' do
      it 'does not enqueue CalculateLeadScoreJob' do
        expect {
          described_class.new(valid_params).track
        }.not_to have_enqueued_job(CalculateLeadScoreJob)
      end
    end
  end
end
