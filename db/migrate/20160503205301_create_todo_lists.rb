class CreateTodoLists < ActiveRecord::Migration
  def change
    create_table :todo_lists do |t|
      t.integer :project_id, null: false, index: true
      t.integer :user_id, null: false, index: true
      t.string :title, null: false
      t.string :description, null: false
      t.boolean :completed, null: false
      t.timestamps null: false
    end
    add_foreign_key :todo_lists, :projects
    add_foreign_key :todo_lists, :users
  end
end
