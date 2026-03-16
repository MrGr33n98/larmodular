class AddSeoFieldsToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :meta_title, :string, limit: 70
    add_column :products, :meta_description, :text, limit: 160
    add_column :products, :meta_keywords, :string, limit: 255
  end
end
