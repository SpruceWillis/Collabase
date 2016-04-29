# collaBase

[Heroku link][heroku] Link to production site

[heroku]: https://collabase.herokuapp.com

## Minimum Viable Product

collaBase is a web application in the vein of basecamp build on Rails and ReactJS.  This app will have the following functionality completed by the end of week 9:

- [ ] New account creation, existing user login, demo account login.
- [ ] No major bugs present.
- [ ] Good seed data to demonstrate the site's features, including a sample project that all users have access to.
- [ ] Basecamp-inspired features: project creation; member management; creation and posting to message threads; creation, assignment, and completion of to-do lists.
- [ ] Hosting on Heroku; registration of a non-Heroku domain name.
- [ ] User-friendly and aesthetically pleasing interface and layout.
- [ ] Production README file - to be written on completion

## Product Goals and Priorities

collaBase will allow users to do the following:

- [ ] MVP Features
  - [ ] Create an account
  - [ ] Log in / Log out, including as a Guest/Demo User
  - [ ] Create and edit projects
  - [ ] Add or remove members from projects
  - [ ] Create and post to message threads on project message board
  - [ ] Notification of outstanding assigned to-do items
  - [ ] Create and assignment of to-do list items; mark items as completed
- [ ] Bonus Features
  - [ ] Notification of latest project activity or mentions
  - [ ] Save messages as drafts
  - [ ] Send password reset email
  - [ ] Transfer ownership of a project to another project member
  - [ ] Real-time chat

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (1 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup component and sign-in
- [x] blank landing page after signin
- [x] seed user data in database for future project phases
- [x] style authentication components

### Phase 2: Project Model, API, and basic APIUtil (2 days)

**Objective:** Projects can be created, read, and edited through the API. Project membership can be edited through the API.

- [x] create `Project` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for projects (`ProjectsController`)
- [x] jBuilder views for projects
- [x] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

<!-- Time elapsed: 3 days -->

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Projects can be created, read, and edited through the user interface. Project membership can be edited through the interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each project component, building out the flux loop as needed.
  - [ ] `ProjectLandingPage`
  - [ ] `NewProjectPage`
- [ ] Pages are properly styled
- [ ] save Project to database after form is submitted. Discard project if form is cancelled.

  <!-- Time elapsed: 3.5 days -->

### Phase 4: Message threads (2 days)

**Objective:** Messages belong to Projects, and can be viewed by project.

- [ ] create `Message` model
  - [ ] add placeholder content until next phase
- build out API, Flux loop, and components for:
  - [ ] Thread CRUD
  - [ ] Adding a thread requires a project
  - [ ] Viewing threads by project
- [ ] Create and style view for creating a new thread and viewing a project's threads

<!-- Time elapsed: 5 days -->


### Phase 5: Comments (2 days)

**Objective:** Comments belong to Threads, and can be viewed by thread.

- [ ] create `Comment` model
- build out API, Flux loop, and components for:
  - [ ] Comment CRUD
  - [ ] Adding a comment requires a thread
  - [ ] Viewing comments by thread
- view for displaying a thread's comments
- Use CSS to style new views

<!-- Time elapsed: 6 days -->

### Phase 6: Allow Complex Styling in Comments (0.5 days)

**objective:** Enable complex styling of comments.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

<!-- Time elapsed: 6.5 days -->

### Phase 7: Todo-Lists (1.5 days)

**objective** Todo lists belong to projects, and can be viewed by list.
- [ ] create `Todo-List` model
- [ ] build out API, Flux loop, and components for:
  - [ ] Todo-list CRUD
  - [ ] Adding a list requires a project
  - [ ] Viewing lists by project
- [ ] View for displaying a project's lists
- [ ] Use CSS to style new views

### Phase 8: Todo-Items (2.5 days)

**objective** Todo-items belong to todo-lists, and can be viewed by list. They
can be assigned to project members, who will receive a notification.
- [ ] create `Todo-item` model
- [ ] build out API, Flux loop, and components for:
  - [ ] Todo-item CRUD
  - [ ] Adding an item requires a list
  - [ ] Viewing items by list
  - [ ] Users can view their assigned todo-items
- [ ] View for displaying a todo-list's items
- [ ] Integrate push notifications to users on being assigned a todo-list item

### Phase 9: Styling Cleanup and Seeding (1.5 days)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

<!-- Time elapsed: 7.5 days -->


### Bonus Features (TBD)
- [ ] Save messages as drafts; edit and remove drafts
- [ ] Password resets via email
- [ ] Pagination / infinite scroll for Comments Index
- [ ] Transfer project ownership
- [ ] Notifications for project and mention activity
- [ ] Real-time chat

<!--

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

 -->
