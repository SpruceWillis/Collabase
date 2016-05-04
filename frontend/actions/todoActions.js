var TodoApiUtil = require('../util/todoApiUtil');

var TodoActions = {
  getTodos: function(data, cb){
    TodoApiUtil.getTodos(data, cb);
  },

  createTodoList: function(data, cb){
    TodoApiUtil.createTodo(data, cb);
  },

  updateTodoList: function(data, cb){
    TodoApiUtil.updateTodo(data, cb);
  }
};

module.exports = TodoActions;
