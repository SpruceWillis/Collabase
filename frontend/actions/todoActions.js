var TodoApiUtil = require('../util/todoApiUtil');

var TodoActions = {
  getTodoLists: function(data, cb){
    TodoApiUtil.getTodoLists(data, cb);
  },

  getTodoList: function(data, cb){
    TodoApiUtil.getTodoList(data, cb);
  },

  destroyTodoList: function(data, cb){
    TodoApiUtil.destroyTodoList(data, cb);
  },

  createTodoList: function(data, cb){
    TodoApiUtil.createTodoList(data, cb);
  },

  updateTodoList: function(data, cb){
    TodoApiUtil.updateTodoList(data, cb);
  },

  createTodoItem: function(data, cb){
    TodoApiUtil.createTodoItem(data, cb);
  },

  getTodoItem: function(data, cb){
    TodoApiUtil.getTodoItem(data, cb);
  },

  destroyTodoItem: function(data, cb){
    TodoApiUtil.destroyTodoItem(data, cb);
  },

  updateTodoListItems: function(data, cb){
    var todoItems = data.todo.todo_items;
    for (var i = 0; i < todoItems.length; i++) {
      todoItems[i].completed = data.completed[i];
    }
    TodoApiUtil.updateTodoListItems(todoItems, cb);
  }

};

module.exports = TodoActions;
