class AddZipCodeToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :zip_code, :string
  end
end
