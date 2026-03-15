class CacheService
  CACHE_EXPIRY = {
    'regions' => 1.hour,
    'cities' => 1.hour,
    'categories' => 1.hour,
    'plans' => 30.minutes,
    'featured_companies' => 15.minutes,
    'featured_products' => 15.minutes,
    'trending_products' => 10.minutes,
    'ad_placements' => 1.hour,
    'geo_prices' => 30.minutes
  }.freeze

  class << self
    def fetch(key, expires_in: nil, &block)
      cache_key = "api:#{key}"
      
      if expires_in.present?
        Rails.cache.fetch(cache_key, expires_in: expires_in, &block)
      else
        default_expiry = CACHE_EXPIRY[key.split(':').first]
        if default_expiry
          Rails.cache.fetch(cache_key, expires_in: default_expiry, &block)
        else
          Rails.cache.fetch(cache_key, &block)
        end
      end
    end

    def invalidate(key)
      Rails.cache.delete("api:#{key}")
    end

    def invalidate_prefix(prefix)
      Rails.cache.delete_matched("api:#{prefix}*")
    end

    def invalidate_all
      Rails.cache.delete_matched('api:*')
    end

    def regions
      fetch('regions') { Region.active.order(:name).as_json(only: [:id, :name, :slug, :code, :tax_multiplier]) }
    end

    def categories
      fetch('categories') { Category.active.roots.ordered.as_json(only: [:id, :name, :slug, :icon, :parent_id], methods: [:children]) }
    end

    def plans
      fetch('plans') { Plan.active.ordered.as_json }
    end

    def featured_companies(limit: 10)
      fetch("featured_companies:#{limit}") { Company.active.featured.limit(limit).as_json }
    end

    def featured_products(limit: 10)
      fetch("featured_products:#{limit}") { Product.active.featured.limit(limit).as_json }
    end

    def trending_products(region_id: nil, limit: 10)
      key = region_id ? "trending_products:#{region_id}:#{limit}" : "trending_products:all:#{limit}"
      fetch(key) do
        products = Product.active
        products = products.joins(:company).where(companies: { region_id: region_id }) if region_id
        products.order(views_count: :desc).limit(limit).as_json
      end
    end

    def geo_prices(product_id, region_code)
      fetch("geo_prices:#{product_id}:#{region_code}", expires_in: 30.minutes) do
        product = Product.find(product_id)
        region = Region.find_by(code: region_code)
        {
          product_id: product.id,
          base_price: product.base_price,
          region_code: region&.code,
          final_price: product.price_with_region(region),
          tax_multiplier: region&.tax_multiplier
        }
      end
    end
  end
end
