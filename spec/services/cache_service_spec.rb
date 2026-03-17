require 'rails_helper'

RSpec.describe CacheService do
  around(:each) do |example|
    # Use MemoryStore so caching actually works in tests
    original_store = Rails.cache
    Rails.cache = ActiveSupport::Cache::MemoryStore.new
    example.run
    Rails.cache = original_store
  end

  describe '.fetch' do
    it 'calls the block and caches the result' do
      result = described_class.fetch('test_key') { 'computed_value' }
      expect(result).to eq('computed_value')
    end

    it 'returns the cached value on second call without executing the block' do
      described_class.fetch('test_key') { 'first_value' }
      second_result = described_class.fetch('test_key') { 'should_not_run' }
      expect(second_result).to eq('first_value')
    end

    it 'accepts explicit expires_in override' do
      result = described_class.fetch('custom_key', expires_in: 5.minutes) { 42 }
      expect(result).to eq(42)
    end
  end

  describe '.invalidate' do
    it 'clears the cached value for a key' do
      described_class.fetch('my_key') { 'cached' }
      described_class.invalidate('my_key')
      second = described_class.fetch('my_key') { 'refreshed' }
      expect(second).to eq('refreshed')
    end
  end

  describe '.invalidate_prefix' do
    it 'clears all keys starting with the given prefix' do
      described_class.fetch('regions:all')     { 'regions' }
      described_class.fetch('regions:5')       { 'more_regions' }
      described_class.fetch('categories:all')  { 'categories' }

      described_class.invalidate_prefix('regions')

      expect(described_class.fetch('regions:all') { 'new_regions' }).to eq('new_regions')
      expect(described_class.fetch('categories:all') { 'new_categories' }).to eq('categories')
    end
  end

  describe '.regions' do
    it 'returns region data' do
      create(:region, name: 'São Paulo')
      result = described_class.regions
      expect(result).to be_an(Array)
    end
  end

  describe '.plans' do
    it 'returns plan data as array' do
      create(:plan)
      result = described_class.plans
      expect(result).to be_an(Array)
    end
  end
end
