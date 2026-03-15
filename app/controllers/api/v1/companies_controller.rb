module Api
  module V1
    class CompaniesController < BaseController
      before_action :authenticate_user!, except: [:index, :show]
      
      def index
        companies = Company.active
          .includes(:region, :city, :category)
          .by_category(params[:category_id])
          .by_region(params[:region_id])
          .featured(params[:featured] == 'true')
          .order(created_at: :desc)
        
        if params[:search].present?
          companies = companies.where("name ILIKE ?", "%#{params[:search]}%")
        end
        
        companies = companies.page(params[:page]).per(params[:per_page] || 20)
        
        render_success(
          CompanySerializer.new(companies).as_json,
          nil,
          { pagination: paginate(companies) }
        )
      end
      
      def show
        company = Company.friendly_find(params[:id])
        company.increment!(:views_count)
        
        render_success(CompanySerializer.new(company).as_json)
      end
      
      def products
        company = Company.friendly_find(params[:id])
        products = company.products.active
          .page(params[:page])
          .per(params[:per_page] || 20)
        
        render_success(
          products.map { |p| ProductSerializer.new(p).as_json },
          nil,
          { pagination: paginate(products) }
        )
      end
      
      def reviews
        company = Company.friendly_find(params[:id])
        reviews = company.reviews.approved
          .order(created_at: :desc)
          .page(params[:page])
          .per(params[:per_page] || 10)
        
        render_success(
          reviews.map { |r| ReviewSerializer.new(r).as_json },
          nil,
          { pagination: paginate(reviews) }
        )
      end
      
      private
      
      def company_params
        params.require(:company).permit(
          :name, :description, :logo_url, :banner_url,
          :address, :phone, :email, :website,
          :social_media, :region_id, :city_id,
          :delivery_areas, :featured, :active
        )
      end
    end
  end
end
