class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks
  validates :title, presence: true
  validates :description, presence: true
  validates :start_date, presence: true
end
