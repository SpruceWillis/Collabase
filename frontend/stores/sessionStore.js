var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var SessionStore = new Store(dispatcher);

if (localStorage.getItem('currentUser') === "undefined"){
  var _user = {};
  localStorage.setItem('currentUser', JSON.stringify({}));
  localStorage.getItem('currentUser');
} else {
  _user = JSON.parse(localStorage.getItem('currentUser'));
}
var _errors = [];

SessionStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case ActionTypes.LOGIN_USER:
      SessionStore.loginUser(payload.user);
      break;
    case ActionTypes.ERROR:
      SessionStore.handleErrors(payload.errors);
      break;
    case ActionTypes.LOGOUT:
      SessionStore.logout();
      break;
  }
};

SessionStore.loginUser = function(user){

  _user = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.getItem('currentUser');
  _errors = [];
  SessionStore.__emitChange();
};

SessionStore.handleErrors = function(errors){
  _user = {};
  localStorage.setItem('currentUser', JSON.stringify({}));
  _errors = errors || [];
  SessionStore.__emitChange();
};

SessionStore.logout = function(){
  _user = {};
  localStorage.setItem('currentUser', JSON.stringify({}));
  _errors = [];
  SessionStore.__emitChange();

};

SessionStore.currentUser = function(){
  if (localStorage.getItem('currentUser') === "undefined"){
    return {};
  } else {
    return (JSON.parse(localStorage.getItem('currentUser')));
  }
};

SessionStore.errors = function () {

  return [].slice.call(_errors);
};

module.exports = SessionStore;
