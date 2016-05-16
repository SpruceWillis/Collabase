# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160516063438) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "project_memberships", force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "member_id",  null: false
  end

  add_index "project_memberships", ["member_id"], name: "index_project_memberships_on_member_id", using: :btree
  add_index "project_memberships", ["project_id", "member_id"], name: "index_project_memberships_on_project_id_and_member_id", unique: true, using: :btree
  add_index "project_memberships", ["project_id"], name: "index_project_memberships_on_project_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "description", null: false
    t.integer  "owner_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "projects", ["owner_id"], name: "index_projects_on_owner_id", using: :btree

  create_table "todo_assignments", force: :cascade do |t|
    t.integer  "todo_item_id", null: false
    t.integer  "assigner_id",  null: false
    t.integer  "assignee_id",  null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "todo_assignments", ["assignee_id"], name: "index_todo_assignments_on_assignee_id", using: :btree
  add_index "todo_assignments", ["assigner_id"], name: "index_todo_assignments_on_assigner_id", using: :btree
  add_index "todo_assignments", ["todo_item_id", "assignee_id"], name: "index_todo_assignments_on_todo_item_id_and_assignee_id", unique: true, using: :btree
  add_index "todo_assignments", ["todo_item_id"], name: "index_todo_assignments_on_todo_item_id", using: :btree

  create_table "todo_items", force: :cascade do |t|
    t.integer  "todo_list_id", null: false
    t.integer  "user_id",      null: false
    t.string   "title",        null: false
    t.string   "description",  null: false
    t.date     "due_date"
    t.boolean  "completed"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "todo_items", ["todo_list_id"], name: "index_todo_items_on_todo_list_id", using: :btree
  add_index "todo_items", ["user_id"], name: "index_todo_items_on_user_id", using: :btree

  create_table "todo_lists", force: :cascade do |t|
    t.integer  "project_id",  null: false
    t.integer  "user_id",     null: false
    t.string   "title",       null: false
    t.string   "description", null: false
    t.boolean  "completed",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "todo_lists", ["project_id"], name: "index_todo_lists_on_project_id", using: :btree
  add_index "todo_lists", ["user_id"], name: "index_todo_lists_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "name",            null: false
    t.string   "organization",    null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  add_foreign_key "projects", "users", column: "owner_id"
  add_foreign_key "todo_assignments", "todo_items"
  add_foreign_key "todo_assignments", "users", column: "assignee_id"
  add_foreign_key "todo_assignments", "users", column: "assigner_id"
  add_foreign_key "todo_items", "todo_lists"
  add_foreign_key "todo_items", "users"
  add_foreign_key "todo_lists", "projects"
  add_foreign_key "todo_lists", "users"
end
