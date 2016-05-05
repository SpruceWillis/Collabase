class TodoList < ActiveRecord::Base
  validates :project_id, :user_id, :title, :description, presence: true
  validates :completed, inclusion: {in: [true,false]}

  belongs_to :project
  belongs_to :user

end
