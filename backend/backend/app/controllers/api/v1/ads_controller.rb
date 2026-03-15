module Api
  module V1
    class AdsController < BaseController
      def banners
        placement = AdPlacement.find_by(id: params[:placement_id])
        return render_not_found('Posição não encontrada') unless placement
        banners = AdBanner.active.approved.by_placement(placement.id)
                          .order(priority: :desc)
                          .limit(5)
        render_success(serialize(banners))
      end

      def track_impression
        banner = AdBanner.find_by(id: params[:banner_id])
        return render_not_found unless banner
        impression = AdImpression.create(
          banner: banner,
          placement: banner.placement,
          session_id: params[:session_id],
          ip_address: request.ip,
          page_url: params[:page_url]
        )
        banner.increment!(:impressions_count)
        render_success({ impression_id: impression.id })
      end

      def track_click
        banner = AdBanner.find_by(id: params[:banner_id])
        return render_not_found unless banner
        click = AdClick.create(
          banner: banner,
          placement: banner.placement,
          session_id: params[:session_id],
          ip_address: request.ip,
          page_url: params[:page_url]
        )
        banner.increment!(:clicks_count)
        render_success({ click_id: click.id, target_url: banner.target_url })
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
