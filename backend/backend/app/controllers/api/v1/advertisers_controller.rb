module Api
  module V1
    class AdvertisersController < BaseController
      def index
        advertisers = Advertiser.active
        render_success(serialize(advertisers))
      end

      def show
        advertiser = Advertiser.find_by(id: params[:id])
        return render_not_found unless advertiser
        render_success(serialize(advertiser))
      end

      private

      def serialize(advertiser)
        AdvertiserSerializer.new(advertiser).as_json
      end

      def serialize(advertisers)
        advertisers.map { |a| AdvertiserSerializer.new(a).as_json }
      end
    end
  end
end
