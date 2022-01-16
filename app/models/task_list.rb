class TaskList < ApplicationRecord
  validates :name, presence: true
end
