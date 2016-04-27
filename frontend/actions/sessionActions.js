var SessionApiUtil = require('../util/sessionApiUtil');

module.exports = {
  createUser: function(user){
    SessionApiUtil.createUser(user);
  }
}
