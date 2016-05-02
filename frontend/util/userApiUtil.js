var UserServerActions = require('../actions/userServerActions');

var UserApiUtil = {
  receiveUsers: function(data, cb){
    $.ajax({
      url: '/api/users',
      method: 'GET',
      data: {search_params: data},
      success: function(response){
        cb(response);
      },
      failure: function(response){
        UserServerActions.handleErrors(response);
      }
    });
  }
};

module.exports = UserApiUtil;
