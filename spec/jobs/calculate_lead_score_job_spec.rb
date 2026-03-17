require 'rails_helper'

RSpec.describe CalculateLeadScoreJob, type: :job do
  describe '#perform' do
    let(:lead) { create(:lead, intent_score: 0) }

    context 'with no events' do
      it 'creates a LeadScore with score 0' do
        described_class.perform_now(lead.id)
        score = LeadScore.find_by(lead: lead)
        expect(score).to be_present
        expect(score.score).to eq(0)
        expect(score.intent_level).to eq('cold')
      end

      it 'updates lead.intent_score' do
        described_class.perform_now(lead.id)
        expect(lead.reload.intent_score).to eq(0)
      end
    end

    context 'with events' do
      before do
        create(:intent_event, lead: lead, event_type: 'product_view')  # weight 3
        create(:intent_event, lead: lead, event_type: 'phone_click')   # weight 30
      end

      it 'calculates correct score (33 = 3 + 30)' do
        described_class.perform_now(lead.id)
        expect(lead.reload.intent_score).to eq(33)
      end

      it 'persists LeadScore with factors' do
        described_class.perform_now(lead.id)
        ls = LeadScore.find_by(lead: lead)
        expect(ls.factors).to have_key('product_view')
        expect(ls.factors).to have_key('phone_click')
      end

      it 'assigns warm intent level' do
        described_class.perform_now(lead.id)
        expect(LeadScore.find_by(lead: lead).intent_level).to eq('warm')
      end
    end

    context 'with score exceeding 100' do
      before do
        15.times { create(:intent_event, lead: lead, event_type: 'phone_click') }
      end

      it 'caps score at 100' do
        described_class.perform_now(lead.id)
        expect(lead.reload.intent_score).to eq(100)
      end
    end

    context 'when lead does not exist' do
      it 'does not raise and does nothing' do
        expect { described_class.perform_now(99999) }.not_to raise_error
      end
    end

    context 'called multiple times' do
      it 'updates the existing LeadScore rather than creating duplicates' do
        described_class.perform_now(lead.id)
        create(:intent_event, lead: lead, event_type: 'product_view')
        described_class.perform_now(lead.id)

        expect(LeadScore.where(lead: lead).count).to eq(1)
      end
    end
  end
end
