class RemoveProjectCreator < ActiveRecord::Migration[5.0]
  def change
    remove_column :projects, :creator
  end
end
