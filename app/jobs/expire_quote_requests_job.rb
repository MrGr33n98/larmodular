class ExpireQuoteRequestsJob < ApplicationJob
  queue_as :default

  def perform
    expired = QuoteRequest.status_pending
      .where('created_at < ?', 7.days.ago)

    expired.each do |qr|
      qr.status_expired!
    end

    Rails.logger.info("Expired #{expired.count} quote requests")
  end
end
