module Api
  module V1
    class PaymentsController < BaseController
      before_action :authenticate_user!

      def index
        payments = current_user.payments.recent
        payments = payments.page(params[:page]).per(params[:per_page] || 20)
        render_success(serialize(payments), nil, paginate(payments))
      end

      def show
        payment = current_user.payments.find_by(id: params[:id])
        return render_not_found unless payment
        render_success(serialize(payment))
      end

      private

      def serialize(payment)
        {
          id: payment.id,
          amount: payment.amount.to_f,
          currency: payment.currency,
          status: payment.status,
          payment_method: payment.payment_method,
          description: payment.description,
          paid_at: payment.paid_at,
          created_at: payment.created_at
        }
      end

      def serialize(payments)
        payments.map { |p| serialize(p) }
      end
    end
  end
end
