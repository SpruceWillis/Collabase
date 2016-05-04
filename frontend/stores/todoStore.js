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
  }
};

TodoStore.handleErrors = function(errs){
  TodoStore.save(errors, errs);
};

TodoStore.receiveTodos = function(data){
  TodoStore.save(todos, data);
  TodoStore.__emitChange();
};

TodoStore.allTodos = function(){
  return TodoStore.get(todos);
};

TodoStore.currentTodo = function(id){
  var _todos = TodoStore.get(todos);
  for (var i = 0; i < _todos.length; i++){
    if (todos[i].id === id) {
      return _todos[i];
    }
  }
};

TodoStore.errors = function(){
  return TodoStore.get(errors);
};

window.TodoStore = TodoStore;

module.exports = TodoStore;
