require 'rails_helper'

RSpec.describe Lead, type: :model do
  subject { build(:lead) }

  describe 'associations' do
    it { should belong_to(:company) }
    it { should belong_to(:region).optional }
    it { should belong_to(:city).optional }
    it { should belong_to(:user).optional }
    it { should have_many(:intent_events) }
    it { should have_many(:lead_scores) }
    it { should have_many(:quote_requests) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:company_id) }
  end

  describe 'scopes' do
    describe '.active' do
      it 'returns only active leads' do
        active = create(:lead, status: 'active')
        converted = create(:lead, status: 'converted')

        expect(Lead.active).to include(active)
        expect(Lead.active).not_to include(converted)
      end
    end

    describe '.hot_leads' do
      it 'returns leads with score > 50' do
        hot = create(:lead, intent_score: 75)
        cold = create(:lead, intent_score: 20)

        expect(Lead.hot_leads).to include(hot)
        expect(Lead.hot_leads).not_to include(cold)
      end
    end
  end

  describe '#intent_level' do
    context 'cold lead' do
      let(:lead) { build(:lead, intent_score: 10) }
      it 'returns cold' do
        expect(lead.intent_level).to eq('cold')
      end
    end

    context 'warm lead' do
      let(:lead) { build(:lead, intent_score: 35) }
      it 'returns warm' do
        expect(lead.intent_level).to eq('warm')
      end
    end

    context 'hot lead' do
      let(:lead) { build(:lead, intent_score: 65) }
      it 'returns hot' do
        expect(lead.intent_level).to eq('hot')
      end
    end

    context 'ready lead' do
      let(:lead) { build(:lead, intent_score: 90) }
      it 'returns ready' do
        expect(lead.intent_level).to eq('ready')
      end
    end
  end
end
