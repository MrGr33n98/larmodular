class Review < ApplicationRecord
  belongs_to :user
  belongs_to :company
  belongs_to :product, optional: true

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :user_id, uniqueness: { scope: [:company_id, :product_id], message: "já avaliou este produto/empresa" }

  scope :approved, -> { where(status: 'approved') }
  scope :pending, -> { where(status: 'pending') }
  scope :recent, -> { order(created_at: :desc) }

  def to_s
    "Avaliação #{rating}★ - #{user.name}"
  end
end
