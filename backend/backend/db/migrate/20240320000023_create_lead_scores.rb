class CreateLeadScores < ActiveRecord::Migration[7.0]
  def change
    create_table :lead_scores do |t|
      t.references :lead, null: false, foreign_key: true, index: { unique: true }
      t.integer :score, default: 0 # 0-100
      t.string :intent_level, default: 'cold' # cold, warm, hot, ready
      t.json :factors, default: {} # detalhamento dos fatores
      t.json :events_summary, default: {} # resumo dos eventos
      t.datetime :calculated_at

      t.timestamps
    end

    add_index :lead_scores, :score
    add_index :lead_scores, :intent_level
    add_index :lead_scores, :calculated_at
  end
end
