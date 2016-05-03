class Project < ActiveRecord::Base
  validates :title, :description, :owner_id, presence: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: User

  has_many :memberships,
    dependent: :destroy,
    foreign_key: :project_id,
    class_name: ProjectMembership

  #it is entirely possible to have the project owner not be a member
  #controller to auto-enroll the owner in a project?
  has_many :members,
    through: :memberships,
    source: :member

  has_many :todo_lists
  
end
