class AddTagsToTasks < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :tag, null: true, foreign_key: true
  end
end
