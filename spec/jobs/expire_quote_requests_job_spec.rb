require 'rails_helper'

RSpec.describe ExpireQuoteRequestsJob, type: :job do
  describe '#perform' do
    let(:product) { create(:product) }
    let(:company) { product.company }

    context 'with pending requests older than 7 days' do
      let!(:old_pending) do
        create(:quote_request, product: product, company: company,
               status: 'pending', created_at: 8.days.ago)
      end

      it 'expires them' do
        described_class.perform_now
        expect(old_pending.reload.status).to eq('expired')
      end
    end

    context 'with pending requests newer than 7 days' do
      let!(:new_pending) do
        create(:quote_request, product: product, company: company,
               status: 'pending', created_at: 3.days.ago)
      end

      it 'does not expire them' do
        described_class.perform_now
        expect(new_pending.reload.status).to eq('pending')
      end
    end

    context 'with already-responded requests older than 7 days' do
      let!(:responded) do
        create(:quote_request, product: product, company: company,
               status: 'responded', created_at: 10.days.ago)
      end

      it 'does not change their status' do
        described_class.perform_now
        expect(responded.reload.status_responded?).to be true
      end
    end

    context 'with no pending requests' do
      it 'does nothing and does not raise' do
        expect { described_class.perform_now }.not_to raise_error
      end
    end
  end
end
