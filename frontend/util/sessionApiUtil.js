var SessionServerActions = require('../actions/sessionServerActions');

var handleErrors = function(error){
  SessionServerActions.handleErrors(error.responseJSON.errors);

}

module.exports = {
  // getUser: function(data){
  getUser: function(data){
    
    $.ajax({
      url: data.url,
      method: data.method,
      data: {user: data.user},
      success: function(data){
        SessionServerActions.loginUser(data.user);
      },
      error: function(error){
        debugger
        SessionServerActions.handleErrors(error.responseJSON.errors);
      }
    })
  },

  fetchCurrentUser: function(){
    $.ajax({
			url: '/api/session',
			method: 'get',
			success: function(data){
        SessionServerActions.loginUser(data.user);
		  },
      error: function(error){
        SessionServerActions.handleErrors(error.responseJSON.errors);
      }
    });
  },

  logout: function(){
    $.ajax({
      url: '/api/session',
      method: "DELETE",
      success: function(user){
        SessionServerActions.logout();
      },
      error: function(error){
        SessionServerActions.handleErrors(error.responseJSON.errors);
      }
    })
  }

};
