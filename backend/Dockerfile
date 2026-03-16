FROM ruby:3.2.2-slim

LABEL maintainer="LARModular Team <dev@larmodular.com.br>"
LABEL description="LARModular Backend - Rails API"

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    curl \
    git \
    postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Rails dependencies
RUN gem install rails -v 7.0.6 && \
    gem install bundler

# Copy Gemfile and install dependencies
COPY backend/Gemfile backend/Gemfile.lock /app/

WORKDIR /app

# Remove platform-specific Gemfile.lock and install ALL gems (no exclusions)
RUN rm Gemfile.lock && \
    bundle config set without '' && \
    bundle install --jobs 4 --retry 3

# Copy application code
COPY backend/ /app/
COPY config/ /app/config/

# Precompile assets
RUN RAILS_ENV=production SECRET_KEY_BASE=dummy_key_for_precompile \
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
