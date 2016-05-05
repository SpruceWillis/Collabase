class TodoList < ActiveRecord::Base
  validates :project_id, :user_id, :title, :description, presence: true
  validates :completed, inclusion: {in: [true,false]}

  belongs_to :project
  belongs_to :user

  has_many :todo_items,
  dependent: :destroy

end
