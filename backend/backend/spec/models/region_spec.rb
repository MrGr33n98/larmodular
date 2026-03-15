require 'rails_helper'

RSpec.describe Region, type: :model do
  subject { build(:region) }

  describe 'associations' do
    it { should have_many(:cities) }
    it { should have_many(:companies) }
    it { should have_many(:leads) }
    it { should have_many(:products) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:code) }
    it { should validate_uniqueness_of(:code) }
  end

  describe 'scopes' do
    describe '.active' do
      it 'returns only active regions' do
        active_region = create(:region, active: true)
        inactive_region = create(:region, active: false)

        expect(Region.active).to include(active_region)
        expect(Region.active).not_to include(inactive_region)
      end
    end
  end

  describe '#to_s' do
    it 'returns the name' do
      region = build(:region, name: 'Sudeste')
      expect(region.to_s).to eq('Sudeste')
    end
  end
end
