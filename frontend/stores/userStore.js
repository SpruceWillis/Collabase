var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

if (localStorage.getItem('users') === "undefined"
  || localStorage.getItem('users') === null){
  var _users = [];
  localStorage.setItem('users', JSON.stringify([]));
  localStorage.getItem('users');
} else {
  _users = JSON.parse(localStorage.getItem('users'));
}

var _errors = [];

var UserStore = new Store(dispatcher);

UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case (ActionTypes.RECEIVE_USERS):
      UserStore.receiveUsers(payload.users);
      break;
    case (ActionTypes.USER_ERROR):
      UserStore.handleErrors(payload.errors);
      break;
    case (ActionTypes.CLEAR_USERS):
      UserStore.clear();
      break;
  }
};

UserStore.receiveUsers = function(users){
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.getItem('users');
  UserStore.__emitChange();
};

UserStore.handleErrors = function(errors){
  _errors = errors;
};


UserStore.currentUsers = function(){
  if (localStorage.getItem('users') === "undefined"){
    return [];
  } else {
    return (JSON.parse(localStorage.getItem('users')));
  }
};

UserStore.errors = function(){
  return [].slice.call(_errors);
};

UserStore.clear = function(){
  localStorage.setItem('users', JSON.stringify([]));
  localStorage.getItem('users');
  _errors = [];
  UserStore.__emitChange();
};


window.UserStore = UserStore;

module.exports = UserStore;
