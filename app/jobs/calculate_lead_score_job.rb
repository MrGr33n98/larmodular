class CalculateLeadScoreJob < ApplicationJob
  queue_as :default

  def perform(lead_id)
    lead = Lead.find_by(id: lead_id)
    return unless lead

    result = LeadScoringService.new(lead).calculate

    LeadScore.find_or_initialize_by(lead: lead).update!(
      score: result[:score],
      intent_level: result[:level],
      factors: result[:factors],
      calculated_at: Time.current
    )

    lead.update!(intent_score: result[:score])
  end
end
