ActiveAdmin.register Product do
  menu label: 'Produtos'

  permit_params :name, :slug, :description, :base_price, :discount_price, :images, :specifications,
                :highlights, :video_url, :category_id, :company_id, :region_id, :city_id,
                :active, :featured, :views_count, :favorites_count

  filter :name, label: 'Nome'
  filter :company, label: 'Empresa'
  filter :category, label: 'Categoria'
  filter :active, label: 'Ativo'
  filter :featured, label: 'Destaque'

  index do
    selectable_column
    id_column
    column :name, label: 'Nome'
    column :company, label: 'Empresa'
    column :category, label: 'Categoria'
    column :base_price, label: 'Preço Base'
    column :active, label: 'Ativo'
    column :featured, label: 'Destaque'
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, label: 'Nome'
      f.input :slug, label: 'Slug'
      f.input :description, label: 'Descrição'
      f.input :base_price, label: 'Preço Base'
      f.input :discount_price, label: 'Preço com Desconto'
      f.input :images, label: 'Imagens (URLs JSON array)', as: :text, placeholder: '["https://exemplo.com/img1.jpg", "https://exemplo.com/img2.jpg"]'
      f.input :specifications, label: 'Especificações', as: :text
      f.input :highlights, label: 'Destaques', as: :text
      f.input :video_url, label: 'URL do Vídeo'
      f.input :category, label: 'Categoria'
      f.input :company, label: 'Empresa'
      f.input :region, label: 'Região'
      f.input :city, label: 'Cidade'
      f.input :active, label: 'Ativo'
      f.input :featured, label: 'Destaque'
    end
    f.actions
  end
end
