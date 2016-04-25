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

### Messages

- `GET /api/projects/:projectid/messages`
  - accepts pagination params (if I get there)
- `POST /api/projects/:projectid/messages`
- `PATCH /api/projects/:projectid/messages/:id`

### Comments


- `POST /api/comments`
  - params indicate the message thread that the comment belongs to
- `PATCH /api/comments/:id`
- `DELETE /api/comments/:id'
