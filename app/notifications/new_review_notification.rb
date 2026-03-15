class NewReviewNotification < Noticed::Base
  deliver_by :database
  deliver_by :email, mailer: 'ReviewMailer', param: :recipient

  param :review

  def title
    "Nova avaliação: #{review.rating} estrelas"
  end

  def message
    "#{review.user.name} avaliou #{review.company.name} com #{review.rating} estrelas"
  end

  def review
    params[:review]
  end

  def url
    "/admin/reviews/#{review.id}"
  end
end
