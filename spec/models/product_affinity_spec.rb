require 'rails_helper'

RSpec.describe ProductAffinity, type: :model do
  let(:product_a) { create(:product) }
  let(:product_b) { create(:product) }
  subject { build(:product_affinity, product_a: product_a, product_b: product_b) }

  describe 'associations' do
    it { should belong_to(:product_a).class_name('Product') }
    it { should belong_to(:product_b).class_name('Product') }
  end

  describe 'validations' do
    it 'validates uniqueness of product_a_id scoped to product_b_id' do
      create(:product_affinity, product_a: product_a, product_b: product_b, score: 40)
      duplicate = build(:product_affinity, product_a: product_a, product_b: product_b, score: 60)
      expect(duplicate).not_to be_valid
    end

    it 'allows same product_a with different product_b' do
      product_c = create(:product)
      create(:product_affinity, product_a: product_a, product_b: product_b, score: 40)
      other = build(:product_affinity, product_a: product_a, product_b: product_c, score: 60)
      expect(other).to be_valid
    end
  end

  describe 'scopes' do
    describe '.high_score' do
      it 'returns affinities with score > 50 ordered by score desc' do
        high = create(:product_affinity, product_a: product_a, product_b: product_b, score: 80)
        low  = create(:product_affinity, product_a: product_b, product_b: product_a, score: 30)

        expect(ProductAffinity.high_score).to include(high)
        expect(ProductAffinity.high_score).not_to include(low)
        expect(ProductAffinity.high_score.first.score).to be > 50
      end
    end
  end
end
