module Api
  module V1
    class AdPlacementsController < BaseController
      def index
        placements = AdPlacement.active
        render_success(serialize(placements))
      end

      def show
        placement = AdPlacement.find_by(id: params[:id])
        return render_not_found unless placement
        render_success(serialize(placement))
      end

      private

      def serialize(placement)
        AdPlacementSerializer.new(placement).as_json
      end

      def serialize(placements)
        placements.map { |p| AdPlacementSerializer.new(p).as_json }
      end
    end
  end
end
