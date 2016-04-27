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
    0.  `DELETE /api/projects/:projectId/thread/:id` is called
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
    0. `DELETE /api/comments/:id` is called
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

## Todo-lists and Todo-items Cycles

### Todo-list Actions

* `fetchTodoLists`
  0. invoked by `TodoContainer` component on componentDidMount
  0. `GET /api/projects/:projectId/todos` is called
  0. `receiveTodoLists` is set as the callback

* `fetchTodoList`
  0. invoked by `TodoListContainer` component on componentDidMount
  0. `GET /api/projects/:projectId/todos/:id` is called
  0. `receiveTodoList` is set as the callback

* `createTodoList`
  0. invoked by `AddTodoList` component on submit
  0. `POST /api/projects/:projectId/todos` is called
  0. `receiveTodoList` is set as the callback

* `updateTodoList`
  0. invoked by `EditListDetails` component if user edits the list's title/description
  0. `PATCH /api/projects/:projectId/todos/:id` is called
  0. `updateTodoListInfo` is set as the callback

* `destroyTodoList`
  0. invoked by `TodoListContainer` component
  0. `DELETE /api/projects/:projectId/todos/:id` is called
  0. `destroyTodoList` is set as the callback

### TodoList API Response Actions

  * `receiveTodoList`
    0. invoked from an API callback
    0. `TodoList` store sets the value of `_todoList` to the thread, sets `_todoItems` to the thread's comments, and emits change.

  * `updateTodoList`
    0. invoked from an API callback
    0. `TodoList` store updates the value of `_todoList`, changing the affected properties of the `TodoList` in the store, and emits change.

  * `destroyTodoList`
    0. invoked from an API callback
    0. `TodoList` store sets the value of `_todoList` to an empty object and emits change.

### TodoItem API Request Actions
<!-- TODO: hash map + linked list?? -->

  * `createTodoItem`
    0. invoked from `AddListItem` component on submit
    0. `POST /api/projects/:projectId/todos/:todoId/items` is called
    0. `addTodoItem` is set as the callback

  * `editTodoItem`
    0. invoked from `EditListItem` component on submit if used for an existing comment
    0. `PATCH /api/projects/:projectId/todos/:todoId/items/:id` is called
    0. `updateTodoItem` is set as the callback

  * `deleteTodoItem`
    0. invoked from `EditListItem` component when deleting a comment
    0. `DELETE /api/projects/:projectId/todos/:todoId/items/:id` is called
    0. `removeTodoItem` is set as the callback

### TodoItem API Response Actions

  * `addTodoItem`
    0. invoked from an API callback
    0. `TodoList` store pushes the received comment to the `_todoItems` array and emits change

    <!-- linear search probably sufficient, larger threads will be paginated later -->

  * `updateTodoItem`
    0. invoked from an API callback
    0. `TodoList` store searches `_todoItems` by ID, updates that value to the received comment, and emits change

  * `removeTodoItem`
    0. invoked from an API callback
    0. `TodoList` store searches `_todoItems` by ID, removes that element, and emits change

### Store Listeners

  * `TodoContainer` listens to the `TodoList` store
  * `TodoListContainer` listens to the `TodoList` store

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
