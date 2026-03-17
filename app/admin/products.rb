ActiveAdmin.register Product do
  menu label: 'Produtos'

  permit_params :name, :slug, :description, :base_price, :video_url, :category_id, :company_id,
                :active, :featured, :warranty_months, :lead_time_days, :area_m2,
                :bedrooms, :bathrooms

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
      f.input :video_url, label: 'URL do Vídeo'
      f.input :warranty_months, label: 'Garantia (meses)'
      f.input :lead_time_days, label: 'Prazo de Entrega (dias)'
      f.input :area_m2, label: 'Área (m²)'
      f.input :bedrooms, label: 'Quartos'
      f.input :bathrooms, label: 'Banheiros'
      f.input :category, label: 'Categoria'
      f.input :company, label: 'Empresa'
      f.input :active, label: 'Ativo'
      f.input :featured, label: 'Destaque'
    end
    f.actions
  end
end
