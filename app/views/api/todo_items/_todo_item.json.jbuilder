json.(todo_item, :id, :todo_list_id, :title, :user_id, :description, :due_date, :completed)
json.assignees do
  json.array! todo_item.assignees do |user|
    json.(user, :id, :name)
  end
end
