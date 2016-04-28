var SessionApiUtil = require('../util/sessionApiUtil');

module.exports = {
  getUser: function(user, url){
    SessionApiUtil.getUser({
      user: user,
      method: "POST",
      url: url
    });
  },



  fetchCurrentUser: function(){
    SessionApiUtil.fetchCurrentUser();
  },

  logout: function(){
    SessionApiUtil.logout();
  }
}
