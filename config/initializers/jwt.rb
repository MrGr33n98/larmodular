# JWT Configuration
# https://github.com/waiting-for-dev/devise-jwt

JWT_SECRET_KEY = ENV.fetch('JWT_SECRET_KEY') { 'fallback_secret_key_change_in_production' }
JWT_ALGORITHM = 'HS256'

# Token expiration times
JWT_ACCESS_TOKEN_EXPIRATION = 24.hours
JWT_REFRESH_TOKEN_EXPIRATION = 7.days
