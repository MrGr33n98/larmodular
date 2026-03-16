class ProductView < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :product
  belongs_to :company, optional: true
  belongs_to :region, optional: true
  belongs_to :city, optional: true

  enum :device_type, { desktop: 'desktop', mobile: 'mobile', tablet: 'tablet' }, prefix: true

  scope :recent, -> { order(created_at: :desc) }
  scope :by_product, ->(product_id) { where(product_id: product_id) }
  scope :by_session, ->(session_id) { where(session_id: session_id) }

  def self.ransackable_associations(_auth_object = nil)
    %w[user product company region city]
  end

  def to_s
    "View ##{id} - #{product.name}"
  end
end
