require 'rails_helper'

RSpec.describe IntentSession, type: :model do
  subject { build(:intent_session) }

  describe 'associations' do
    it { should belong_to(:lead).optional }
    it { should belong_to(:user).optional }
    it { should belong_to(:region).optional }
    it { should belong_to(:city).optional }
  end

  describe 'scopes' do
    describe '.active' do
      it 'returns sessions with no ended_at' do
        active   = create(:intent_session, ended_at: nil)
        finished = create(:intent_session, ended_at: 1.hour.ago)

        expect(IntentSession.active).to include(active)
        expect(IntentSession.active).not_to include(finished)
      end
    end

    describe '.recent' do
      it 'orders by started_at descending' do
        older = create(:intent_session, started_at: 2.days.ago)
        newer = create(:intent_session, started_at: 1.hour.ago)

        expect(IntentSession.recent.first).to eq(newer)
      end
    end
  end

  describe '#duration' do
    it 'returns seconds between started_at and ended_at' do
      session = build(:intent_session,
        started_at: Time.current - 300,
        ended_at:   Time.current
      )
      expect(session.duration).to be_within(5).of(300)
    end

    it 'returns nil when ended_at is blank' do
      session = build(:intent_session, started_at: Time.current, ended_at: nil)
      expect(session.duration).to be_nil
    end

    it 'returns nil when started_at is blank' do
      session = build(:intent_session, started_at: nil, ended_at: Time.current)
      expect(session.duration).to be_nil
    end
  end
end
