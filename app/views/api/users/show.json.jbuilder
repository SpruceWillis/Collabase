json.user do
  json.partial! 'api/users/user', user: @user, show_projects: show_projects
end
