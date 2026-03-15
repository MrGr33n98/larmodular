class SubscriptionStatusNotification < Noticed::Base
  deliver_by :database
  deliver_by :email, mailer: 'SubscriptionMailer', param: :recipient

  param :subscription

  def title
    "Status da Assinatura: #{subscription.status}"
  end

  def message
    case subscription.status
    when 'active'
      "Sua assinatura #{subscription.plan.name} está ativa!"
    when 'past_due'
      "Sua assinatura #{subscription.plan.name} está com pagamento pendente"
    when 'canceled'
      "Sua assinatura #{subscription.plan.name} foi cancelada"
    else
      "Atualização da sua assinatura #{subscription.plan.name}"
    end
  end

  def subscription
    params[:subscription]
  end

  def url
    "/assinatura"
  end
end
