ActiveAdmin.register Payment do
  menu label: 'Pagamentos'

  permit_params :subscription_id, :user_id, :stripe_payment_intent_id, :stripe_charge_id,
                :amount, :currency, :status, :payment_method, :description, :paid_at, :failed_at

  filter :user, label: 'Usuário'
  filter :subscription, label: 'Assinatura'
  filter :status, label: 'Status'
  filter :payment_method, label: 'Método de Pagamento'

  index do
    selectable_column
    id_column
    column :user, label: 'Usuário'
    column :subscription, label: 'Assinatura'
    column :amount, label: 'Valor'
    column :currency, label: 'Moeda'
    column :status, label: 'Status'
    column :payment_method, label: 'Método'
    column :paid_at, label: 'Pago em'
    actions
  end

  form do |f|
    f.inputs do
      f.input :subscription, label: 'Assinatura'
      f.input :user, label: 'Usuário'
      f.input :stripe_payment_intent_id, label: 'Payment Intent ID'
      f.input :stripe_charge_id, label: 'Charge ID'
      f.input :amount, label: 'Valor'
      f.input :currency, label: 'Moeda'
      f.input :status, label: 'Status'
      f.input :payment_method, label: 'Método de Pagamento'
      f.input :description, label: 'Descrição'
      f.input :paid_at, label: 'Pago em'
      f.input :failed_at, label: 'Falhou em'
    end
    f.actions
  end
end
