class CreateTodoAssignments < ActiveRecord::Migration
  def change
    create_table :todo_assignments do |t|
      t.integer :todo_item_id, index: true, null: false
      t.integer :assigner_id, index: true, null: false
      t.integer :assignee_id, index: true, null: false
      t.timestamps null: false
    end
    add_foreign_key :todo_assignments, :todo_items
    add_foreign_key :todo_assignments, :users, column: :assignee_id
    add_foreign_key :todo_assignments, :users, column: :assigner_id
    add_index :todo_assignments, [:todo_item_id, :assignee_id], unique: true
  end
end
