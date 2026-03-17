class TrackProductViewJob < ApplicationJob
  queue_as :default

  def perform(user_id:, product_id:, session_id:, region_id: nil, city_id: nil, duration_seconds: nil, referrer: nil, device_type: nil)
    product = Product.find_by(id: product_id)
    return unless product

    view = ProductView.create!(
      user_id: user_id,
      product: product,
      company: product.company,
      region_id: region_id,
      city_id: city_id,
      session_id: session_id,
      duration_seconds: duration_seconds,
      referrer: referrer,
      device_type: device_type
    )

    product.increment!(:views_count)

    view
  end
end
