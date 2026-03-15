ActiveAdmin.register AdBanner do
  menu label: 'Banners'

  permit_params :campaign_id, :placement_id, :name, :image_url, :target_url, :alt_text,
                :impressions_limit, :impressions_count, :clicks_count, :priority, :active, :approved

  filter :campaign, label: 'Campanha'
  filter :placement, label: 'Posição'
  filter :name, label: 'Nome'
  filter :active, label: 'Ativo'
  filter :approved, label: 'Aprovado'

  index do
    selectable_column
    id_column
    column :campaign, label: 'Campanha'
    column :placement, label: 'Posição'
    column :name, label: 'Nome'
    column :impressions_count, label: 'Impressões'
    column :clicks_count, label: 'Cliques'
    column :priority, label: 'Prioridade'
    column :active, label: 'Ativo'
    column :approved, label: 'Aprovado'
    actions
  end

  form do |f|
    f.inputs do
      f.input :campaign, label: 'Campanha'
      f.input :placement, label: 'Posição'
      f.input :name, label: 'Nome'
      f.input :image_url, label: 'URL da Imagem'
      f.input :target_url, label: 'URL de Destino'
      f.input :alt_text, label: 'Texto Alternativo'
      f.input :impressions_limit, label: 'Limite de Impressões'
      f.input :priority, label: 'Prioridade'
      f.input :active, label: 'Ativo'
      f.input :approved, label: 'Aprovado'
    end
    f.actions
  end
end
