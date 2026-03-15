class QuoteRequestResponseNotification < Noticed::Base
  deliver_by :database
  deliver_by :email, mailer: 'QuoteRequestMailer', param: :recipient

  param :quote_request

  def title
    "Orçamento Respondido ##{quote_request.id}"
  end

  def message
    "#{quote_request.company.name} respondeu sua solicitação de orçamento"
  end

  def quote_request
    params[:quote_request]
  end

  def url
    "/meus-orcamentos/#{quote_request.id}"
  end
end
