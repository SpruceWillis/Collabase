json.(todo_list, :id, :project_id, :user_id, :title, :description, :completed)
json.todo_items do
  json.partial! '/api/todo_item/todo_item', collection:  todo_list.todo_items, as: :todo_item
end
