ActiveAdmin.register Lead do
  menu label: 'Leads'

  permit_params :name, :email, :phone, :company_id, :region_id, :city_id, :user_id, :source,
                :intent_score, :funnel_stage, :qualification_status, :status, :notes, :metadata

  filter :company, label: 'Empresa'
  filter :region, label: 'Região'
  filter :funnel_stage, label: 'Estágio do Funil'
  filter :qualification_status, label: 'Status de Qualificação'
  filter :status, label: 'Status'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :email, label: 'Email'
    column :phone, label: 'Telefone'
    column :company, label: 'Empresa'
    column :intent_score, label: 'Score'
    column :funnel_stage, label: 'Estágio'
    column :qualification_status, label: 'Qualificação'
    column :status, label: 'Status'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :email, label: 'Email'
      f.input :phone, label: 'Telefone'
      f.input :company, label: 'Empresa'
      f.input :region, label: 'Região'
      f.input :city, label: 'Cidade'
      f.input :source, label: 'Fonte'
      f.input :intent_score, label: 'Score de Intenção'
      f.input :funnel_stage, label: 'Estágio do Funil', as: :select, collection: ['awareness', 'consideration', 'decision']
      f.input :qualification_status, label: 'Status de Qualificação', as: :select, collection: ['new', 'contacted', 'qualified', 'converted', 'lost']
      f.input :status, label: 'Status'
      f.input :notes, label: 'Notas'
    end
    f.actions
  end
end
