class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :description, :icon, :parent_id, :position

  attribute :children do
    object.children.map { |child| CategorySerializer.new(child).as_json }
  end

  attribute :parent_name do
    object.parent.name if object.parent
  end
end
