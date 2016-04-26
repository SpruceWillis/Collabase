# Collabase

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Collabase is a web application in the vein of basecamp build on Rails and ReactJS.  This app will have the following functionality completed by the end of week 9:

- [ ] New account creation, existing user login, demo account login.
- [ ] No major bugs.
- [ ] Good seed data to demonstrate the site's features, including a sample project that all users have access to.
- [ ] Basecamp-inspired features: project creation; member management; creation and posting to message threads; creation, assignment, and completion of to-do lists.
- [ ] Hosting on Heroku; registration of a non-Heroku domain name.
- [ ] User-friendly and aesthetically pleasing interface and layout.
- [ ] Production README file - to be written on completion

## Product Goals and Priorities

Collabase will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] MVP Features
  - [ ] Create an account
  - [ ] Log in / Log out, including as a Guest/Demo User
  - [ ] Create and edit projects
  - [ ] Add or remove members from projects
  - [ ] Create and post to message threads on a project's message board
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


### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin
- [ ] seed user data in database for future project phases -

<!-- Time elapsed: .5 days  -->

### Phase 2: Project Model, API, and basic APIUtil (1.5 days)

**Objective:** Projects can be created, read, and edited through the API. Project
membership can be edited through the API.

- [ ] create `Project` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for projects (`ProjectsController`)
- [ ] jBuilder views for projects
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

<!-- Time elapsed: 2 days -->

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Projects can be created, read, and edited through the user interface. Project membership can be edited through the interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each project component, building out the flux loop as needed.
  - [ ] `ProjectsIndex`
  - [ ] `NewProjectPage`
- [ ] save Project to database after form is submitted. Discard project if form is cancelled.

  <!-- Time elapsed: 3.5 days -->

### Phase 4: Start Styling (.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

<!-- Time elapsed: 4 days -->


### Phase 5: Message threads (1 day)

**Objective:** Messages belong to Projects, and can be viewed by project.

- [ ] create `Message` model
  - [ ] add placeholder content until next phase
- build out API, Flux loop, and components for:
  - [ ] Message CRUD
  - [ ] adding a message requires a project
  - [ ] viewing messages by project
- Use CSS to style new views

Phase 3 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.

<!-- Time elapsed: 5 days -->


### Phase 6: Message comments (1 day)

**Objective:** Comments belong to Messages, and can be viewed by message.

- [ ] create `Comment` model
- build out API, Flux loop, and components for:
  - [ ] Comment CRUD
  - [ ] adding a message requires a message
  - [ ] viewing comments by project
- Use CSS to style new views

Phase 3 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.

<!-- Time elapsed: 6 days -->

### Phase 7: Allow Complex Styling in Comments (0.5 days)

**objective:** Enable complex styling of comments.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

<!-- Time elapsed: 6.5 days -->

### Phase 8: Styling Cleanup and Seeding (1 day)

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
