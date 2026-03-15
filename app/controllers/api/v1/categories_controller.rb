module Api
  module V1
    class CategoriesController < BaseController
      def index
        if params[:parent_id].present?
          category = Category.friendly_find(params[:parent_id])
          categories = category&.children&.active&.ordered || []
        else
          categories = Category.active.roots.ordered
        end
        render_success(serialize(categories))
      end

      def show
        category = Category.friendly_find(params[:id])
        return render_not_found unless category
        render_success(serialize(category))
      end

      private

      def serialize(category)
        CategorySerializer.new(category).as_json
      end

      def serialize(categories)
        categories.map { |c| CategorySerializer.new(c).as_json }
      end
    end
  end
end
