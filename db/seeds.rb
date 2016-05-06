# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

guest_user = User.create!({email: "guest@guest.com", password: "password", organization: "House Stark", name: "Ed Snow"})
users = (0..20).map do
  User.create!({email: Faker::Internet.email, organization: Faker::Company.name, name: Faker::Name.name, password: "password"})
end

guest_project = Project.create!({description: Faker::Company.catch_phrase, title: Faker::Book.title, owner_id: guest_user.id });
ProjectMembership.create!({project_id: guest_project.id, member_id: guest_user.id})

users.each do |user|
  project = Project.create!({description: Faker::Company.catch_phrase, title: Faker::Book.title, owner_id: guest_user.id })
  ProjectMembership.create!({project_id: project.id, member_id: guest_user.id})
  ProjectMembership.create!({project_id: project.id, member_id: user.id})
  (rand(3) + 1).times do
    rand_user = users.sample
    if rand_user != user
      ProjectMembership.create({project_id: project.id, member_id: rand_user.id})
    end
  end
  if (rand(3) == 0)
    ProjectMembership.create!({project_id: guest_project.id, member_id: user.id})
  end
end

Project.all.each do |project|
  members = project.members
  todo_lists = (0..4).map do
    title = Faker::Commerce.product_name
    num = rand(1)
    if num == 0
      description = Faker::StarWars.quote
    else
      description = Faker::Company.bs
    end
    TodoList.create!({
      project_id: project.id,
      user_id: members[rand(members.length - 1)].id,
      title: title,
      description: description,
      completed: (rand(2) == 0)
      })
  end
  todo_lists.each do |todo_list|
    (rand(4) + 1).times do
      description = Faker::Hacker.noun.capitalize + ' ' + Faker::Hacker.ingverb + ' ' + Faker::Superhero.power
      title = Faker::Company.buzzword.capitalize + ' ' + Faker::Company.buzzword.capitalize
      user_id = members.sample.id
      if (rand(3) != 0)
        due_date = Faker::Time.between(3.months.ago, 1.year.from_now)
      else
        due_date = nil
      end
      completed = (rand(2) == 1)
      TodoItem.create!({
        todo_list_id: todo_list.id,
        user_id: user_id,
        title: title,
        description: description,
        due_date: due_date,
        completed: completed
        })
    end
  end
end
