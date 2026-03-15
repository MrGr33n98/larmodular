class CreateProductAffinities < ActiveRecord::Migration[7.0]
  def change
    create_table :product_affinities do |t|
      t.references :product_a, null: false, foreign_key: { to_table: :products }
      t.references :product_b, null: false, foreign_key: { to_table: :products }
      t.decimal :score, precision: 5, scale: 2, default: 0
      t.integer :views_together_count, default: 0
      t.integer :purchases_together_count, default: 0

      t.timestamps
    end

    add_index :product_affinities, [:product_a_id, :product_b_id], unique: true
    add_index :product_affinities, :score
  end
end
