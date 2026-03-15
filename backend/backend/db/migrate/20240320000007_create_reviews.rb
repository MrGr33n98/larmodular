class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.references :product, foreign_key: true
      t.integer :rating, null: false # 1-5
      t.string :title
      t.text :comment
      t.json :images, default: []
      t.boolean :verified_purchase, default: false
      t.string :status, default: 'pending' # pending, approved, rejected
      t.boolean :company_response, default: false
      t.text :company_response_text
      t.datetime :company_response_at

      t.timestamps
    end

    add_index :reviews, :rating
    add_index :reviews, :status
  end
end
