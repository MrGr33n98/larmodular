class Post < ApplicationRecord
  validates :title, presence: true, length: { minimum: 5, maximum: 50 }
  validates :body, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_noticed_notifications model_name: 'Noticed::Notification'
  has_many :notification_mentions, as: :record, dependent: :destroy, class_name: 'Noticed::Event'
  validate :no_curse_words

  scope :published, -> { where.not(published_at: nil) }
  scope :unpublished, -> { where(published_at: nil) }



  private

  def no_curse_words
    errors.add(:title, 'contains inappropriate language') if curse_word_found?(title)
    return unless body.present? && curse_word_found?(body.to_s)

    errors.add(:body, 'contains inappropriate language')
  end

  def curse_word_found?(text)
    CURSE_WORDS.any? { |word| text.match?(Regexp.new("\\b#{Regexp.escape(word)}\\b", Regexp::IGNORECASE)) }
  end
end
