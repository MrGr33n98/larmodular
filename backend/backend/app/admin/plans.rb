ActiveAdmin.register Plan do
  menu label: 'Planos'

  permit_params :name, :slug, :description, :price_monthly, :price_yearly, :features,
                :limits, :highlighted, :active, :position

  filter :name, label: 'Nome'
  filter :highlighted, label: 'Destaque'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :slug, label: 'Slug'
    column :price_monthly, label: 'Preço Mensal'
    column :price_yearly, label: 'Preço Anual'
    column :highlighted, label: 'Destaque'
    column :position, label: 'Posição'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :slug, label: 'Slug'
      f.input :description, label: 'Descrição'
      f.input :price_monthly, label: 'Preço Mensal'
      f.input :price_yearly, label: 'Preço Anual'
      f.input :features, label: 'Funcionalidades', as: :text
      f.input :limits, label: 'Limites', as: :text
      f.input :highlighted, label: 'Destaque'
      f.input :position, label: 'Posição'
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
