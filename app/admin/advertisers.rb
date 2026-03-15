ActiveAdmin.register Advertiser do
  menu label: 'Anunciantes'

  permit_params :name, :email, :logo_url, :phone, :website, :description, :active, :user_id

  filter :name, label: 'Nome'
  filter :email, label: 'Email'
  filter :active, label: 'Ativo'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :email, label: 'Email'
    column :phone, label: 'Telefone'
    column :website, label: 'Website'
    column :active, label: 'Ativo'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :email, label: 'Email'
      f.input :logo_url, label: 'Logo URL'
      f.input :phone, label: 'Telefone'
      f.input :website, label: 'Website'
      f.input :description, label: 'Descrição'
      f.input :user, label: 'Gerente de Conta'
      f.input :active, label: 'Ativo'
    end
    f.actions
  end
end
