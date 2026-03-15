class ExpireQuoteRequestsJob < ApplicationJob
  queue_as :default

  def perform
    expired = QuoteRequest.pending
      .where('created_at < ?', 7.days.ago)
      .where(status: 'pending')

    expired.each do |qr|
      qr.expired!
      qr.save!
    end

    Rails.logger.info("Expired #{expired.count} quote requests")
  end
end
