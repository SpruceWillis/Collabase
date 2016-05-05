class TodoItem < ActiveRecord::Base
  validates :todo_list_id, :user_id, :title, :description, :due_date, null: false
  validates :completed, inclusion: {in: [true, false]}

  belongs_to :todo_list

  belongs_to :user

  

end
