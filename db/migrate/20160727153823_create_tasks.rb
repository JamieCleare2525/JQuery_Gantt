class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.date :start_date
      t.date :finish_date
      t.integer :prerequisite

      t.timestamps
    end
  end
end
