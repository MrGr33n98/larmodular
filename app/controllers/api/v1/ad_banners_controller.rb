module Api
  module V1
    class AdBannersController < BaseController
      def index
        banners = if params[:campaign_id]
                    AdBanner.where(campaign_id: params[:campaign_id])
                  elsif params[:placement_id]
                    AdBanner.by_placement(params[:placement_id])
                  else
                    AdBanner.all
                  end
        banners = banners.active.approved
        render_success(serialize(banners))
      end

      def show
        banner = AdBanner.find_by(id: params[:id])
        return render_not_found unless banner
        render_success(serialize(banner))
      end

      private

      def serialize(banner)
        AdBannerSerializer.new(banner).as_json
      end

      def serialize(banners)
        banners.map { |b| AdBannerSerializer.new(b).as_json }
      end
    end
  end
end
