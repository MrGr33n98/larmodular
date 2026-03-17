ActiveAdmin.register Region do
  menu label: 'Regiões'

  permit_params :name, :code, :full_name, :tax_multiplier, :active

  filter :name, label: 'Nome'
  filter :code, label: 'Código'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :code, label: 'Código'
    column :full_name, label: 'Nome Completo'
    column :tax_multiplier, label: 'Multiplicador de Taxa'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :code, label: 'Código'
      f.input :full_name, label: 'Nome Completo'
      f.input :tax_multiplier, label: 'Multiplicador de Taxa'
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
