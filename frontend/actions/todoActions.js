var TodoApiUtil = require('../util/todoApiUtil');

var TodoActions = {
  getTodos: function(data, cb){
    TodoApiUtil.getTodos(data, cb);
  },

  getTodo: function(data, cb){
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
  }
};

module.exports = TodoActions;
