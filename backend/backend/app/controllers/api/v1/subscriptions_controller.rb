module Api
  module V1
    class SubscriptionsController < BaseController
      before_action :authenticate_user!, except: [:show]

      def index
        subscriptions = current_user.subscriptions
        render_success(serialize(subscriptions))
      end

      def show
        subscription = Subscription.find_by(id: params[:id])
        return render_not_found unless subscription
        render_success(serialize(subscription))
      end

      def create
        plan = Plan.find_by(id: params[:plan_id])
        return render_error('Plano não encontrado') unless plan
        subscription = current_user.subscriptions.build(subscription_params)
        subscription.plan = plan
        if subscription.save
          render_success(serialize(subscription), 'Assinatura criada')
        else
          render_error('Erro ao criar assinatura', subscription.errors.full_messages)
        end
      end

      def update
        subscription = current_user.subscriptions.find_by(id: params[:id])
        return render_not_found unless subscription
        if subscription.update(subscription_params)
          render_success(serialize(subscription), 'Assinatura atualizada')
        else
          render_error('Erro ao atualizar assinatura', subscription.errors.full_messages)
        end
      end

      def destroy
        subscription = current_user.subscriptions.find_by(id: params[:id])
        return render_not_found unless subscription
        subscription.cancel
        render_success(serialize(subscription), 'Assinatura cancelada')
      end

      private

      def subscription_params
        params.require(:subscription).permit(:billing_cycle, :stripe_subscription_id, :stripe_customer_id)
      end

      def serialize(subscription)
        SubscriptionSerializer.new(subscription).as_json
      end

      def serialize(subscriptions)
        subscriptions.map { |s| SubscriptionSerializer.new(s).as_json }
      end
    end
  end
end
