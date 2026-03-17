require 'rails_helper'

RSpec.describe CalculateProductAffinitiesJob, type: :job do
  describe '#perform' do
    let(:product_a) { create(:product) }
    let(:product_b) { create(:product) }

    context 'with two products viewed in the same session' do
      before do
        session = SecureRandom.hex(8)
        create(:product_view, product: product_a, company: product_a.company, session_id: session)
        create(:product_view, product: product_b, company: product_b.company, session_id: session)
      end

      it 'creates a ProductAffinity record' do
        expect {
          described_class.perform_now
        }.to change(ProductAffinity, :count).by(1)
      end

      it 'assigns score of 10 for a single co-view' do
        described_class.perform_now
        affinity = ProductAffinity.last
        expect(affinity.score).to eq(10)
      end
    end

    context 'with products viewed in different sessions' do
      before do
        create(:product_view, product: product_a, session_id: 'session-a')
        create(:product_view, product: product_b, session_id: 'session-b')
      end

      it 'does not create any affinities' do
        expect {
          described_class.perform_now
        }.not_to change(ProductAffinity, :count)
      end
    end

    context 'with no product views' do
      it 'does nothing and does not raise' do
        expect { described_class.perform_now }.not_to raise_error
        expect(ProductAffinity.count).to eq(0)
      end
    end

    context 'with views older than 7 days' do
      before do
        session = SecureRandom.hex(8)
        create(:product_view, product: product_a, session_id: session, created_at: 8.days.ago)
        create(:product_view, product: product_b, session_id: session, created_at: 8.days.ago)
      end

      it 'ignores old views' do
        expect {
          described_class.perform_now
        }.not_to change(ProductAffinity, :count)
      end
    end

    context 'with score that would exceed 100' do
      before do
        11.times do
          session = SecureRandom.hex(8)
          create(:product_view, product: product_a, session_id: session)
          create(:product_view, product: product_b, session_id: session)
        end
      end

      it 'caps affinity score at 100' do
        described_class.perform_now
        expect(ProductAffinity.last.score).to eq(100)
      end
    end
  end
end
