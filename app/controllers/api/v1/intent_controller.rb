module Api
  module V1
    class IntentController < BaseController
      skip_before_action :authenticate_user!, raise: false

      def events
        event = IntentTrackingService.new(
          event_type: params[:event_type],
          event_data: params[:event_data] || {},
          page_url:   params[:page_url],
          product_id: params[:product_id],
          company_id: params[:company_id],
          lead_id:    params[:lead_id],
          session_id: session.id,
          ip_address: request.remote_ip
        ).track

        if event.persisted?
          render json: { success: true, message: 'Event recorded', data: { event_id: event.id } }, status: :created
        else
          render_error('Failed to record event', event.errors.full_messages)
        end
      end

      def lead_score
        lead = Lead.find_by(id: params[:id])
        return render_not_found unless lead

        render_success({
          lead_id:              lead.id,
          score:                lead.intent_score,
          level:                lead.intent_level,
          funnel_stage:         lead.funnel_stage,
          qualification_status: lead.qualification_status
        })
      end

      def leaderboard
        leads = Lead.hot_leads.order(intent_score: :desc).limit(20)
        render_success(leads.map { |l| LeadSerializer.new(l).as_json })
      end
    end
  end
end
