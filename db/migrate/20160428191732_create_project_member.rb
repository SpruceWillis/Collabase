class CreateProjectMember < ActiveRecord::Migration
  def change
    create_table :project_members do |t|
      t.integer :project_id, null: false, index: true
      t.integer :member_id, null: false, index: true
    end
    add_index :project_members, [:project_id, :member_id], unique: true
  end
end
