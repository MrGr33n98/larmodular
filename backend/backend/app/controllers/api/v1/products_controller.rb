module Api
  module V1
    class ProductsController < BaseController
      before_action :authenticate_user!, except: [:index, :show]
      
      def index
        products = Product.active
          .includes(:company, :category)
          .by_category(params[:category_id])
          .by_company(params[:company_id])
        
        products = products.featured if params[:featured] == 'true'
        
        if params[:search].present?
          products = products.where("name ILIKE ?", "%#{params[:search]}%")
        end
        
        if params[:price_min].present? && params[:price_max].present?
          products = products.price_range(params[:price_min], params[:price_max])
        end
        
        products = products.order(featured: :desc, views_count: :desc)
        products = products.page(params[:page]).per(params[:per_page] || 20)
        
        render_success(
          products.map { |p| ProductSerializer.new(p).as_json },
          nil,
          { pagination: paginate(products) }
        )
      end
      
      def show
        product = Product.friendly_find(params[:id])
        return render_not_found('Produto não encontrado') unless product
        
        Rails.cache.fetch("products:#{product.id}", expires_in: 10.minutes) do
          product.increment!(:views_count) unless product.views_count > 1000
        end
        
        render_success(ProductSerializer.new(product).as_json)
      end
      
      def categories
        categories = CacheService.categories
        render_success(
          CategorySerializer.new(categories).as_json
        )
      end
      
      def search
        products = Product.active
          .includes(:company, :category)
          .where("name ILIKE ? OR description ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%")
          .limit(20)
        
        render_success(ProductSerializer.new(products).as_json)
      end
      
      def reviews
        product = Product.friendly_find(params[:id])
        reviews = product.reviews.approved
          .order(created_at: :Desc)
          .page(params[:page])
          .per(params[:per_page] || 10)
        
        render_success(
          ReviewSerializer.new(reviews).as_json,
          nil,
          { pagination: paginate(reviews) }
        )
      end
      
      def related
        product = Product.friendly_find(params[:id])
        related = Rails.cache.fetch("products:#{product.id}:related", expires_in: 30.minutes) do
          Product.active
            .where(category_id: product.category_id)
            .where.not(id: product.id)
            .limit(10)
            .to_a
        end
        
        render_success(ProductSerializer.new(related).as_json)
      end
      
      private
      
      def product_params
        params.require(:product).permit(
          :name, :description, :short_description,
          :base_price, :category_id, :company_id,
          :specs, :images, :video_url,
          :warranty_months, :lead_time_days,
          :area_m2, :bedrooms, :bathrooms,
          :featured, :active,
          :meta_title, :meta_description, :meta_keywords
        )
      end
    end
  end
end
