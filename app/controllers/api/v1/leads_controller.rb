module Api
  module V1
    class LeadsController < BaseController
      before_action :authenticate_user!, only: [:create, :update]

      def index
        leads = if current_user.company
                  current_user.company.leads
                else
                  Lead.all
                end
        leads = leads.active.recent
        leads = leads.page(params[:page]).per(params[:per_page] || 20)
        render_success(serialize(leads), nil, paginate(leads))
      end

      def show
        lead = Lead.find_by(id: params[:id])
        return render_not_found unless lead
        render_success(serialize(lead))
      end

      def create
        company = Company.find_by(id: params[:company_id])
        return render_error('Empresa não encontrada') unless company
        lead = Lead.new(lead_params)
        lead.company = company
        lead.user = current_user if user_signed_in?
        if lead.save
          render_success(serialize(lead), 'Lead criado com sucesso')
        else
          render_error('Erro ao criar lead', lead.errors.full_messages)
        end
      end

      def update
        lead = Lead.find_by(id: params[:id])
        return render_not_found unless lead
        if lead.update(lead_params)
          render_success(serialize(lead), 'Lead atualizado')
        else
          render_error('Erro ao atualizar lead', lead.errors.full_messages)
        end
      end

      private

      def lead_params
        params.require(:lead).permit(:name, :email, :phone, :company_id, :region_id, :city_id, :source, :notes, :metadata)
      end

      def serialize(lead)
        LeadSerializer.new(lead).as_json
      end

      def serialize(leads)
        leads.map { |l| LeadSerializer.new(l).as_json }
      end
    end
  end
end
