require 'rails_helper'

RSpec.describe LeadScoringService do
  let(:lead) { create(:lead, intent_score: 0) }

  describe '#calculate' do
    context 'with no events' do
      it 'returns score 0 and level cold' do
        result = described_class.new(lead).calculate
        expect(result[:score]).to eq(0)
        expect(result[:level]).to eq('cold')
        expect(result[:factors]).to be_empty
      end
    end

    context 'with a single page_view event' do
      before { create(:intent_event, lead: lead, event_type: 'page_view') }

      it 'scores 1 point' do
        result = described_class.new(lead).calculate
        expect(result[:score]).to eq(1)
      end
    end

    context 'with a high-value event' do
      before { create(:intent_event, lead: lead, event_type: 'phone_click') }

      it 'scores 30 points' do
        result = described_class.new(lead).calculate
        expect(result[:score]).to eq(30)
        expect(result[:level]).to eq('warm')
      end
    end

    context 'with a quote_request on the lead' do
      before do
        create(:intent_event, lead: lead, event_type: 'product_view')
        create(:quote_request, lead: lead)
      end

      it 'adds the quote request bonus' do
        result = described_class.new(lead).calculate
        # product_view(3) + quote_request_bonus(30) = 33
        expect(result[:score]).to eq(33)
        expect(result[:factors]['quote_requests']).to be_present
      end
    end

    context 'when score would exceed 100' do
      before do
        15.times { create(:intent_event, lead: lead, event_type: 'phone_click') }
      end

      it 'caps score at 100' do
        result = described_class.new(lead).calculate
        expect(result[:score]).to eq(100)
      end
    end

    context 'intent level boundaries' do
      it 'returns cold for score 0..20' do
        [0, 10, 20].each do |s|
          expect(described_class.level_for(s)).to eq('cold')
        end
      end

      it 'returns warm for score 21..50' do
        [21, 35, 50].each do |s|
          expect(described_class.level_for(s)).to eq('warm')
        end
      end

      it 'returns hot for score 51..80' do
        [51, 65, 80].each do |s|
          expect(described_class.level_for(s)).to eq('hot')
        end
      end

      it 'returns ready for score 81..100' do
        [81, 90, 100].each do |s|
          expect(described_class.level_for(s)).to eq('ready')
        end
      end
    end

    context 'with event_data count multiplier' do
      before do
        create(:intent_event, lead: lead, event_type: 'product_view', event_data: { 'count' => 3 })
      end

      it 'multiplies weight by count' do
        result = described_class.new(lead).calculate
        # product_view weight(3) * count(3) = 9
        expect(result[:score]).to eq(9)
        expect(result[:factors]['product_view'][:count]).to eq(3)
      end
    end
  end

  describe '.weight_for' do
    it 'returns correct weights for known event types' do
      expect(described_class.weight_for('page_view')).to eq(1)
      expect(described_class.weight_for('product_view')).to eq(3)
      expect(described_class.weight_for('phone_click')).to eq(30)
      expect(described_class.weight_for('whatsapp_click')).to eq(30)
    end

    it 'returns 1 for unknown event types' do
      expect(described_class.weight_for('unknown')).to eq(1)
    end
  end
end
