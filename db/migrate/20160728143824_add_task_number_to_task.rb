class AddTaskNumberToTask < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :task_number, :integer
  end
end
