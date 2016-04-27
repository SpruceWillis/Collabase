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

- `GET /api/projects/:projectId/threads`
  - accepts pagination params (if I get there)
- `GET /api/projects/:projectId/threads/:id`
- `POST /api/projects/:projectId/threads`
- `PATCH /api/projects/:projectId/thread/:id`
- `DELETE /api/projects/:projectId/thread/:id`

### Comments

- `POST /api/comments`
  - params indicate the message thread that the comment belongs to
- `PATCH /api/comments/:id`
- `DELETE /api/comments/:id`

### Todos

- `GET /api/projects/:projectId/todos`
- `POST /api/projects/:projectId/todos`
- `GET /api/projects/:projectId/todos/:id`
- `PATCH /api/projects/:projectId/todos/:id`
- `DELETE /api/projects/:projectId/todos/:id`

### Todo-Items

- `POST /api/projects/:projectId/todos/:todoId/items`
- `PATCH /api/projects/:projectId/todos/:todoId/items/:id`
- `DELETE /api/projects/:projectId/todos/:todoId/items/:id`
