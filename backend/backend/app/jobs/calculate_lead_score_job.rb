class CalculateLeadScoreJob < ApplicationJob
  queue_as :default

  def perform(lead_id)
    lead = Lead.find(lead_id)
    return unless lead

    score = 0
    factors = {}

    events = lead.intent_events
    events_by_type = events.group_by(&:event_type)

    events_by_type.each do |type, type_events|
      weight = intent_weight(type)
      count = type_events.sum { |e| e.event_data['count'] || 1 }
      score += weight * count
      factors[type] = { count: count, weight: weight, total: weight * count }
    end

    if lead.quote_requests.any?
      score += 30
      factors['quote_requests'] = { count: lead.quote_requests.count, weight: 30 }
    end

    score = [score, 100].min

    intent_level = case score
                   when 0..20 then 'cold'
                   when 21..50 then 'warm'
                   when 51..80 then 'hot'
                   else 'ready'
                   end

    LeadScore.find_or_initialize_by(lead: lead).update!(
      score: score,
      intent_level: intent_level,
      factors: factors,
      calculated_at: Time.current
    )

    lead.update!(intent_score: score)
  end

  private

  def intent_weight(event_type)
    weights = {
      'page_view' => 1,
      'product_view' => 3,
      'search_query' => 5,
      'price_view' => 8,
      'calculator_use' => 15,
      'simulator_use' => 20,
      'quote_request' => 25,
      'favorite_add' => 15,
      'phone_click' => 30,
      'whatsapp_click' => 30,
      'email_click' => 20,
      'compare_add' => 10,
      'review_read' => 5
    }
    weights[event_type] || 1
  end
end
