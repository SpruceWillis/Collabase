var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/ActionTypes');

module.exports = {
  loginUser: function(user){
    dispatcher.dispatch({
      actionType: ActionTypes.LOGIN_USER,
      user: user,
    });
  },

  handleErrors: function(errors){
    dispatcher.dispatch({
      actionType: ActionTypes.ERROR,
      errors: errors
    })
  },

  logout: function(user){
    dispatcher.dispatch({
      actionType: ActionTypes.LOGOUT
    })
  }
};
