class ProductAffinity < ApplicationRecord
  belongs_to :product_a, class_name: 'Product'
  belongs_to :product_b, class_name: 'Product'

  validates :product_a_id, uniqueness: { scope: :product_b_id }

  scope :high_score, -> { where('score > ?', 50).order(score: :desc) }

  def self.ransackable_associations(_auth_object = nil)
    %w[product_a product_b]
  end

  def to_s
    "#{product_a.name} <-> #{product_b.name}: #{score}"
  end
end
