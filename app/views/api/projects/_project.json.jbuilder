json.(project, :id, :title, :description, :owner_id)

if show_members
  json.members do
    json.partial! "/api/users/user", collection: project.members, as: :user, show_projects: false
  end
end

if show_todos
  json.todo_lists do
    json.partial! "api/todo_list/todo_list", collection: project.todo_lists, as: :todo_list, show_items: false
  end
end
