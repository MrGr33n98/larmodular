FactoryBot.define do
  factory :intent_event do
    event_type { 'page_view' }
    event_data { {} }
    session_id { SecureRandom.hex(8) }
    ip_address { '127.0.0.1' }
  end
end
