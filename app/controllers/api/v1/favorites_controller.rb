module Api
  module V1
    class FavoritesController < BaseController
      before_action :authenticate_user!

      def index
        favorites = current_user.favorites.recent
        products = favorites.map(&:product)
        render_success(serialize(products))
      end

      def create
        product = Product.find_by(id: params[:product_id])
        return render_not_found('Produto não encontrado') unless product
        favorite = current_user.favorites.find_or_create_by(product: product)
        render_success(serialize(product), 'Produto adicionado aos favoritos')
      end

      def destroy
        favorite = current_user.favorites.find_by(product_id: params[:id])
        return render_not_found unless favorite
        favorite.destroy
        render_success(nil, 'Produto removido dos favoritos')
      end

      private

      def serialize(product)
        ProductSerializer.new(product).as_json
      end

      def serialize(products)
        products.map { |p| ProductSerializer.new(p).as_json }
      end
    end
  end
end
