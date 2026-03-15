class AdBannerSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :target_url, :alt_text,
             :impressions_limit, :impressions_count, :clicks_count,
             :priority, :active, :approved
end
