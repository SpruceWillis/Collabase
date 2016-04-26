# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Projects

- `GET /api/users/:userid/projects`
  - accepts pagination params (if I get there)
- `POST /api/users/:userid/projects`
  - Creates new project with current user as owner
- `GET /api/users/:userid/project/:id`
- `PATCH /api/users/:userid/project/:id`
- `DELETE /api/users/:userid/project/:id`

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

### Todo-Lists

- `GET /api/projects/:projectid/todos/:todoid/todolists`
- `GET /api/projects/:projectid/todos/:todoid/todolists/:id`
- `POST /api/projects/:projectid/todos/:todoid/todolists`
- `PATCH /api/projects/:projectid/todos/:todoid/todolists/:id`
- `UPDATE /api/projects/:projectid/todos/:todoid/todolists/:id`
- `DELETE /api/projects/:projectid/todos/:todoid/todolists/:id`
