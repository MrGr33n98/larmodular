module Api
  module V1
    class QuoteRequestsController < BaseController
      before_action :authenticate_user!, only: [:index, :update]

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
        qr_params = quote_request_params
        product = Product.find_by(id: qr_params[:product_id])
        company = Company.find_by(id: qr_params[:company_id])
        return render_error('Produto ou empresa não encontrada') unless product && company

        lead = find_or_create_lead(company)

        quote_request = QuoteRequest.new(qr_params.except(:lead_attributes))
        quote_request.product = product
        quote_request.company = company
        quote_request.lead = lead if lead&.persisted?
        quote_request.user = current_user if user_signed_in?

        if quote_request.save
          render json: { success: true, message: 'Solicitação de orçamento enviada', data: serialize(quote_request) }, status: :created
        else
          render_error('Erro ao criar orçamento', quote_request.errors.full_messages)
        end
      end

      def update
        quote_request = QuoteRequest.find_by(id: params[:id])
        return render_not_found unless quote_request
        if quote_request.update(quote_request_params.except(:lead_attributes))
          render_success(serialize(quote_request), 'Orçamento atualizado')
        else
          render_error('Erro ao atualizar orçamento', quote_request.errors.full_messages)
        end
      end

      private

      def quote_request_params
        params.require(:quote_request).permit(
          :product_id, :company_id, :lead_id, :message,
          :budget_min, :budget_max, :timeline,
          :response_message, :quoted_price, :status,
          lead_attributes: [:name, :email, :phone]
        )
      end

      def find_or_create_lead(company)
        lead_attrs = quote_request_params[:lead_attributes]
        return nil unless lead_attrs.present?

        lead = Lead.find_or_initialize_by(email: lead_attrs[:email], company: company)
        lead.assign_attributes(
          name: lead_attrs[:name],
          phone: lead_attrs[:phone],
          source: 'quote_request'
        )
        lead.save ? lead : nil
      end

      def serialize(resource)
        if resource.respond_to?(:map)
          resource.map { |q| QuoteRequestSerializer.new(q).as_json }
        else
          QuoteRequestSerializer.new(resource).as_json
        end
      end
    end
  end
end
