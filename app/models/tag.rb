class Tag < ApplicationRecord
  has_many :tasks, dependent: :nullify

  validates :name, presence: true
  validates :color, length: {is: 6}
end
