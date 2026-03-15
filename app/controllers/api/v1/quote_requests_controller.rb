module Api
  module V1
    class QuoteRequestsController < BaseController
      before_action :authenticate_user!, only: [:create, :update]

      def index
        quote_requests = if current_user.company
                          current_user.company.quote_requests
                        else
                          QuoteRequest.all
                        end
        quote_requests = quote_requests.recent
        quote_requests = quote_requests.page(params[:page]).per(params[:per_page] || 20)
        render_success(serialize(quote_requests), nil, paginate(quote_requests))
      end

      def show
        quote_request = QuoteRequest.find_by(id: params[:id])
        return render_not_found unless quote_request
        render_success(serialize(quote_request))
      end

      def create
        product = Product.find_by(id: params[:product_id])
        company = Company.find_by(id: params[:company_id])
        return render_error('Produto ou empresa não encontrada') unless product && company
        quote_request = QuoteRequest.new(quote_request_params)
        quote_request.product = product
        quote_request.company = company
        quote_request.user = current_user if user_signed_in?
        if quote_request.save
          render_success(serialize(quote_request), 'Solicitação de orçamento enviada')
        else
          render_error('Erro ao criar orçamento', quote_request.errors.full_messages)
        end
      end

      def update
        quote_request = QuoteRequest.find_by(id: params[:id])
        return render_not_found unless quote_request
        if quote_request.update(quote_request_params)
          render_success(serialize(quote_request), 'Orçamento atualizado')
        else
          render_error('Erro ao atualizar orçamento', quote_request.errors.full_messages)
        end
      end

      private

      def quote_request_params
        params.require(:quote_request).permit(:product_id, :company_id, :lead_id, :message, :budget_min, :budget_max, :timeline, :response_message, :quoted_price, :status)
      end

      def serialize(quote_request)
        QuoteRequestSerializer.new(quote_request).as_json
      end

      def serialize(quote_requests)
        quote_requests.map { |q| QuoteRequestSerializer.new(q).as_json }
      end
    end
  end
end
