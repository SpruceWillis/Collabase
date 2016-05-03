json.array! (@todo_lists) do |todo_list|
  json.partial! 'api/todo_list/todo_list', show_items: false
end
