class ProjectMembership < ActiveRecord::Base
  validates :project_id, :member_id, presence: true
  validates :project_id, uniqueness: {scope: :member_id}

  belongs_to :member,
    foreign_key: :member_id,
    class_name: User

  belongs_to :project


end
