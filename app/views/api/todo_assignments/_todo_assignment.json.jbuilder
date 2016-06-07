json.(todo_assignment, :id)
json.(todo_assignment.assignee, :name)
json.set!(:user_id, todo_assignment.assignee.id)
