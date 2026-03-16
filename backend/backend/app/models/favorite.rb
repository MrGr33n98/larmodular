class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :user_id, uniqueness: { scope: :product_id }

  scope :recent, -> { order(created_at: :desc) }

  def self.ransackable_associations(_auth_object = nil)
    %w[user product]
  end

  def to_s
    "#{user.name} - #{product.name}"
  end
end
