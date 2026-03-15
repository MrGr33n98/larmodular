module Api
  module V1
    class PlansController < BaseController
      def index
        plans = Plan.active.ordered
        render_success(serialize(plans))
      end

      def show
        plan = Plan.find_by(id: params[:id])
        return render_not_found unless plan
        render_success(serialize(plan))
      end

      private

      def serialize(plan)
        PlanSerializer.new(plan).as_json
      end

      def serialize(plans)
        plans.map { |p| PlanSerializer.new(p).as_json }
      end
    end
  end
end
