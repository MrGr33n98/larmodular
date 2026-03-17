ActiveAdmin.register Company do
  menu label: 'Empresas'

  permit_params :name, :slug, :description, :logo_url, :banner_url, :website, :phone, :email,
                :address, :zip_code, :region_id, :city_id, :status, :verified, :featured

  filter :name, label: 'Nome'
  filter :region, label: 'Região'
  filter :city, label: 'Cidade'
  filter :status, label: 'Status'
  filter :verified, label: 'Verificada'
  filter :featured, label: 'Destaque'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :region, label: 'Região'
    column :city, label: 'Cidade'
    column :status, label: 'Status'
    column :verified, label: 'Verificada'
    column :featured, label: 'Destaque'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :slug, label: 'Slug'
      f.input :description, label: 'Descrição'
      f.input :logo_url, label: 'Logo URL'
      f.input :banner_url, label: 'Banner URL'
      f.input :website, label: 'Website'
      f.input :phone, label: 'Telefone'
      f.input :email, label: 'Email'
      f.input :address, label: 'Endereço'
      f.input :zip_code, label: 'CEP'
      f.input :region, label: 'Região'
      f.input :city, label: 'Cidade'
      f.input :status, label: 'Status', as: :select, collection: ['pending', 'approved', 'rejected']
      f.input :verified, label: 'Verificada'
      f.input :featured, label: 'Destaque'
    end
    f.actions
  end
end
