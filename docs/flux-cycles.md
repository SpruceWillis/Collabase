# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.


## Session Cycles

### Session API Request Actions

* `fetchSession`
  0. invoked from login button on `LoginPage` or on user creation when signing in.
  0. `POST /session` is called.
  0. `receiveSession` is set as the callback.

* `removeSession`
  0. invoked from clicking logout link from navbar dropdown.
  0. `DELETE /session` is called.
  0. `removeSession` is set as the callback.

### Session API Response Actions

* `receiveSession`
  0. invoked from an API callback.
  0. `Session` store updates `_session` and emits change

* `removeSession`
  0. invoked from an API callback.
  0. `Session` store clears out `_session` and emits change

### Store Listeners

  * `LoginPage` component listens to `Users` store.
  * `SignUpBlock` component listens to `Users` store
  * `UserProfileInfo` component listens to `Users` store

## Project Cycles

### Project API Request Actions

* `fetchProject`
  0. invoked on login for an existing user and from the ProjectNavBar when switching projects
  0. `GET /api/users/:userid/projects/:id` is called
  0. `receiveProject` is set as the callback

* `createProject`
  0. invoked when creating a new user and from the new project page
  0. `POST /api/users/:userid/projects` is called
  0. `receiveProject` is set as the callback

* `updateProject`
  0. invoked when updating a project from the MainProjectNavigation component.
  0. `PATCH /api/users/:userid/projects` is called
  0. `receiveProject` is set as the callback

* `deleteProject`
  0. invoked when deleting a project from the MainProjectNavigation component.
  0. `DELETE /api/users/:userid/projects` is called;
  0. `removeProject` is set as the callback

### Project API Response Actions

* `receiveProject`
  0. invoked from an API callback
  0. `Project` store sets `_project` to the project and emits change

* `deleteProject`
  0. invoked from an API callback
  0. `Project` is removed from `_project`

<!-- * `fetchSingleNote`
  0. invoked from `NoteDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notes/:id` is called.
  0. `receiveSingleNote` is set as the callback.

* `updateNote`
  0. invoked from `NoteForm` `onSubmit`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the callback.

* `destroyNote`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/notes/:id` is called.
  0. `removeNote` is set as the callback. -->

  <!--

### Notes API Response Actions

* `receiveAllNotes`
  0. invoked from an API callback.
  0. `Note` store updates `_notes` and emits change.

* `receiveSingleNote`
  0. invoked from an API callback.
  0. `Note` store updates `_notes[id]` and emits change.

* `removeNote`
  0. invoked from an API callback.
  0. `Note` store removes `_notes[id]` and emits change.

### Store Listeners

* `NotesIndex` component listens to `Note` store.
* `NoteDetail` component listens to `Note` store.


## Notebook Cycles

### Notebooks API Request Actions

* `fetchAllNotebooks`
  0. invoked from `NotebooksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks` is called.
  0. `receiveAllNotebooks` is set as the callback.

* `createNotebook`
  0. invoked from new notebook button `onClick`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `fetchSingleNotebook`
  0. invoked from `NotebookDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `updateNotebook`
  0. invoked from `NotebookForm` `onSubmit`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `destroyNotebook`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeNotebook` is set as the callback.

### Notebooks API Response Actions

* `receiveAllNotebooks`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks` and emits change.

* `receiveSingleNotebook`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks[id]` and emits change.

* `removeNotebook`
  0. invoked from an API callback.
  0. `Notebook` store removes `_notebooks[id]` and emits change.

-->



## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when there is text
  0. `GET /api/notes` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
