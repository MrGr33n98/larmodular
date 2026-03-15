ActiveAdmin.register Review do
  menu label: 'Avaliações'

  permit_params :user_id, :company_id, :product_id, :rating, :title, :comment, :images,
                :verified_purchase, :status, :company_response, :company_response_text

  filter :company, label: 'Empresa'
  filter :product, label: 'Produto'
  filter :user, label: 'Usuário'
  filter :rating, label: 'Avaliação'
  filter :status, label: 'Status'

  index do
    selectable_column
    id_column
    column :user, label: 'Usuário'
    column :company, label: 'Empresa'
    column :product, label: 'Produto'
    column :rating, label: 'Avaliação'
    column :status, label: 'Status'
    column :verified_purchase, label: 'Compra Verificada'
    actions
  end

  form do |f|
    f.inputs do
      f.input :user, label: 'Usuário'
      f.input :company, label: 'Empresa'
      f.input :product, label: 'Produto'
      f.input :rating, label: 'Avaliação'
      f.input :title, label: 'Título'
      f.input :comment, label: 'Comentário'
      f.input :status, label: 'Status', as: :select, collection: ['pending', 'approved', 'rejected']
      f.input :verified_purchase, label: 'Compra Verificada'
      f.input :company_response, label: 'Resposta da Empresa'
      f.input :company_response_text, label: 'Texto da Resposta'
    end
    f.actions
  end
end
