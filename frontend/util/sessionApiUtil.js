var SessionServerActions = require('../actions/sessionServerActions');

module.exports = {
  createUser: function(user){
    $.ajax({
      url: '/api/users',
      method: "POST",
      data: {user: user},
      success: function(user){
        SessionServerActions.loginUser(user);
      }
    })
  }
}
