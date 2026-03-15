class NotificationService
  class << self
    def notify_new_lead(lead)
      return unless lead.company.user

      NewLeadNotification.with(lead: lead).deliver(lead.company.user)
    end

    def notify_new_quote_request(quote_request)
      return unless quote_request.company.user

      NewQuoteRequestNotification.with(quote_request: quote_request).deliver(quote_request.company.user)
    end

    def notify_quote_request_response(quote_request)
      return unless quote_request.user

      QuoteRequestResponseNotification.with(quote_request: quote_request).deliver(quote_request.user)
    end

    def notify_new_review(review)
      return unless review.company.user

      NewReviewNotification.with(review: review).deliver(review.company.user)
    end

    def notify_subscription_status(subscription)
      SubscriptionStatusNotification.with(subscription: subscription).deliver(subscription.user)
    end
  end
end
