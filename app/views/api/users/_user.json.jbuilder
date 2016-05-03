json.(user, :email, :name, :organization, :id)
if show_projects
  json.projects do
    json.partial! '/api/projects/project', collection: user.member_projects, as: :project, show_members: false
  end
end
