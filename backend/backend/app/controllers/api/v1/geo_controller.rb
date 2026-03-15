module Api
  module V1
    class GeoController < BaseController
      skip_before_action :authenticate_user!, except: []
      
      def detect
        ip = request.remote_ip || params[:ip]
        
        region = Region.friendly_find(params[:region_code]) || Region.active.first
        city = region&.cities&.first
        
        render_success({
          ip: ip,
          region: RegionSerializer.new(region).as_json,
          city: CitySerializer.new(city).as_json
        })
      end
      
      def regions
        regions = Region.active.order(:name)
        
        render_success(regions.map { |r| RegionSerializer.new(r).as_json })
      end
      
      def cities
        cities = City.active
        cities = cities.where(region_id: params[:region_id]) if params[:region_id].present?
        cities = cities.by_state(params[:state]) if params[:state].present?
        
        render_success(cities.map { |c| CitySerializer.new(c).as_json })
      end
      
      def prices
        product = Product.friendly_find(params[:product_id])
        return render_not_found('Produto não encontrado') unless product
        
        region = Region.friendly_find(params[:region_code])
        
        if region
          price = product.price_with_region(region)
        else
          price = product.base_price
        end
        
        render_success({
          product_id: product.id,
          base_price: product.base_price,
          region_code: region&.code,
          final_price: price,
          tax_multiplier: region&.tax_multiplier
        })
      end
      
      def trending
        region = Region.friendly_find(params[:region_code]) || Region.first
        
        products = Product.active
          .joins(:company)
          .where(companies: { region_id: region.id })
          .order(views_count: :desc)
          .limit(10)
        
        render_success(products.map { |p| ProductSerializer.new(p).as_json })
      end
    end
  end
end
