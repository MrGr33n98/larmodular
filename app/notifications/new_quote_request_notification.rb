class NewQuoteRequestNotification < Noticed::Base
  deliver_by :database
  deliver_by :email, mailer: 'QuoteRequestMailer', param: :recipient

  param :quote_request

  def title
    "Nova solicitação de orçamento ##{quote_request.id}"
  end

  def message
    "#{quote_request.user&.name || 'Um visitante'} solicitou orçamento para #{quote_request.product.name}"
  end

  def quote_request
    params[:quote_request]
  end

  def url
    "/admin/quote_requests/#{quote_request.id}"
  end
end
