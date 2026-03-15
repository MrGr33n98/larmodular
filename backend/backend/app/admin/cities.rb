ActiveAdmin.register City do
  menu label: 'Cidades'

  permit_params :name, :slug, :region_id, :state, :timezone

  filter :name, label: 'Nome'
  filter :region, label: 'Região'
  filter :state, label: 'Estado'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :region, label: 'Região'
    column :state, label: 'Estado'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :slug, label: 'Slug'
      f.input :region, label: 'Região'
      f.input :state, label: 'Estado'
      f.input :timezone, label: 'Fuso Horário'
    end
    f.actions
  end
end
