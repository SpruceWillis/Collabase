var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var TodoServerActions = {
  receiveTodos: function(data, cb){
    if (typeof cb !== 'undefined'){
      cb(data);
    }
    dispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_TODOS,
      todos: data
    });
  },

  handleErrors: function(errors){
    dispatcher.dispatch({
      actionType: ActionTypes.TODO_ERROR,
      errors: errors
    })
  }
};

module.exports = TodoServerActions;
