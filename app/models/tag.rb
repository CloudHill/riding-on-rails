class Tag < ApplicationRecord
  has_and_belongs_to_many :tasks

  validates :name, presence: true
  validates :color, length: {is: 6}, allow_blank: true
end
