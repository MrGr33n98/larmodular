class NewLeadNotification < Noticed::Base
  deliver_by :database
  deliver_by :email, mailer: 'LeadMailer', param: :recipient

  param :lead

  def title
    "Novo Lead: #{lead.name}"
  end

  def message
    "#{lead.name} demonstrou interesse em #{lead.company.name}"
  end

  def lead
    params[:lead]
  end

  def url
    "/admin/leads/#{lead.id}"
  end
end
