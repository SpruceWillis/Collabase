class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.integer :todo_list_id, null: false, index: true
      t.integer :user_id, null: false, index: true
      t.string :title, null: false
      t.string :description, null: false
      t.date  :due_date
      t.boolean :completed
      t.timestamps null: false
    end
    add_foreign_key :todo_items, :todo_lists
    add_foreign_key :todo_items, :users
  end
end
