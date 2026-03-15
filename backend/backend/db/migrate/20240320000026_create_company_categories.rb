class CreateCompanyCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :company_categories do |t|
      t.references :company, null: false, foreign_key: true, index: false
      t.references :category, null: false, foreign_key: true, index: false

      t.timestamps
    end

    add_index :company_categories, [:company_id, :category_id], unique: true
  end
end
