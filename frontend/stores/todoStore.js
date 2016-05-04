var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var TodoStore = new Store(dispatcher);

var todos = "todos";
var currentTodo = "currentTodo";
var errors = "errors";


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
  }
};

TodoStore.receiveTodo = function(todo){
  var found = false;
  var _todos = TodoStore.get(todos);
  for (var i = 0; i < _todos.length; i++){
    if (_todos[i].id === todo.id){
      _todos[i] = todo;
      found = true;
      break;
    }
  }
  if (!found){
    _todos.push(todo);
  }
  TodoStore.save(_todos);
  TodoStore.__emitChange();
};

TodoStore.handleErrors = function(errs){
  TodoStore.save(errors, errs);
  TodoStore.__emitChange();
};

TodoStore.receiveTodos = function(data){
  TodoStore.save(todos, data);
  TodoStore.__emitChange();
};

TodoStore.allTodos = function(){
  return TodoStore.get(todos);
};

TodoStore.currentTodo = function(id){
  id = parseInt(id);
  var _todos = TodoStore.get(todos);
  for (var i = 0; i < _todos.length; i++){
    if (_todos[i].id === id) {
      return _todos[i];
    }
  }
};

TodoStore.errors = function(){
  return TodoStore.get(errors);
};

module.exports = TodoStore;
