class RenameProjectMembers < ActiveRecord::Migration
  def change
    rename_table :project_members, :project_memberships
  end
end
