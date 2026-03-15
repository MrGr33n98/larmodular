module Api
  module V1
    class AdCampaignsController < BaseController
      def index
        campaigns = if params[:advertiser_id]
                      AdCampaign.where(advertiser_id: params[:advertiser_id])
                    else
                      AdCampaign.all
                    end
        campaigns = campaigns.active.recent
        render_success(serialize(campaigns))
      end

      def show
        campaign = AdCampaign.find_by(id: params[:id])
        return render_not_found unless campaign
        render_success(serialize(campaign))
      end

      private

      def serialize(campaign)
        AdCampaignSerializer.new(campaign).as_json
      end

      def serialize(campaigns)
        campaigns.map { |c| AdCampaignSerializer.new(c).as_json }
      end
    end
  end
end
