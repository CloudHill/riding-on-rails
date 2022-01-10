class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :note
      t.boolean :important, default: false
      t.boolean :completed, default: false
      t.datetime :completed_at
      t.datetime :due_at

      t.timestamps
    end
  end
end
