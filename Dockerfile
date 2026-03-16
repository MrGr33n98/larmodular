FROM ruby:3.2.2-slim

LABEL maintainer="LARModular Team <dev@larmodular.com.br>"
LABEL description="LARModular Backend - Rails API Production"

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs curl git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Rails dependencies
RUN gem install rails -v 7.0.6 && \
    gem install bundler

# Copy Gemfile and install dependencies
COPY Gemfile Gemfile.lock /app/

RUN bundle config set --local deployment 'false' && \
    bundle config set --local without 'development test' && \
    bundle install --jobs 4 --retry 3

# Copy application code
COPY . /app/

# Fix CRLF in bin/ files and ensure asset directories exist
RUN mkdir -p app/assets/images app/assets/stylesheets vendor/javascript app/javascript && \
    sed -i 's/\r$//' bin/* || true

# Precompile assets
RUN RAILS_ENV=production SECRET_KEY_BASE=assets_precompile_bundle_key \
    bundle exec rails assets:precompile

# Create non-root user
RUN useradd -m -s /bin/bash rails && \
    chown -R rails:rails /app
USER rails

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
