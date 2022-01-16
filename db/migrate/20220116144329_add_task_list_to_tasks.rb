class AddTaskListToTasks < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :task_list, null: false, foreign_key: true, :default => 0
  end
end
