require 'rails_helper'

RSpec.describe LeadScore, type: :model do
  let(:lead) { create(:lead) }
  subject { build(:lead_score, lead: lead) }

  describe 'associations' do
    it { should belong_to(:lead) }
  end

  describe 'validations' do
    it { should validate_uniqueness_of(:lead_id) }
  end

  describe 'scopes' do
    describe '.recent' do
      it 'orders by calculated_at descending' do
        older = create(:lead_score, lead: create(:lead), calculated_at: 2.days.ago)
        newer = create(:lead_score, lead: create(:lead), calculated_at: 1.hour.ago)

        expect(LeadScore.recent.first).to eq(newer)
        expect(LeadScore.recent.last).to eq(older)
      end
    end

    describe '.hot' do
      it 'returns scores >= 70' do
        hot  = create(:lead_score, lead: create(:lead), score: 70)
        cold = create(:lead_score, lead: create(:lead), score: 69)

        expect(LeadScore.hot).to include(hot)
        expect(LeadScore.hot).not_to include(cold)
      end
    end
  end

  describe '#to_s' do
    it 'includes score and intent level' do
      ls = build(:lead_score, score: 55, intent_level: 'hot')
      expect(ls.to_s).to include('55')
      expect(ls.to_s).to include('hot')
    end
  end
end
