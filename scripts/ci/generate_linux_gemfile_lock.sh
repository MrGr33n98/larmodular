#!/usr/bin/env bash
set -euo pipefail

echo "[CI] Generating Linux Gemfile.lock for backend..."
cd backend

if [ -f Gemfile.lock ]; then
  echo "[CI] Gemfile.lock already exists. Skipping regeneration."
  exit 0
fi

CONTAINER_TAG="ruby:3.2.2-slim"
echo "[CI] Running bundler inside Docker container ($CONTAINER_TAG) to produce Linux Gemfile.lock..."
docker run --rm -v "$PWD":/work -w /work "$CONTAINER_TAG" bash -lc '
  set -e
  apt-get update -qq && apt-get install -y --no-install-recommends build-essential libpq-dev nodejs curl git
  gem install bundler
  bundle install --jobs 4 --retry 3
  '

echo "[CI] Gemfile.lock generation complete."
