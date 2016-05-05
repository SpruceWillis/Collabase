class TodoItem < ActiveRecord::Base
  validates :todo_list_id, :user_id, :title, :description, :due_date, null: false
  validates :completed, inclusion: {in: [true, false]}

  belongs_to :todo_list

  belongs_to :user

  def self.update_multiple(todo_items)
    TodoItem.transaction do
      todo_items.each do |todo_item|
        item = TodoItem.find(todo_item["id"])
        item.update!(todo_item)
      end
    end
  end
end
