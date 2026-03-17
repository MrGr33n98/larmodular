module RequestSpecHelper
  def authenticated_header(user)
    token = JWT.encode(
      { user_id: user.id, exp: 24.hours.from_now.to_i },
      Rails.application.credentials.secret_key_base || ENV['JWT_SECRET_KEY'],
      'HS256'
    )
    { 'Authorization' => "Bearer #{token}" }
  end
end

RSpec.configure do |config|
  config.include RequestSpecHelper, type: :request
end
