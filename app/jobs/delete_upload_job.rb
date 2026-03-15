class DeleteUploadJob < ApplicationJob
  queue_as :default

  def perform(data)
    data = JSON.parse(data)
    Shrine::Attacher.from_data(data).delete
  end
end
