ActiveAdmin.register Subscription do
  menu label: 'Assinaturas'

  permit_params :user_id, :plan_id, :status, :stripe_subscription_id, :stripe_customer_id,
                :billing_cycle, :current_period_start, :current_period_end, :canceled_at,
                :cancel_at_period_end

  filter :user, label: 'Usuário'
  filter :plan, label: 'Plano'
  filter :status, label: 'Status'
  filter :billing_cycle, label: 'Ciclo de Cobrança'

  index do
    selectable_column
    id_column
    column :user, label: 'Usuário'
    column :plan, label: 'Plano'
    column :status, label: 'Status'
    column :billing_cycle, label: 'Ciclo'
    column :current_period_start, label: 'Início do Período'
    column :current_period_end, label: 'Fim do Período'
    actions
  end

  form do |f|
    f.inputs do
      f.input :user, label: 'Usuário'
      f.input :plan, label: 'Plano'
      f.input :status, label: 'Status'
      f.input :stripe_subscription_id, label: 'ID Stripe'
      f.input :stripe_customer_id, label: 'Cliente Stripe'
      f.input :billing_cycle, label: 'Ciclo', as: :select, collection: ['monthly', 'yearly']
      f.input :current_period_start, label: 'Início do Período'
      f.input :current_period_end, label: 'Fim do Período'
      f.input :cancel_at_period_end, label: 'Cancelar ao Final do Período'
    end
    f.actions
  end
end
