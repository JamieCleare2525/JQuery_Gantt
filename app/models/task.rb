class Task < ApplicationRecord
  belongs_to :project
  validates :name, presence: true
  validates :start_date, presence: true
end
