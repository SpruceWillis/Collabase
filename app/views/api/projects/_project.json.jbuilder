json.(project, :id, :title, :description, :owner_id)
if show_members
  json.members do
    json.partial! "/api/users/user", collection: project.members, as: :user, show_projects: false
  end
end
