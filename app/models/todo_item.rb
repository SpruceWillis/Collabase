class TodoItem < ActiveRecord::Base
  validates :todo_list_id, :user_id, :title, :description, :due_date, null: false
  validates :completed, inclusion: {in: [true, false]}

  belongs_to :todo_list

  belongs_to :user

  has_one :project,
    through: :todo_list,
    source: :project

  has_many :todo_assignments,
    dependent: :destroy

  has_many :assignees,
    through: :todo_assignments,
    source: :assignee

  def self.update_multiple(todo_items)
    TodoItem.transaction do
      todo_items.each do |todo_item|
        item = TodoItem.find(todo_item["id"])
        item.update!(todo_item)
      end
    end
  end
end
