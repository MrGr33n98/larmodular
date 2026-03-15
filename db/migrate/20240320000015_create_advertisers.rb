class CreateAdvertisers < ActiveRecord::Migration[7.0]
  def change
    create_table :advertisers do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :logo_url
      t.string :phone
      t.string :website
      t.text :description
      t.boolean :active, default: true
      t.references :user, foreign_key: true # account manager

      t.timestamps
    end

    add_index :advertisers, :email, unique: true
    add_index :advertisers, :active
  end
end
