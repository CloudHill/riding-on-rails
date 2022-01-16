class Task < ApplicationRecord
  belongs_to :task_list
  
  validates :title, presence: true
  validates :task_list_id, presence: true
end
