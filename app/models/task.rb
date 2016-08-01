class Task < ApplicationRecord
  belongs_to :project
  include RankedModel
  ranks :task_number
  validates :name, presence: true
  validates :start_date, presence: true
end
