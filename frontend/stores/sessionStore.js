var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/ActionTypes');

var SessionStore = new Store(dispatcher);

var _user = {};
var _errors = [];

SessionStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case ActionTypes.LOGIN_USER:
      SessionStore.loginUser(payload.user);
      break;
    case ActionTypes.ERROR:
      SessionStore.handleErrors(payload.errors)
      break;
    case ActionTypes.LOGOUT:
      SessionStore.logout();
      break;
  }
};

SessionStore.loginUser = function(user){
  _user = user;
  _errors = [];
  SessionStore.__emitChange();
};

SessionStore.handleErrors = function(errors){
  _user = {};
  _errors = errors;
  SessionStore.__emitChange();
};

SessionStore.logout = function(){
  _user = {};
  _errors = [];
}

SessionStore.currentUser = function(){
  console.log(_user);
  return Object.assign({}, _user);
};

SessionStore.errors = function () {
  console.log(_errors);
  return [].slice.call(_errors);
}

module.exports = SessionStore;
