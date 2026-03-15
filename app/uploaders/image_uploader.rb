class ImageUploader < Shrine
  ALLOWED_TYPES = %w[image/jpeg image/png image/webp image/gif]
  ALLOWED_EXTENSIONS = %w[jpg jpeg png webp gif]

  plugin :determine_mime_type
  plugin :store_dimensions
  plugin :validation
  plugin :processing
  plugin :versions
  plugin :delete_promoted

  process(:store) do |io, context|
    original = io.download

    versions = { original: original }

    if context[:record].class.name.demodulize == 'Product'
      versions[:large] = resize_to_limit(original, 1200, 1200)
      versions[:medium] = resize_to_limit(original, 600, 600)
      versions[:thumbnail] = resize_to_fill(original, 300, 300)
    elsif context[:record].class.name.demodulize == 'Company'
      versions[:logo] = resize_to_fill(original, 200, 200)
      versions[:cover] = resize_to_limit(original, 1920, 600)
    else
      versions[:large] = resize_to_limit(original, 800, 800)
      versions[:medium] = resize_to_limit(original, 400, 400)
      versions[:thumbnail] = resize_to_fill(original, 150, 150)
    end

    versions
  end

  def validate(io, context)
    if io.content_type
      unless ALLOWED_TYPES.include?(io.content_type)
        error = "Tipo de arquivo não permitido: #{io.content_type}"
        raise Shrine::InvalidError, error
      end
    end

    if io.filename
      ext = io.filename.split('.').last.downcase
      unless ALLOWED_EXTENSIONS.include?(ext)
        error = "Extensão não permitida: .#{ext}"
        raise Shrine::InvalidError, error
      end
    end
  end

  private

  def resize_to_limit(image, width, height)
    magick = ImageProcessing::MiniMagick.source(image)
    magick.resize_to_limit!(width, height)
  end

  def resize_to_fill(image, width, height)
    magick = ImageProcessing::MiniMagick.source(image)
    magick.resize_to_fill!(width, height)
  end
end
