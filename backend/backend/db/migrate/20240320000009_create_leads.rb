class CreateLeads < ActiveRecord::Migration[7.0]
  def change
    create_table :leads do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.references :company, null: false, foreign_key: true
      t.references :region, foreign_key: true
      t.references :city, foreign_key: true
      t.references :user, foreign_key: true
      t.string :source # organic, paid, direct, referral
      t.integer :intent_score, default: 0
      t.string :funnel_stage, default: 'awareness' # awareness, consideration, decision
      t.string :qualification_status, default: 'new' # new, contacted, qualified, converted, lost
      t.string :status, default: 'active' # active, converted, lost
      t.text :notes
      t.json :metadata, default: {}

      t.timestamps
    end

    add_index :leads, :company_id
    add_index :leads, :region_id
    add_index :leads, :email
    add_index :leads, :intent_score
    add_index :leads, :funnel_stage
    add_index :leads, :qualification_status
  end
end
