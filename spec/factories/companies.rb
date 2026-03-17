FactoryBot.define do
  factory :company do
    sequence(:name) { |n| "Empresa #{n}" }
    sequence(:slug) { |n| "empresa-#{n}" }
    description { 'Descrição da empresa' }
    phone { '+5511999999999' }
    email { 'contato@empresa.com' }
    address { 'Rua Example, 123' }
    status { 'approved' }
    verified { false }
    featured { false }
    association :region
    association :city
    
    factory :company_featured do
      featured { true }
      verified { true }
    end
  end
end
