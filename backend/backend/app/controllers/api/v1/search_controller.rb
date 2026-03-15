module Api
  module V1
    class SearchController < BaseController
      def index
        query = params[:q]&.strip
        return render_error('Parâmetro de busca vazio') if query.blank?

        results = {
          companies: search_companies(query),
          products: search_products(query),
          categories: search_categories(query)
        }

        render_success(results)
      end

      def featured
        companies = Company.active.featured.limit(10)
        products = Product.active.featured.limit(10)
        render_success({
          companies: serialize_companies(companies),
          products: serialize_products(products)
        })
      end

      private

      def search_companies(query)
        Company.active.where('name ILIKE ?', "%#{query}%")
               .or(Company.active.where('description ILIKE ?', "%#{query}%"))
               .limit(10)
      end

      def search_products(query)
        Product.active.where('name ILIKE ?', "%#{query}%")
               .or(Product.active.where('description ILIKE ?', "%#{query}%"))
               .limit(20)
      end

      def search_categories(query)
        Category.active.where('name ILIKE ?', "%#{query}%").limit(10)
      end

      def serialize_companies(companies)
        companies.map { |c| CompanySerializer.new(c).as_json }
      end

      def serialize_products(products)
        products.map { |p| ProductSerializer.new(p).as_json }
      end
    end
  end
end
