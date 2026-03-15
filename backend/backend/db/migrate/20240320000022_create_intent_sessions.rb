class CreateIntentSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :intent_sessions do |t|
      t.string :session_id, null: false
      t.references :lead, foreign_key: true
      t.references :user, foreign_key: true
      t.references :region, foreign_key: true
      t.references :city, foreign_key: true
      t.string :entry_page
      t.string :exit_page
      t.integer :page_views_count, default: 0
      t.integer :events_count, default: 0
      t.integer :duration_seconds
      t.datetime :started_at
      t.datetime :ended_at

      t.timestamps
    end

    add_index :intent_sessions, :session_id, unique: true
    add_index :intent_sessions, :started_at
  end
end
