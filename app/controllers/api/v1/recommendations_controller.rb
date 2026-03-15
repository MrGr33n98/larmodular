module Api
  module V1
    class RecommendationsController < BaseController
      def index
        type = params[:type] || 'products'
        limit = (params[:limit] || 10).to_i

        case type
        when 'products'
          render_success(recommended_products(limit))
        when 'companies'
          render_success(recommended_companies(limit))
        when 'similar'
          product_id = params[:product_id]
          render_success(similar_products(product_id, limit))
        else
          render_error('Tipo de recomendação inválido')
        end
      end

      private

      def recommended_products(limit)
        products = if user_signed_in? && current_user.favorites.any?
                    Product.active.where(category_id: current_user.favorites.first.product.category_id)
                  else
                    Product.active.featured
                  end
        products = products.order('RANDOM()').limit(limit)
        products.map { |p| ProductSerializer.new(p).as_json }
      end

      def recommended_companies(limit)
        companies = Company.active.featured.order('RANDOM()').limit(limit)
        companies.map { |c| CompanySerializer.new(c).as_json }
      end

      def similar_products(product_id, limit)
        return [] unless product_id
        product = Product.find_by(id: product_id)
        return [] unless product
        similar = Product.active.where(category_id: product.category_id)
                         .where.not(id: product.id)
                         .limit(limit)
        similar.map { |p| ProductSerializer.new(p).as_json }
      end
    end
  end
end
