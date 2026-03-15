ActiveAdmin.register FeatureFlag do
  menu label: 'Feature Flags'

  permit_params :key, :enabled, :plans, :config, :active, :description

  filter :key, label: 'Chave'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :key, label: 'Chave'
    column :enabled, label: 'Habilitado'
    column :plans, label: 'Planos'
    column :active, label: 'Ativo'
    column :description, label: 'Descrição'
    actions
  end

  form do |f|
    f.inputs do
      f.input :key, label: 'Chave'
      f.input :enabled, label: 'Habilitado'
      f.input :plans, label: 'Planos', as: :text
      f.input :config, label: 'Configuração', as: :text
      f.input :active, label: 'Ativo'
      f.input :description, label: 'Descrição'
    end
    f.actions
  end
end
