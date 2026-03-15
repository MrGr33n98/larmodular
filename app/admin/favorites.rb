ActiveAdmin.register Favorite do
  menu label: 'Favoritos'

  permit_params :user_id, :product_id

  filter :user, label: 'Usuário'
  filter :product, label: 'Produto'

  index do
    selectable_column
    id_column
    column :user, label: 'Usuário'
    column :product, label: 'Produto'
    column :created_at, label: 'Criado em'
    actions
  end

  form do |f|
    f.inputs do
      f.input :user, label: 'Usuário'
      f.input :product, label: 'Produto'
    end
    f.actions
  end
end
