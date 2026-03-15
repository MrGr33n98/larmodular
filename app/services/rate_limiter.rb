class RateLimiter
  LIMITS = {
    'api:search' => { limit: 30, window: 1.minute },
    'api:track_event' => { limit: 100, window: 1.minute },
    'api:auth' => { limit: 5, window: 1.minute },
    'api:create' => { limit: 10, window: 1.minute },
    'default' => { limit: 60, window: 1.minute }
  }.freeze

  class << self
    def allowed?(key, identifier = nil)
      limit_config = find_limit_config(key)
      cache_key = build_cache_key(key, identifier)

      current_count = Rails.cache.read(cache_key).to_i

      if current_count >= limit_config[:limit]
        return false
      end

      Rails.cache.write(cache_key, current_count + 1, expires_in: limit_config[:window])
      true
    end

    def remaining(key, identifier = nil)
      limit_config = find_limit_config(key)
      cache_key = build_cache_key(key, identifier)

      current_count = Rails.cache.read(cache_key).to_i
      [limit_config[:limit] - current_count, 0].max
    end

    def reset!(key, identifier = nil)
      cache_key = build_cache_key(key, identifier)
      Rails.cache.delete(cache_key)
    end

    private

    def find_limit_config(key)
      LIMITS.each do |pattern, config|
        return config if key.start_with?(pattern)
      end
      LIMITS['default']
    end

    def build_cache_key(key, identifier)
      suffix = identifier || request_ip
      "rate_limit:#{key}:#{suffix}"
    end

    def request_ip
      Thread.current[:request_ip] ||= 'default'
    end
  end
end
