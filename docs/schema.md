# Schema Information

## projects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | string    | not null
owner_id    | integer   | not null, foreign key (references users), indexed

## project_members
### join table between users and projects
### uniqueness index on combination of project_id and member_id

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
project_id  | integer   | not null, foreign key (references projects), indexed
member_id   | integer   | not null, foreign key (references users), indexed



## threads
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
project_id  | integer   | not null, foreign key (references projects), indexed
title       | string    | not null
body        | text      | not null

<!-- May need to refactor to remove threads altogether - consider implications of this -->
## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
thread_id   | integer   | not null, foreign key (references threads), indexed
body        | text      | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
email           | string    | not null, indexed, unique
organization    | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## todo_lists
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
project_id      | integer   | not null, foreign key (references projects), indexed
creator_id      | integer   | not null, foreign key (references users), indexed
title           | string    | not null
description     | string    | not null
completed       | boolean   |


## todo_item
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
todo_list_id    | integer   | not null, foreign key (references projects), indexed
creator_id      | integer   | not null, foreign key (references users), indexed
title           | string    | not null
description     | string    | not null
due_date        | date      |
completed       | boolean   |

## todo_item_assignments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
todo_item_id    | integer   | not null, foreign key (references projects), indexed
assignee_id     | integer   | not null, foreign key (references projects), indexed
