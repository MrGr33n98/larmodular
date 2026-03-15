require 'rails_helper'

RSpec.describe Product, type: :model do
  subject { build(:product) }

  describe 'associations' do
    it { should belong_to(:company) }
    it { should belong_to(:category) }
    it { should belong_to(:region).optional }
    it { should belong_to(:city).optional }
    it { should have_many(:reviews) }
    it { should have_many(:favorites) }
    it { should have_many(:product_views) }
    it { should have_many(:quote_requests) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:slug) }
    it { should validate_uniqueness_of(:slug) }
    it { should validate_presence_of(:company_id) }
    it { should validate_presence_of(:category_id) }
  end

  describe 'scopes' do
    describe '.active' do
      it 'returns only active products' do
        active = create(:product, active: true)
        inactive = create(:product, active: false)

        expect(Product.active).to include(active)
        expect(Product.active).not_to include(inactive)
      end
    end

    describe '.featured' do
      it 'returns featured products' do
        featured = create(:product, featured: true)
        normal = create(:product, featured: false)

        expect(Product.featured).to include(featured)
        expect(Product.featured).not_to include(normal)
      end
    end

    describe '.by_category' do
      let(:category1) { create(:category) }
      let(:category2) { create(:category) }

      it 'filters by category' do
        product1 = create(:product, category: category1)
        product2 = create(:product, category: category2)

        expect(Product.by_category(category1.id)).to include(product1)
        expect(Product.by_category(category1.id)).not_to include(product2)
      end
    end
  end

  describe '#price_with_discount' do
    let(:product) { build(:product, base_price: 1000, discount_price: 800) }

    context 'with discount' do
      it 'returns discount price' do
        expect(product.price_with_discount).to eq(800)
      end
    end

    context 'without discount' do
      let(:product) { build(:product, base_price: 1000, discount_price: nil) }

      it 'returns base price' do
        expect(product.price_with_discount).to eq(1000)
      end
    end
  end
end
