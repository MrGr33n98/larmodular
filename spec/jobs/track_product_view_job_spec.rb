require 'rails_helper'

RSpec.describe TrackProductViewJob, type: :job do
  let(:product) { create(:product) }
  let(:session_id) { SecureRandom.hex(8) }

  describe '#perform' do
    it 'creates a ProductView record' do
      expect {
        described_class.perform_now(
          user_id: nil,
          product_id: product.id,
          session_id: session_id
        )
      }.to change(ProductView, :count).by(1)
    end

    it 'increments the product views_count' do
      expect {
        described_class.perform_now(
          user_id: nil,
          product_id: product.id,
          session_id: session_id
        )
      }.to change { product.reload.views_count }.by(1)
    end

    it 'stores the device_type when provided' do
      described_class.perform_now(
        user_id: nil,
        product_id: product.id,
        session_id: session_id,
        device_type: 'mobile'
      )
      view = ProductView.last
      expect(view.device_type).to eq('mobile')
    end

    it 'stores nil device_type when not provided' do
      described_class.perform_now(
        user_id: nil,
        product_id: product.id,
        session_id: session_id
      )
      expect(ProductView.last.device_type).to be_nil
    end

    it 'associates the view with the product company' do
      described_class.perform_now(
        user_id: nil,
        product_id: product.id,
        session_id: session_id
      )
      expect(ProductView.last.company).to eq(product.company)
    end

    context 'when product does not exist' do
      it 'does nothing and does not raise' do
        expect {
          described_class.perform_now(
            user_id: nil,
            product_id: 99999,
            session_id: session_id
          )
        }.not_to raise_error
      end
    end
  end
end
