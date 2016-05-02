var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var UserServerActions = {
  receiveUsers: function(data){
    dispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USERS,
      users: data
    });
  },

  handleErrors: function(data){
    dispatcher.dispatch({
      actionType: ActionTypes.USER_ERROR,
      errors: data
    });
  }
};

module.exports = UserServerActions;
