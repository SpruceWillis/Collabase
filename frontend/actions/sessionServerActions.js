var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/ActionTypes');

module.exports = {
  loginUser: function(user){
    dispatcher.dispatch({
      actionType: ActionTypes.LOGIN_USER,
      user: user.user,
      errors: user.errors
    });
  }
};
