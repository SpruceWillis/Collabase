var TodoServerActions = require('../actions/todoServerActions');

var TodoApiUtil = {
  getTodos: function(data, cb){
    $.ajax({
      url: '/api/projects/' + data.projectid + '/todo_lists',
      method: 'GET',
      success: function(response){
        TodoServerActions.receiveTodos(response, cb);
      },
      failure: function(errors){
        TodoServerActions.handleErrors(errors);
      }
    });
  },

  createTodoList: function(data, cb){
    debugger;
    $.ajax({
      url: '/api/projects/' + data.projectid + '/todo_lists',
      method: 'POST',
      data: {todo_list: data},
      success: function(response){
        TodoServerActions.receiveTodo(response, cb);
      },
      failure: function(errors){
        TodoServerActions.handleErrors(errors);
      }
    });
  }
};

module.exports = TodoApiUtil;
