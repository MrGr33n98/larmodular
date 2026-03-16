class AddSeoFieldsToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :meta_title, :string, limit: 70
    add_column :companies, :meta_description, :text, limit: 160
    add_column :companies, :meta_keywords, :string, limit: 255
  end
end
