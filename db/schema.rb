# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_05_08_205200) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "ad_banners", force: :cascade do |t|
    t.bigint "campaign_id", null: false
    t.bigint "placement_id", null: false
    t.string "name"
    t.string "image_url", null: false
    t.string "target_url", null: false
    t.string "alt_text"
    t.integer "impressions_limit"
    t.integer "impressions_count", default: 0
    t.integer "clicks_count", default: 0
    t.integer "priority", default: 0
    t.boolean "active", default: true
    t.boolean "approved", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "image_data"
    t.index ["active"], name: "index_ad_banners_on_active"
    t.index ["approved"], name: "index_ad_banners_on_approved"
    t.index ["campaign_id"], name: "index_ad_banners_on_campaign_id"
    t.index ["placement_id"], name: "index_ad_banners_on_placement_id"
  end

  create_table "ad_campaigns", force: :cascade do |t|
    t.bigint "advertiser_id", null: false
    t.string "name", null: false
    t.text "description"
    t.decimal "budget_cents", default: "0.0"
    t.decimal "spent_cents", default: "0.0"
    t.json "targeting", default: {}
    t.date "start_date"
    t.date "end_date"
    t.string "status", default: "draft"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_ad_campaigns_on_active"
    t.index ["advertiser_id"], name: "index_ad_campaigns_on_advertiser_id"
    t.index ["status"], name: "index_ad_campaigns_on_status"
  end

  create_table "ad_clicks", force: :cascade do |t|
    t.bigint "banner_id", null: false
    t.bigint "placement_id", null: false
    t.string "session_id"
    t.string "ip_address"
    t.bigint "region_id"
    t.bigint "city_id"
    t.bigint "user_id"
    t.string "page_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["banner_id"], name: "index_ad_clicks_on_banner_id"
    t.index ["city_id"], name: "index_ad_clicks_on_city_id"
    t.index ["created_at"], name: "index_ad_clicks_on_created_at"
    t.index ["placement_id"], name: "index_ad_clicks_on_placement_id"
    t.index ["region_id"], name: "index_ad_clicks_on_region_id"
    t.index ["session_id"], name: "index_ad_clicks_on_session_id"
    t.index ["user_id"], name: "index_ad_clicks_on_user_id"
  end

  create_table "ad_impressions", force: :cascade do |t|
    t.bigint "banner_id", null: false
    t.bigint "placement_id", null: false
    t.string "session_id"
    t.string "ip_address"
    t.bigint "region_id"
    t.bigint "city_id"
    t.bigint "user_id"
    t.string "page_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["banner_id"], name: "index_ad_impressions_on_banner_id"
    t.index ["city_id"], name: "index_ad_impressions_on_city_id"
    t.index ["created_at"], name: "index_ad_impressions_on_created_at"
    t.index ["placement_id"], name: "index_ad_impressions_on_placement_id"
    t.index ["region_id"], name: "index_ad_impressions_on_region_id"
    t.index ["session_id"], name: "index_ad_impressions_on_session_id"
    t.index ["user_id"], name: "index_ad_impressions_on_user_id"
  end

  create_table "ad_placements", force: :cascade do |t|
    t.string "position_key", null: false
    t.string "page", null: false
    t.string "location", null: false
    t.integer "width"
    t.integer "height"
    t.decimal "price_cents", default: "0.0"
    t.text "description"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_ad_placements_on_active"
    t.index ["page", "location"], name: "index_ad_placements_on_page_and_location"
    t.index ["position_key"], name: "index_ad_placements_on_position_key", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "advertisers", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "logo_url"
    t.string "phone"
    t.string "website"
    t.text "description"
    t.boolean "active", default: true
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "logo_data"
    t.index ["active"], name: "index_advertisers_on_active"
    t.index ["email"], name: "index_advertisers_on_email", unique: true
    t.index ["user_id"], name: "index_advertisers_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.text "description"
    t.string "icon"
    t.string "image_url"
    t.bigint "parent_id"
    t.integer "position", default: 0
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "icon_data"
    t.index ["parent_id"], name: "index_categories_on_parent_id"
    t.index ["position"], name: "index_categories_on_position"
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "cities", force: :cascade do |t|
    t.bigint "region_id", null: false
    t.string "name", null: false
    t.string "state", limit: 2, null: false
    t.string "state_name"
    t.integer "population"
    t.decimal "gdp_index", precision: 5, scale: 2, default: "1.0"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_cities_on_name"
    t.index ["region_id", "state"], name: "index_cities_on_region_id_and_state"
    t.index ["region_id"], name: "index_cities_on_region_id"
    t.index ["state", "name"], name: "index_cities_on_state_and_name"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "post_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.text "description"
    t.string "logo_url"
    t.string "banner_url"
    t.text "address"
    t.string "phone"
    t.string "email"
    t.string "website"
    t.json "social_media", default: {}
    t.bigint "region_id"
    t.bigint "city_id"
    t.json "delivery_areas", default: []
    t.decimal "lead_contact_rate", precision: 3, scale: 2, default: "0.0"
    t.integer "rating", default: 0
    t.integer "reviews_count", default: 0
    t.integer "products_count", default: 0
    t.integer "views_count", default: 0
    t.string "status", default: "pending"
    t.boolean "featured", default: false
    t.boolean "verified", default: false
    t.integer "experience_years", default: 0
    t.string "zip_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "cover_data"
    t.jsonb "logo_data"
    t.index ["city_id"], name: "index_companies_on_city_id"
    t.index ["featured"], name: "index_companies_on_featured"
    t.index ["region_id"], name: "index_companies_on_region_id"
    t.index ["slug"], name: "index_companies_on_slug", unique: true
    t.index ["status"], name: "index_companies_on_status"
  end

  create_table "company_categories", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "category_id"], name: "index_company_categories_on_company_id_and_category_id", unique: true
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_favorites_on_product_id"
    t.index ["user_id", "product_id"], name: "index_favorites_on_user_id_and_product_id", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "feature_flags", force: :cascade do |t|
    t.string "key", null: false
    t.boolean "enabled", default: true
    t.json "plans", default: []
    t.json "config", default: {}
    t.boolean "active", default: true
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_feature_flags_on_active"
    t.index ["key"], name: "index_feature_flags_on_key", unique: true
  end

  create_table "intent_events", force: :cascade do |t|
    t.bigint "lead_id"
    t.string "session_id"
    t.bigint "user_id"
    t.bigint "product_id"
    t.bigint "company_id"
    t.bigint "region_id"
    t.bigint "city_id"
    t.string "event_type", null: false
    t.json "event_data", default: {}
    t.string "page_url"
    t.string "ip_address"
    t.integer "duration_seconds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_intent_events_on_city_id"
    t.index ["company_id"], name: "index_intent_events_on_company_id"
    t.index ["created_at"], name: "index_intent_events_on_created_at"
    t.index ["event_type"], name: "index_intent_events_on_event_type"
    t.index ["lead_id"], name: "index_intent_events_on_lead_id"
    t.index ["product_id"], name: "index_intent_events_on_product_id"
    t.index ["region_id"], name: "index_intent_events_on_region_id"
    t.index ["session_id"], name: "index_intent_events_on_session_id"
    t.index ["user_id"], name: "index_intent_events_on_user_id"
  end

  create_table "intent_sessions", force: :cascade do |t|
    t.string "session_id", null: false
    t.bigint "lead_id"
    t.bigint "user_id"
    t.bigint "region_id"
    t.bigint "city_id"
    t.string "entry_page"
    t.string "exit_page"
    t.integer "page_views_count", default: 0
    t.integer "events_count", default: 0
    t.integer "duration_seconds"
    t.datetime "started_at"
    t.datetime "ended_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_intent_sessions_on_city_id"
    t.index ["lead_id"], name: "index_intent_sessions_on_lead_id"
    t.index ["region_id"], name: "index_intent_sessions_on_region_id"
    t.index ["session_id"], name: "index_intent_sessions_on_session_id", unique: true
    t.index ["started_at"], name: "index_intent_sessions_on_started_at"
    t.index ["user_id"], name: "index_intent_sessions_on_user_id"
  end

  create_table "lead_scores", force: :cascade do |t|
    t.bigint "lead_id", null: false
    t.integer "score", default: 0
    t.string "intent_level", default: "cold"
    t.json "factors", default: {}
    t.json "events_summary", default: {}
    t.datetime "calculated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["calculated_at"], name: "index_lead_scores_on_calculated_at"
    t.index ["intent_level"], name: "index_lead_scores_on_intent_level"
    t.index ["lead_id"], name: "index_lead_scores_on_lead_id", unique: true
    t.index ["score"], name: "index_lead_scores_on_score"
  end

  create_table "leads", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone"
    t.bigint "company_id", null: false
    t.bigint "region_id"
    t.bigint "city_id"
    t.bigint "user_id"
    t.string "source"
    t.integer "intent_score", default: 0
    t.string "funnel_stage", default: "awareness"
    t.string "qualification_status", default: "new"
    t.string "status", default: "active"
    t.text "notes"
    t.json "metadata", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_leads_on_city_id"
    t.index ["company_id"], name: "index_leads_on_company_id"
    t.index ["email"], name: "index_leads_on_email"
    t.index ["funnel_stage"], name: "index_leads_on_funnel_stage"
    t.index ["intent_score"], name: "index_leads_on_intent_score"
    t.index ["qualification_status"], name: "index_leads_on_qualification_status"
    t.index ["region_id"], name: "index_leads_on_region_id"
    t.index ["user_id"], name: "index_leads_on_user_id"
  end

  create_table "noticed_events", force: :cascade do |t|
    t.string "type"
    t.string "record_type"
    t.bigint "record_id"
    t.jsonb "params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "notifications_count"
    t.index ["record_type", "record_id"], name: "index_noticed_events_on_record"
  end

  create_table "noticed_notifications", force: :cascade do |t|
    t.string "type"
    t.bigint "event_id", null: false
    t.string "recipient_type", null: false
    t.bigint "recipient_id", null: false
    t.datetime "read_at", precision: nil
    t.datetime "seen_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_noticed_notifications_on_event_id"
    t.index ["recipient_type", "recipient_id"], name: "index_noticed_notifications_on_recipient"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "subscription_id", null: false
    t.bigint "user_id", null: false
    t.string "stripe_payment_intent_id"
    t.string "stripe_charge_id"
    t.decimal "amount", precision: 10, scale: 2
    t.string "currency", default: "brl"
    t.string "status", default: "pending"
    t.string "payment_method"
    t.string "description"
    t.json "metadata", default: {}
    t.datetime "paid_at"
    t.datetime "failed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["status"], name: "index_payments_on_status"
    t.index ["stripe_payment_intent_id"], name: "index_payments_on_stripe_payment_intent_id", unique: true
    t.index ["subscription_id"], name: "index_payments_on_subscription_id"
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.text "description"
    t.decimal "price_monthly", precision: 10, scale: 2
    t.decimal "price_yearly", precision: 10, scale: 2
    t.json "features", default: []
    t.json "limits", default: {}
    t.boolean "highlighted", default: false
    t.boolean "active", default: true
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_plans_on_active"
    t.index ["position"], name: "index_plans_on_position"
    t.index ["slug"], name: "index_plans_on_slug", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "views", default: 0
    t.bigint "user_id", null: false
    t.datetime "published_at"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "product_affinities", force: :cascade do |t|
    t.bigint "product_a_id", null: false
    t.bigint "product_b_id", null: false
    t.decimal "score", precision: 5, scale: 2, default: "0.0"
    t.integer "views_together_count", default: 0
    t.integer "purchases_together_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_a_id", "product_b_id"], name: "index_product_affinities_on_product_a_id_and_product_b_id", unique: true
    t.index ["score"], name: "index_product_affinities_on_score"
  end

  create_table "product_views", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "product_id", null: false
    t.bigint "company_id"
    t.string "session_id"
    t.bigint "region_id"
    t.bigint "city_id"
    t.integer "duration_seconds"
    t.string "referrer"
    t.string "device_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_product_views_on_city_id"
    t.index ["company_id"], name: "index_product_views_on_company_id"
    t.index ["created_at"], name: "index_product_views_on_created_at"
    t.index ["product_id"], name: "index_product_views_on_product_id"
    t.index ["region_id"], name: "index_product_views_on_region_id"
    t.index ["session_id"], name: "index_product_views_on_session_id"
    t.index ["user_id"], name: "index_product_views_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "category_id", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.text "description"
    t.text "short_description"
    t.decimal "base_price", precision: 12, scale: 2
    t.json "specs", default: {}
    t.json "images", default: []
    t.string "video_url"
    t.integer "warranty_months", default: 12
    t.integer "lead_time_days"
    t.integer "area_m2"
    t.integer "bedrooms", default: 0
    t.integer "bathrooms", default: 0
    t.integer "views_count", default: 0
    t.integer "favorites_count", default: 0
    t.integer "quotes_count", default: 0
    t.boolean "featured", default: false
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "images_data"
    t.index ["active"], name: "index_products_on_active"
    t.index ["base_price"], name: "index_products_on_base_price"
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["company_id"], name: "index_products_on_company_id"
    t.index ["featured"], name: "index_products_on_featured"
    t.index ["slug"], name: "index_products_on_slug", unique: true
  end

  create_table "quote_requests", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "product_id", null: false
    t.bigint "company_id", null: false
    t.bigint "lead_id"
    t.text "message"
    t.decimal "budget_min"
    t.decimal "budget_max"
    t.string "timeline"
    t.integer "intent_score", default: 0
    t.string "status", default: "pending"
    t.text "response_message"
    t.decimal "quoted_price"
    t.boolean "converted", default: false
    t.datetime "converted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_quote_requests_on_company_id"
    t.index ["converted"], name: "index_quote_requests_on_converted"
    t.index ["lead_id"], name: "index_quote_requests_on_lead_id"
    t.index ["product_id"], name: "index_quote_requests_on_product_id"
    t.index ["status"], name: "index_quote_requests_on_status"
    t.index ["user_id"], name: "index_quote_requests_on_user_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string "name", null: false
    t.string "code", null: false
    t.string "full_name"
    t.decimal "tax_multiplier", precision: 5, scale: 2, default: "1.0"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_regions_on_code", unique: true
    t.index ["name"], name: "index_regions_on_name"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "company_id", null: false
    t.bigint "product_id"
    t.integer "rating", null: false
    t.string "title"
    t.text "comment"
    t.json "images", default: []
    t.boolean "verified_purchase", default: false
    t.string "status", default: "pending"
    t.boolean "company_response", default: false
    t.text "company_response_text"
    t.datetime "company_response_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_reviews_on_company_id"
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["rating"], name: "index_reviews_on_rating"
    t.index ["status"], name: "index_reviews_on_status"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "plan_id", null: false
    t.string "status", default: "active"
    t.string "stripe_subscription_id"
    t.string "stripe_customer_id"
    t.string "billing_cycle", default: "monthly"
    t.datetime "current_period_start"
    t.datetime "current_period_end"
    t.datetime "canceled_at"
    t.boolean "cancel_at_period_end", default: false
    t.text "metadata", default: "{}"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_subscriptions_on_plan_id"
    t.index ["status"], name: "index_subscriptions_on_status"
    t.index ["stripe_subscription_id"], name: "index_subscriptions_on_stripe_subscription_id", unique: true
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "views", default: 0
    t.string "phone"
    t.string "avatar_url"
    t.string "role", default: "buyer"
    t.bigint "region_id"
    t.bigint "city_id"
    t.boolean "active", default: true
    t.jsonb "avatar_data"
    t.index ["city_id"], name: "index_users_on_city_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["region_id"], name: "index_users_on_region_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role"], name: "index_users_on_role"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "ad_banners", "ad_campaigns", column: "campaign_id"
  add_foreign_key "ad_banners", "ad_placements", column: "placement_id"
  add_foreign_key "ad_campaigns", "advertisers"
  add_foreign_key "ad_clicks", "ad_banners", column: "banner_id"
  add_foreign_key "ad_clicks", "ad_placements", column: "placement_id"
  add_foreign_key "ad_clicks", "cities"
  add_foreign_key "ad_clicks", "regions"
  add_foreign_key "ad_clicks", "users"
  add_foreign_key "ad_impressions", "ad_banners", column: "banner_id"
  add_foreign_key "ad_impressions", "ad_placements", column: "placement_id"
  add_foreign_key "ad_impressions", "cities"
  add_foreign_key "ad_impressions", "regions"
  add_foreign_key "ad_impressions", "users"
  add_foreign_key "advertisers", "users"
  add_foreign_key "categories", "categories", column: "parent_id"
  add_foreign_key "cities", "regions"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "companies", "cities"
  add_foreign_key "companies", "regions"
  add_foreign_key "company_categories", "categories"
  add_foreign_key "company_categories", "companies"
  add_foreign_key "favorites", "products"
  add_foreign_key "favorites", "users"
  add_foreign_key "intent_events", "cities"
  add_foreign_key "intent_events", "companies"
  add_foreign_key "intent_events", "leads"
  add_foreign_key "intent_events", "products"
  add_foreign_key "intent_events", "regions"
  add_foreign_key "intent_events", "users"
  add_foreign_key "intent_sessions", "cities"
  add_foreign_key "intent_sessions", "leads"
  add_foreign_key "intent_sessions", "regions"
  add_foreign_key "intent_sessions", "users"
  add_foreign_key "lead_scores", "leads"
  add_foreign_key "leads", "cities"
  add_foreign_key "leads", "companies"
  add_foreign_key "leads", "regions"
  add_foreign_key "leads", "users"
  add_foreign_key "payments", "subscriptions"
  add_foreign_key "payments", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "product_affinities", "products", column: "product_a_id"
  add_foreign_key "product_affinities", "products", column: "product_b_id"
  add_foreign_key "product_views", "cities"
  add_foreign_key "product_views", "companies"
  add_foreign_key "product_views", "products"
  add_foreign_key "product_views", "regions"
  add_foreign_key "product_views", "users"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "companies"
  add_foreign_key "quote_requests", "companies"
  add_foreign_key "quote_requests", "leads"
  add_foreign_key "quote_requests", "products"
  add_foreign_key "quote_requests", "users"
  add_foreign_key "reviews", "companies"
  add_foreign_key "reviews", "products"
  add_foreign_key "reviews", "users"
  add_foreign_key "subscriptions", "plans"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "users", "cities"
  add_foreign_key "users", "regions"
end
