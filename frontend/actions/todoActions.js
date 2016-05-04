var TodoApiUtil = require('../util/todoApiUtil');

var TodoActions = {
  getTodos: function(data, cb){
    TodoApiUtil.getTodos(data, cb);
  }
};

module.exports = TodoActions;
