class SubscriptionService
  class << self
    def create_subscription_for_user(user, plan, billing_cycle: 'monthly')
      return { error: 'Usuário não encontrado' } unless user
      return { error: 'Plano não encontrado' } unless plan

      customer_id = user.subscription&.stripe_customer_id
      unless customer_id
        customer_id = StripeService.create_customer(user)
        return { error: 'Erro ao criar cliente Stripe' } unless customer_id
      end

      stripe_price_id = billing_cycle == 'yearly' ? plan.stripe_yearly_price_id : plan.stripe_monthly_price_id
      unless stripe_price_id
        return { error: 'Price ID não configurado para este plano' }
      end

      result = StripeService.create_subscription(customer_id, stripe_price_id)

      if result[:error]
        return result
      end

      subscription = Subscription.create!(
        user: user,
        plan: plan,
        stripe_subscription_id: result[:subscription_id],
        stripe_customer_id: customer_id,
        billing_cycle: billing_cycle,
        status: result[:status],
        current_period_start: Time.current,
        current_period_end: billing_cycle == 'yearly' ? 1.year.from_now : 1.month.from_now
      )

      {
        subscription: subscription,
        client_secret: result[:client_secret]
      }
    end

    def cancel_subscription(subscription, at_period_end: true)
      return { error: 'Assinatura não encontrada' } unless subscription

      result = StripeService.cancel_subscription(
        subscription.stripe_subscription_id,
        at_period_end: at_period_end
      )

      if result[:error]
        return result
      end

      subscription.update!(
        cancel_at_period_end: result[:cancel_at],
        canceled_at: result[:canceled_at]
      )

      { subscription: subscription }
    end

    def create_checkout_session(subscription, success_url, cancel_url)
      return nil unless subscription

      StripeService.create_checkout_session(
        subscription.stripe_subscription_id,
        success_url,
        cancel_url
      )
    end
  end
end
