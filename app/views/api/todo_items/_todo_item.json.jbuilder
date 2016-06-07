json.(todo_item, :id, :todo_list_id, :title, :user_id, :description, :due_date, :completed)
puts todo_item.id
if show_assignments
  json.assignments do
    json.partial! 'api/todo_assignments/todo_assignment',
      collection: todo_item.todo_assignments,
      as: :todo_assignment
  end
end
