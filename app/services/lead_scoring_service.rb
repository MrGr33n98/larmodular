class LeadScoringService
  INTENT_WEIGHTS = {
    'page_view'       => 1,
    'product_view'    => 3,
    'search_query'    => 5,
    'price_view'      => 8,
    'calculator_use'  => 15,
    'simulator_use'   => 20,
    'quote_request'   => 25,
    'favorite_add'    => 15,
    'phone_click'     => 30,
    'whatsapp_click'  => 30,
    'email_click'     => 20,
    'compare_add'     => 10,
    'review_read'     => 5
  }.freeze

  QUOTE_REQUEST_BONUS = 30
  MAX_SCORE = 100

  INTENT_LEVELS = {
    'cold'  => 0..20,
    'warm'  => 21..50,
    'hot'   => 51..80,
    'ready' => 81..MAX_SCORE
  }.freeze

  def initialize(lead)
    @lead = lead
  end

  # Returns { score: Integer, level: String, factors: Hash }
  def calculate
    score = 0
    factors = {}

    events_by_type = @lead.intent_events.group_by(&:event_type)

    events_by_type.each do |type, type_events|
      weight = weight_for(type)
      count = type_events.sum { |e| e.event_data.is_a?(Hash) ? (e.event_data['count'] || 1) : 1 }
      subtotal = weight * count
      score += subtotal
      factors[type] = { count: count, weight: weight, total: subtotal }
    end

    if @lead.quote_requests.any?
      score += QUOTE_REQUEST_BONUS
      factors['quote_requests'] = { count: @lead.quote_requests.count, weight: QUOTE_REQUEST_BONUS }
    end

    score = [score, MAX_SCORE].min
    { score: score, level: level_for(score), factors: factors }
  end

  def self.level_for(score)
    INTENT_LEVELS.find { |_, range| range.cover?(score) }&.first || 'cold'
  end

  def level_for(score)
    self.class.level_for(score)
  end

  def self.weight_for(event_type)
    INTENT_WEIGHTS[event_type.to_s] || 1
  end

  def weight_for(event_type)
    self.class.weight_for(event_type)
  end
end
