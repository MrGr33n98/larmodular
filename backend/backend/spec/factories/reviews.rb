FactoryBot.define do
  factory :review do
    rating { 5 }
    title { 'Ótimo produto' }
    comment { 'Comentário excelente sobre o produto.' }
    status { 'approved' }
    verified_purchase { false }
    association :user
    association :company
    
    factory :review_pending do
      status { 'pending' }
    end
  end
end
