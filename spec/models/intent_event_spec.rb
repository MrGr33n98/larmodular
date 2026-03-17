require 'rails_helper'

RSpec.describe IntentEvent, type: :model do
  subject { build(:intent_event) }

  describe 'associations' do
    it { should belong_to(:lead).optional }
    it { should belong_to(:user).optional }
    it { should belong_to(:product).optional }
    it { should belong_to(:company).optional }
    it { should belong_to(:region).optional }
    it { should belong_to(:city).optional }
  end

  describe 'validations' do
    it { should validate_presence_of(:event_type) }

    it 'rejects unknown event types' do
      event = build(:intent_event, event_type: 'unknown_type')
      expect(event).not_to be_valid
      expect(event.errors[:event_type]).to be_present
    end

    IntentEvent::EVENT_TYPES.each do |type|
      it "accepts event_type '#{type}'" do
        expect(build(:intent_event, event_type: type)).to be_valid
      end
    end
  end

  describe 'scopes' do
    let!(:event_a) { create(:intent_event, session_id: 'sess-1', event_type: 'page_view', created_at: 1.minute.ago) }
    let!(:event_b) { create(:intent_event, session_id: 'sess-2', event_type: 'product_view', created_at: 2.minutes.ago) }

    describe '.by_session' do
      it 'filters by session_id' do
        expect(IntentEvent.by_session('sess-1')).to include(event_a)
        expect(IntentEvent.by_session('sess-1')).not_to include(event_b)
      end
    end

    describe '.by_type' do
      it 'filters by event_type' do
        expect(IntentEvent.by_type('page_view')).to include(event_a)
        expect(IntentEvent.by_type('page_view')).not_to include(event_b)
      end
    end

    describe '.recent' do
      it 'orders newest first' do
        expect(IntentEvent.recent.first.created_at).to be >= IntentEvent.recent.last.created_at
      end
    end
  end
end
