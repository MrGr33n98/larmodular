class CreateFeatureFlags < ActiveRecord::Migration[7.0]
  def change
    create_table :feature_flags do |t|
      t.string :key, null: false
      t.boolean :enabled, default: true
      t.json :plans, default: [] # quais planos têm acesso
      t.json :config, default: {}
      t.boolean :active, default: true
      t.text :description

      t.timestamps
    end

    add_index :feature_flags, :key, unique: true
    add_index :feature_flags, :active
  end
end
