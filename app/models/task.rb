class Task < ApplicationRecord
  validates :name, presence: true
  validates :start_date, presence: true
  validates :finish_date, presence: true
  validates :prerequisite, presence: true
end
