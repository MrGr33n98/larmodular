class IntentTrackingService
  def initialize(params)
    @event_type  = params[:event_type]
    @event_data  = params[:event_data] || {}
    @page_url    = params[:page_url]
    @product_id  = params[:product_id]
    @company_id  = params[:company_id]
    @lead_id     = params[:lead_id]
    @session_id  = params[:session_id]
    @ip_address  = params[:ip_address]
  end

  # Returns the saved IntentEvent or an unsaved one with errors
  def track
    event = IntentEvent.new(
      event_type:  @event_type,
      event_data:  @event_data,
      page_url:    @page_url,
      product_id:  @product_id,
      company_id:  @company_id,
      lead_id:     @lead_id,
      session_id:  @session_id,
      ip_address:  @ip_address
    )

    return event unless event.save

    enqueue_scoring if @lead_id.present?

    event
  end

  private

  def enqueue_scoring
    CalculateLeadScoreJob.perform_later(@lead_id.to_i)
  end
end
