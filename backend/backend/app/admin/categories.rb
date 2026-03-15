ActiveAdmin.register Category do
  menu label: 'Categorias'

  permit_params :name, :slug, :description, :icon, :parent_id, :position

  filter :name, label: 'Nome'
  filter :parent, label: 'Categoria Pai'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :icon, label: 'Ícone'
    column :parent, label: 'Categoria Pai'
    column :position, label: 'Posição'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :slug, label: 'Slug'
      f.input :description, label: 'Descrição'
      f.input :icon, label: 'Ícone'
      f.input :parent, label: 'Categoria Pai'
      f.input :position, label: 'Posição'
    end
    f.actions
  end
end
