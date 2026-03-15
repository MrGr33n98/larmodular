class CalculateProductAffinitiesJob < ApplicationJob
  queue_as :default

  def perform
    views = ProductView.where('created_at > ?', 7.days.ago)
    sessions = views.group_by(&:session_id).values

    affinity_counts = Hash.new(0)

    sessions.each do |session_views|
      product_ids = session_views.map(&:product_id).uniq
      next if product_ids.count < 2

      product_ids.combination(2).each do |pair|
        key = pair.sort.join('-')
        affinity_counts[key] += 1
      end
    end

    affinity_counts.each do |key, count|
      product_a_id, product_b_id = key.split('-').map(&:to_i)

      product_a = Product.find(product_a_id)
      product_b = Product.find(product_b_id)
      next unless product_a && product_b

      score = [(count * 10), 100].min

      ProductAffinity.find_or_create_by(
        product_a_id: product_a_id,
        product_b_id: product_b_id
      ).update!(
        score: score,
        views_together_count: count
      )
    end

    Rails.logger.info("Calculated affinities for #{affinity_counts.count} product pairs")
  end
end
