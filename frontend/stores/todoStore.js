var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var TodoStore = new Store(dispatcher);

var todos = "todos";
var currentTodo = "currentTodo";
var errors = "errors";
var todoKeys = "todoKeys";

TodoStore.save = function(key, value){
  localStorage.setItem(key, JSON.stringify(value));
  localStorage.getItem(key);
};

TodoStore.get = function(key){
  return JSON.parse(localStorage.getItem(key));
};


if (localStorage.getItem(todos) === "undefined" ||
  localStorage.getItem(todos) === null){
  TodoStore.save(todos, []);
}

if (localStorage.getItem(todoKeys) === "undefined"){
  localStorage.setItem(todoKeys, JSON.stringify({}));
  localStorage.getItem(todoKeys);
}

if (localStorage.getItem(currentTodo) === null){
  TodoStore.save(currentTodo, 0);
}

if (localStorage.getItem(errors) === "undefined" ||
  localStorage.getItem(errors) === null){
  TodoStore.save(errors, []);
}

TodoStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case ActionTypes.RECEIVE_TODOS:
      TodoStore.receiveTodos(payload.todos);
      break;
    case ActionTypes.TODO_ERROR:
      TodoStore.handleErrors(payload.errors);
      break;
    case ActionTypes.RECEIVE_TODO:
      TodoStore.receiveTodo(payload.todo);
      break;
    case ActionTypes.DESTROY_TODO:
      TodoStore.removeTodo(payload.todo);
      break;
    case ActionTypes.RECEIVE_PROJECT:
      TodoStore.receiveTodos(payload.project.todo_lists);
      break;
  }
};

TodoStore.receiveTodo = function(todo){
  var todoMapping = TodoStore.get(todoKeys);
  var todoArr = TodoStore.get(todos);
  if (typeof todoMapping[todo.id] !== 'undefined'){
    todoArr[todoMapping[todo.id]] = todo;
  } else  {
    todoMapping[todo.id] = todoArr.push(todo) - 1;
  }
  TodoStore.save(todos, todoArr);
  TodoStore.save(todoKeys, todoMapping);
  TodoStore.__emitChange();
};

TodoStore.handleErrors = function(errs){
  TodoStore.save(errors, errs);
  TodoStore.__emitChange();
};

TodoStore.receiveTodos = function(data){
  var todoMapping = {};
  for (var i = 0; i < data.length; i++) {
    todoMapping[data[i].id] = i;
  }
  TodoStore.save(todoKeys, todoMapping);
  TodoStore.save(todos, data);
  TodoStore.__emitChange();
};

TodoStore.allTodos = function(){
  return TodoStore.get(todos);
};

TodoStore.removeTodo = function(todo){
  var _todos = TodoStore.get(todos);
  var _todoKeys = TodoStore.get(todoKeys);
  _todos.splice(_todoKeys[todo.id], 1);
  TodoStore.receiveTodos(_todos);
};

TodoStore.currentTodo = function(id){
  id = parseInt(id);
  var _todos = TodoStore.get(todos);
  var _todoKeys = TodoStore.get(todoKeys);
  return _todos[_todoKeys[id]];
};

TodoStore.currentItem = function(todoId, id){
  var todo = TodoStore.currentTodo(todoId);
  for (var i = 0; i < todo.todo_items.length; i++) {
    if (todo.todo_items[i].id === parseInt(id))
    return todo.todo_items[i];
  }
};

TodoStore.errors = function(){
  return TodoStore.get(errors);
};

window.TodoStore = TodoStore;

module.exports = TodoStore;
