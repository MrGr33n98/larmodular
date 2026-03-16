module Api
  module V1
    class RegionsController < BaseController
      def index
        regions = CacheService.fetch('regions:index') do
          Region.active.order(name: :asc).to_a
        end
        render_success(regions.map { |r| RegionSerializer.new(r).as_json })
      end

      def show
        region = Region.friendly_find(params[:id])
        return render_not_found unless region
        render_success(RegionSerializer.new(region).as_json)
      end
    end
  end
end
