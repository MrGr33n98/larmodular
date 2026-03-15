module Api
  module V1
    class IntentController < BaseController
      skip_before_action :authenticate_user!
      
      # weights para scoring de intent
      INTENT_WEIGHTS = {
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
      }.freeze
      
      def events
        event = IntentEvent.new(
          event_type: params[:event_type],
          event_data: params[:event_data] || {},
          page_url: params[:page_url],
          product_id: params[:product_id],
          company_id: params[:company_id],
          lead_id: params[:lead_id],
          session_id: session.id,
          ip_address: request.remote_ip
        )
        
        # Calcular score se for lead
        if event.lead_id.present? && INTENT_WEIGHTS[params[:event_type]]
          weight = INTENT_WEIGHTS[params[:event_type]]
          lead = Lead.find(event.lead_id)
          new_score = lead.intent_score + weight
          lead.update!(intent_score: [new_score, 100].min)
          
          # Atualizar funnel stage
          update_funnel_stage(lead, new_score)
        end
        
        if event.save
          render_success({ event_id: event.id }, 'Event recorded')
        else
          render_error('Failed to record event', event.errors.full_messages)
        end
      end
      
      def lead_score
        lead = Lead.find(params[:id])
        
        render_success({
          lead_id: lead.id,
          score: lead.intent_score,
          level: lead.intent_level,
          funnel_stage: lead.funnel_stage,
          qualification_status: lead.qualification_status
        })
      end
      
      def leaderboard
        leads = Lead.hot_leads
          .order(intent_score: :desc)
          .limit(20)
        
        render_success(LeadSerializer.new(leads).as_json)
      end
      
      private
      
      def update_funnel_stage(lead, score)
        case score
        when 0..10
          lead.update!(funnel_stage: 'awareness')
        when 11..40
          lead.update!(funnel_stage: 'consideration')
        else
          lead.update!(funnel_stage: 'decision')
        end
      end
      
      def intent_params
        params.require(:intent).permit(
          :event_type, :page_url, :product_id,
          :company_id, :lead_id, :event_data
        )
      end
    end
  end
end
