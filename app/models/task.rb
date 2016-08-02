class Task < ApplicationRecord
  belongs_to :project
  include RankedModel
  ranks :task_number,
    :with_same => :project_id
  validates :name, presence: true
  validates :start_date, presence: true
end
