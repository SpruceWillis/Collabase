# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

guest_user = User.create!({email: "guest@guest.com", password: "password", organization: "House Stark", name: "Bob Stark"})
users = (0..9).map do
  User.create!({email: Faker::Internet.email, organization: Faker::Company.name, name: Faker::Name.name, password: "password"})
end

guest_project = Project.create!({description: Faker::Company.catch_phrase, title: Faker::Book.title, owner_id: guest_user.id });


users.each do |user|
  project = Project.create!({description: Faker::Company.catch_phrase, title: Faker::Book.title, owner_id: guest_user.id })
  ProjectMembership.create!({project_id: project.id, member_id: guest_user.id})
  ProjectMembership.create!({project_id: project.id, member_id: user.id})
  (rand(3) + 1).times do
    rand_user = users.sample
    if rand_user != user
      ProjectMembership.create!({project_id: project.id, member_id: rand_user.id})

    end
  end
end
