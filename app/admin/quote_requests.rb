ActiveAdmin.register QuoteRequest do
  menu label: 'Orçamentos'

  permit_params :user_id, :product_id, :company_id, :lead_id, :message, :budget_min,
                :budget_max, :timeline, :intent_score, :status, :response_message,
                :quoted_price, :converted

  filter :company, label: 'Empresa'
  filter :product, label: 'Produto'
  filter :lead, label: 'Lead'
  filter :status, label: 'Status'
  filter :converted, label: 'Convertido'

  index do
    selectable_column
    id_column
    column :product, label: 'Produto'
    column :company, label: 'Empresa'
    column :user, label: 'Usuário'
    column :timeline, label: 'Prazo'
    column :status, label: 'Status'
    column :quoted_price, label: 'Preço Cotado'
    column :converted, label: 'Convertido'
    actions
  end

  form do |f|
    f.inputs do
      f.input :user, label: 'Usuário'
      f.input :product, label: 'Produto'
      f.input :company, label: 'Empresa'
      f.input :lead, label: 'Lead'
      f.input :message, label: 'Mensagem'
      f.input :budget_min, label: 'Orçamento Mínimo'
      f.input :budget_max, label: 'Orçamento Máximo'
      f.input :timeline, label: 'Prazo', as: :select, collection: ['immediate', '1_3_months', '3_6_months', '6_12_months', 'over_1_year']
      f.input :status, label: 'Status', as: :select, collection: ['pending', 'responded', 'accepted', 'declined', 'expired']
      f.input :response_message, label: 'Mensagem de Resposta'
      f.input :quoted_price, label: 'Preço Cotado'
      f.input :converted, label: 'Convertido'
    end
    f.actions
  end
end
