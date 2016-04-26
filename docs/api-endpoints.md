# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `POST /session`
- `DELETE /session`

## JSON API

### Projects

<!-- - `GET /api/users/:userid/projects`
  - accepts pagination params (if I get there) -->
- `POST /api/users/:userid/projects`
  - Creates new project with current user as owner
- `GET /api/users/:userid/projects/:id`
- `PATCH /api/users/:userid/projects/:id`
- `DELETE /api/users/:userid/projects/:id`

### Threads

- `GET /api/projects/:projectid/threads`
  - accepts pagination params (if I get there)
- `POST /api/projects/:projectid/threads`
- `PATCH /api/projects/:projectid/thread/:id`

### Comments


- `POST /api/comments`
  - params indicate the message thread that the comment belongs to
- `PATCH /api/comments/:id`
- `DELETE /api/comments/:id`

### Todos

- `GET /api/projects/:projectid/todos`
- `POST /api/projects/:projectid/todos`
- `GET /api/projects/:projectid/todos/:id`
- `PATCH /api/projects/:projectid/todos/:id`
- `DELETE /api/projects/:projectid/todos/:id`

### Todo-Items

- `POST /api/projects/:projectid/todos/:todoid/items`
- `PATCH /api/projects/:projectid/todos/:todoid/items/:id`
- `DELETE /api/projects/:projectid/todos/:todoid/items/:id`
