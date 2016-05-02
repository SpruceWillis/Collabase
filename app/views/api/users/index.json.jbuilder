# json.users do
#     json.partial! 'api/users/user', collection: @users, as: :user, show_projects: false
# end

json.array! (@users.includes(:member_projects)) do |user|
  json.partial! 'api/users/user', user: user, show_projects: true
end
