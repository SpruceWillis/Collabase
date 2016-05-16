class TodoAssignment < ActiveRecord::Base
  validates :todo_item_id, :assigner_id, :assignee_id, presence: true
  validates :todo_item_id, uniqueness: {scope: :assignee_id}

  belongs_to :todo_item

  belongs_to :assigner,
    foreign_key: :assigner_id,
    class_name: User

  belongs_to :assignee,
    foreign_key: :assignee_id,
    class_name: User

  has_one :todo_list,
    through: :todo_item,
    source: :todo_list

  has_one :project,
    through: :todo_list,
    source: :project

end
