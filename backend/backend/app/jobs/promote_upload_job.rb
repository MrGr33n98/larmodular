class PromoteUploadJob < ApplicationJob
  queue_as :default

  def perform(data)
    data = JSON.parse(data)
    Shrine::Attacher.from_data(data).promote
  end
end
