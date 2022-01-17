class Task < ApplicationRecord
  belongs_to :task_list
  has_many :tags
  
  validates :title, presence: true
  validates :task_list_id, presence: true
end
