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
  0. `destroySession` is set as the callback.

### Session API Response Actions

* `receiveSession`
  0. invoked from an API callback.
  0. `Session` store sets the value of `_session` and emits change

* `destroySession`
  0. invoked from an API callback.
  0. `Session` store clears out `_session` and emits change

### Store Listeners

  * `LoginPage` component listens to `Session` store
  * `SignUpBlock` component listens to `Session` store
  * `UserProfileInfo` component listens to `Session` store

## Project Cycles

### Project API Request Actions

* `fetchProject`
  0. from the MainProjectNavigation `componentDidMount` or `componentWillReceiveProps` when navigating to the project landing page or switching projects
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

* `destroyProject`
  0. invoked when deleting a project from the MainProjectNavigation component.
  0. `DELETE /api/users/:userid/projects` is called;
  0. `destroyProject` is set as the callback

### Project API Response Actions

* `receiveProject`
  0. invoked from an API callback
  0. `Project` store sets  the value of `_project` to the project and emits change

* `destroyProject`
  0. invoked from an API callback
  0. `Project` is replaced in `_project` with the second project returned by the deletion AJAX. The replacement project is either the first project available to the user or a newly generated empty project.

### Store Listeners

  * `MainProjectNavigation` component listens to `Project` store
  * `NewProjectPage` component listens to `Project` store
  * `ProjectNavBar` component listens to `Project` store

## Thread and Comment Cycles

### Thread API Request Actions

  * `fetchThreads`
    0. invoked by `MessagePreviewContainer` component on componentDidMount
    0. `GET /api/projects/:projectId/threads` is called
    0. `receiveThreads` is set as the callback

  * `fetchThread`
    0. invoked by `MessageThreadContainer` component on componentDidMount
    0. `GET /api/projects/:projectID/threads/:id` is called
    0. `receiveThread` is set as the callback

  * `createThread`
    0. invoked by `ThreadCreationBox` component on submit
    0. `POST /api/projects/:projectID/threads` is called
    0. `receiveThread` is set as the callback

  * `updateThread`
    0. invoked by `OriginalMessage` component if user edits the thread title/description
    0. `PATCH /api/projects/:projectId/thread/:id` is called
    0. `updateThreadInfo` is set as the callback

  * `destroy`
    0. invoked by `MessageThreadContainer` component
    0. `DELETE /api/projects/:projectId/` is called
    0. `destroyThread` is set as the callback


### Thread API Response Actions

  * `receiveThread`
    0. invoked from an API callback
    0. `Thread` store sets the value of `_thread` to the thread, sets `_comments` to the thread's comments, and emits change.

  * `updateThread`
    0. invoked from an API callback
    0. `Thread` store updates the value of `_thread`, changing the affected properties of the `Thread` in the store, and emits change.

  * `destroyThread`
    0. invoked from an API callback
    0. `Thread` store sets the value of `_thread` to an empty object and emits change.

### Comment API Request Actions
<!-- TODO: hash map + linked list?? -->

  * `createComment`
    0. invoked from `MessageContentBox` component on submit
    0. `POST /api/comments` is called
    0. `addComment` is set as the callback

  * `editComment`
    0. invoked from `MessageContentBox` component on submit if used for an existing comment
    0. `PATCH /api/comments/:id` is called
    0. `updateComment` is set as the callback

  * `deleteComment`
    0. invoked from `MessageReply` component when deleting a comment
    0. `DELETE /api/comments/:id`
    0. `removeComment` is set as the callback

### Comment API Response Actions

  * `addComment`
    0. invoked from an API callback
    0. `Thread` store pushes the received comment to the `_comments` array and emits change

    <!-- linear search probably sufficient, larger threads will be paginated later -->

  * `updateComment`
    0. invoked from an API callback
    0. `Thread` store searches `_comments` by ID, updates that value to the received comment, and emits change

  * `removeComment`
    0. invoked from an API callback
    0. `Thread` store searches `_comments` by ID, removes that element, and emits change

### Store Listeners

  * `MessageContentBox` component listens to `Thread` store
  * `MessageThreadContainer` component listens to `Thread` store

## Todo Lists and Todo Items Cycles




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
