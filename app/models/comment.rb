class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  has_rich_text :body
  after_create_commit :notify_recipient
  has_noticed_notifications model_name: 'Noticed::Event'
  has_many :notification_mentions, as: :record, dependent: :destroy, class_name: 'Noticed::Event'
  validate :no_curse_words



  private

  def notify_recipient
    CommentNotifier.with(record: self, post:).deliver_later(post.user)
  end

  def no_curse_words
    plain_text_body = body.to_plain_text if body.present?
    return unless plain_text_body.present? && curse_word_found?(plain_text_body)

    errors.add(:base, 'Your comment contains inappropriate language and cannot be saved.')
  end

  def curse_word_found?(text)
    CURSE_WORDS.any? { |word| text.match?(Regexp.new(word, Regexp::IGNORECASE)) }
  end
end
