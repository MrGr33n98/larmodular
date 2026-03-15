module Api
  module V1
    class ReviewsController < BaseController
      before_action :authenticate_user!, only: [:create, :update, :destroy]

      def index
        reviews = if params[:company_id]
                    Review.where(company_id: params[:company_id]).approved.recent
                  elsif params[:product_id]
                    Review.where(product_id: params[:product_id]).approved.recent
                  else
                    Review.approved.recent
                  end
        reviews = reviews.page(params[:page]).per(params[:per_page] || 20)
        render_success(serialize(reviews), nil, paginate(reviews))
      end

      def show
        review = Review.find_by(id: params[:id])
        return render_not_found unless review
        render_success(serialize(review))
      end

      def create
        review = Review.new(review_params)
        review.user = current_user
        if review.save
          render_success(serialize(review), 'Avaliação criada com sucesso')
        else
          render_error('Erro ao criar avaliação', review.errors.full_messages)
        end
      end

      def update
        review = Review.find_by(id: params[:id])
        return render_not_found unless review
        return render_error('Unauthorized', nil, :unauthorized) unless review.user == current_user
        if review.update(review_params)
          render_success(serialize(review), 'Avaliação atualizada')
        else
          render_error('Erro ao atualizar avaliação', review.errors.full_messages)
        end
      end

      def destroy
        review = Review.find_by(id: params[:id])
        return render_not_found unless review
        return render_error('Unauthorized', nil, :unauthorized) unless review.user == current_user
        review.destroy
        render_success(nil, 'Avaliação excluída')
      end

      private

      def review_params
        params.require(:review).permit(:company_id, :product_id, :rating, :title, :comment, :images)
      end

      def serialize(review)
        ReviewSerializer.new(review).as_json
      end

      def serialize(reviews)
        reviews.map { |r| ReviewSerializer.new(r).as_json }
      end
    end
  end
end
