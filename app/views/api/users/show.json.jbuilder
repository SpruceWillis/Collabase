json.user do
  json.partial! 'api/users/user', user: @user, show_notifications: false
end
