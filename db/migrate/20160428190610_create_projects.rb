class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.integer :owner_id, null: false, index: true
      t.timestamps null: false
    end
    add_foreign_key :projects, :users, column: :owner_id
  end
end
