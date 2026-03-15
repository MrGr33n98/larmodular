require 'rails_helper'

RSpec.describe Company, type: :model do
  subject { build(:company) }

  describe 'associations' do
    it { should belong_to(:region) }
    it { should belong_to(:city) }
    it { should belong_to(:user).optional }
    it { should have_many(:products) }
    it { should have_many(:reviews) }
    it { should have_many(:leads) }
    it { should have_many(:quote_requests) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:slug) }
    it { should validate_uniqueness_of(:slug) }
  end

  describe 'scopes' do
    describe '.active' do
      it 'returns companies with approved status' do
        approved = create(:company, status: 'approved')
        rejected = create(:company, status: 'rejected')

        expect(Company.active).to include(approved)
        expect(Company.active).not_to include(rejected)
      end
    end

    describe '.featured' do
      it 'returns featured companies' do
        featured = create(:company, featured: true)
        normal = create(:company, featured: false)

        expect(Company.featured).to include(featured)
        expect(Company.featured).not_to include(normal)
      end
    end
  end

  describe '#average_rating' do
    let(:company) { create(:company) }

    context 'with approved reviews' do
      before do
        create(:review, company: company, rating: 5, status: 'approved')
        create(:review, company: company, rating: 4, status: 'approved')
      end

      it 'calculates average rating' do
        expect(company.average_rating).to eq(4.5)
      end
    end

    context 'without reviews' do
      it 'returns 0' do
        expect(company.average_rating).to eq(0)
      end
    end
  end
end
