module Api
  module V1
    class StripeWebhooksController < BaseController
      skip_before_action :authenticate_user_from_token!
      skip_before_action :verify_authenticity_token

      def handle_event
        payload = request.body.read
        sig_header = request.headers['Stripe-Signature']

        event = StripeService.construct_webhook_event(payload, sig_header)

        if event.nil?
          render json: { error: 'Invalid webhook' }, status: :bad_request
          return
        end

        case event.type
        when 'customer.subscription.created'
          handle_subscription_created(event.data.object)
        when 'customer.subscription.updated'
          handle_subscription_updated(event.data.object)
        when 'customer.subscription.deleted'
          handle_subscription_deleted(event.data.object)
        when 'invoice.paid'
          handle_invoice_paid(event.data.object)
        when 'invoice.payment_failed'
          handle_invoice_payment_failed(event.data.object)
        when 'checkout.session.completed'
          handle_checkout_completed(event.data.object)
        else
          Rails.logger.info("Unhandled Stripe event type: #{event.type}")
        end

        render json: { received: true }, status: :ok
      end

      private

      def handle_subscription_created(stripe_subscription)
        subscription = Subscription.find_by(stripe_subscription_id: stripe_subscription.id)
        return unless subscription

        subscription.update!(
          status: stripe_subscription.status,
          current_period_start: Time.at(stripe_subscription.current_period_start),
          current_period_end: Time.at(stripe_subscription.current_period_end)
        )
      end

      def handle_subscription_updated(stripe_subscription)
        subscription = Subscription.find_by(stripe_subscription_id: stripe_subscription.id)
        return unless subscription

        subscription.update!(
          status: stripe_subscription.status,
          current_period_start: Time.at(stripe_subscription.current_period_start),
          current_period_end: Time.at(stripe_subscription.current_period_end),
          cancel_at_period_end: stripe_subscription.cancel_at_period_end,
          canceled_at: stripe_subscription.canceled_at ? Time.at(stripe_subscription.canceled_at) : nil
        )
      end

      def handle_subscription_deleted(stripe_subscription)
        subscription = Subscription.find_by(stripe_subscription_id: stripe_subscription.id)
        return unless subscription

        subscription.update!(status: 'canceled')
      end

      def handle_invoice_paid(stripe_invoice)
        subscription = Subscription.find_by(stripe_subscription_id: stripe_invoice.subscription)
        return unless subscription

        Payment.create!(
          subscription: subscription,
          user: subscription.user,
          stripe_payment_intent_id: stripe_invoice.payment_intent,
          stripe_charge_id: stripe_invoice.charge,
          amount: stripe_invoice.amount_paid / 100.0,
          currency: stripe_invoice.currency,
          status: 'succeeded',
          paid_at: Time.current
        )
      end

      def handle_invoice_payment_failed(stripe_invoice)
        subscription = Subscription.find_by(stripe_subscription_id: stripe_invoice.subscription)
        return unless subscription

        subscription.update!(status: 'past_due')

        Payment.create!(
          subscription: subscription,
          user: subscription.user,
          stripe_payment_intent_id: stripe_invoice.payment_intent,
          amount: stripe_invoice.amount_due / 100.0,
          currency: stripe_invoice.currency,
          status: 'failed',
          failed_at: Time.current
        )
      end

      def handle_checkout_completed(stripe_session)
        Rails.logger.info("Checkout completed: #{stripe_session.id}")
      end
    end
  end
end
