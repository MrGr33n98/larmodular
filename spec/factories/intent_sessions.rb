FactoryBot.define do
  factory :intent_session do
    session_id  { SecureRandom.hex(8) }
    started_at  { Time.current }
    ended_at    { nil }
  end
end
