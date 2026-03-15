ActiveAdmin.register AdPlacement do
  menu label: 'Posições de Anúncio'

  permit_params :position_key, :page, :location, :width, :height, :price_cents, :description, :active

  filter :position_key, label: 'Chave'
  filter :page, label: 'Página'
  filter :location, label: 'Localização'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :position_key, label: 'Chave'
    column :page, label: 'Página'
    column :location, label: 'Localização'
    column :width, label: 'Largura'
    column :height, label: 'Altura'
    column :price_cents, label: 'Preço'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :position_key, label: 'Chave da Posição'
      f.input :page, label: 'Página'
      f.input :location, label: 'Localização'
      f.input :width, label: 'Largura'
      f.input :height, label: 'Altura'
      f.input :price_cents, label: 'Preço (centavos)'
      f.input :description, label: 'Descrição'
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
