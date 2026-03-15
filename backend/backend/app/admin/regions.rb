ActiveAdmin.register Region do
  menu label: 'Regiões'

  permit_params :name, :slug, :tax_multiplier, :timezone, :active

  filter :name, label: 'Nome'
  filter :slug, label: 'Slug'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :slug, label: 'Slug'
    column :tax_multiplier, label: 'Multiplicador de Taxa'
    column :timezone, label: 'Fuso Horário'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :slug, label: 'Slug'
      f.input :tax_multiplier, label: 'Multiplicador de Taxa'
      f.input :timezone, label: 'Fuso Horário'
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
