ActiveAdmin.register AdCampaign do
  menu label: 'Campanhas'

  permit_params :advertiser_id, :name, :description, :budget_cents, :spent_cents, :targeting,
                :start_date, :end_date, :status, :active

  filter :advertiser, label: 'Anunciante'
  filter :name, label: 'Nome'
  filter :status, label: 'Status'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :advertiser, label: 'Anunciante'
    column :name, label: 'Nome'
    column :budget_cents, label: 'Orçamento'
    column :spent_cents, label: 'Gasto'
    column :status, label: 'Status'
    column :start_date, label: 'Data de Início'
    column :end_date, label: 'Data de Término'
    actions
  end

  form do |f|
    f.inputs do
      f.input :advertiser, label: 'Anunciante'
      f.input :name, label: 'Nome'
      f.input :description, label: 'Descrição'
      f.input :budget_cents, label: 'Orçamento (centavos)'
      f.input :spent_cents, label: 'Gasto (centavos)'
      f.input :targeting, label: 'Segmentação', as: :text
      f.input :start_date, label: 'Data de Início'
      f.input :end_date, label: 'Data de Término'
      f.input :status, label: 'Status', as: :select, collection: ['draft', 'active', 'paused', 'completed']
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
