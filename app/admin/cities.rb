ActiveAdmin.register City do
  menu label: 'Cidades'

  permit_params :name, :region_id, :state, :state_name, :population, :gdp_index, :active

  filter :name, label: 'Nome'
  filter :region, label: 'Região'
  filter :state, label: 'Estado'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :region, label: 'Região'
    column :state, label: 'Estado'
    column :population, label: 'População'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :region, label: 'Região'
      f.input :state, label: 'Estado (UF)'
      f.input :state_name, label: 'Nome do Estado'
      f.input :population, label: 'População'
      f.input :gdp_index, label: 'Índice PIB'
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
