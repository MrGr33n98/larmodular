class StripeService
  API_VERSION = '2023-10-16'.freeze

  class << self
    def create_customer(user)
      customer = Stripe::Customer.create(
        email: user.email,
        name: user.name,
        metadata: {
          user_id: user.id
        }
      )
      customer.id
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe create_customer error: #{e.message}")
      nil
    end

    def create_subscription(customer_id, price_id, coupon: nil)
      args = {
        customer: customer_id,
        items: [{ price: price_id }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent']
      }
      args[:coupon] = coupon if coupon.present?

      subscription = Stripe::Subscription.create(args)
      {
        subscription_id: subscription.id,
        client_secret: subscription.latest_invoice.payment_intent.client_secret,
        status: subscription.status
      }
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe create_subscription error: #{e.message}")
      { error: e.message }
    end

    def cancel_subscription(subscription_id, at_period_end: true)
      subscription = Stripe::Subscription.update(
        subscription_id,
        { cancel_at_period_end: at_period_end }
      )
      {
        subscription_id: subscription.id,
        cancel_at: subscription.cancel_at,
        canceled_at: subscription.canceled_at
      }
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe cancel_subscription error: #{e.message}")
      { error: e.message }
    end

    def create_checkout_session(subscription_id, success_url, cancel_url)
      session = Stripe::Checkout::Session.create(
        mode: 'subscription',
        subscription: subscription_id,
        success_url: success_url,
        cancel_url: cancel_url,
        locale: 'pt-BR',
        currency: 'brl'
      )
      session.url
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe create_checkout_session error: #{e.message}")
      nil
    end

    def create_payment_intent(amount, currency: 'brl', customer: nil, metadata: {})
      args = {
        amount: (amount * 100).to_i,
        currency: currency,
        metadata: metadata
      }
      args[:customer] = customer if customer.present?

      intent = Stripe::PaymentIntent.create(args)
      {
        payment_intent_id: intent.id,
        client_secret: intent.client_secret,
        status: intent.status
      }
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe create_payment_intent error: #{e.message}")
      { error: e.message }
    end

    def construct_webhook_event(payload, sig_header)
      Stripe::Webhook.construct_event(
        payload,
        sig_header,
        ENV['STRIPE_WEBHOOK_SECRET']
      )
    rescue JSON::ParserError, Stripe::SignatureVerificationError => e
      Rails.logger.error("Stripe webhook error: #{e.message}")
      nil
    end

    def get_subscription(subscription_id)
      Stripe::Subscription.retrieve(subscription_id)
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe get_subscription error: #{e.message}")
      nil
    end

    def get_invoice(invoice_id)
      Stripe::Invoice.retrieve(invoice_id)
    rescue Stripe::StripeError => e
      Rails.logger.error("Stripe get_invoice error: #{e.message}")
      nil
    end
  end
end
