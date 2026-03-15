module Api
  module V1
    class CitiesController < BaseController
      def index
        cities = if params[:region_id]
                   City.where(region_id: params[:region_id])
                 else
                   City.all
                 end
        cities = cities.order(name: :asc)
        render_success(cities.map { |c| CitySerializer.new(c).as_json })
      end

      def show
        city = City.find_by(id: params[:id])
        return render_not_found unless city
        render_success(CitySerializer.new(city).as_json)
      end
    end
  end
end
