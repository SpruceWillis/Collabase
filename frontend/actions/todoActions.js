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
  }
};

module.exports = TodoActions;
