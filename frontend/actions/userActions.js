var UserApiUtil = require('../util/userApiUtil');
var dispatcher = require('../dispatcher/dispatcher');
var UserServerActions = require('../actions/userServerActions');
var ActionTypes = require('../constants/actionTypes');

var UserActions = {
  fetchCurrentUsers: function(params){
    if (params.name.length > 0){
      UserApiUtil.receiveUsers(params, function(data){
        UserServerActions.receiveUsers(data);
      });
    } else {
      UserActions.clearUsers();
    }
  },

  clearUsers: function(){
    dispatcher.dispatch({
      actionType: ActionTypes.CLEAR_USERS
    });
  }
};

module.exports = UserActions;
