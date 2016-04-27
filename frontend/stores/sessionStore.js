var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/ActionTypes');

var sessionStore = new Store(dispatcher);

var _user = {};
var _errors = {};

sessionStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case ActionTypes.LOGIN_USER:
      sessionStore.loginUser(payload.errors, payload.user);
  }
};

sessionStore.loginUser = function(errors, user){
  if (errors){
    _errors = {errors: errors};
  } else if (user) {
    _user = user; 
  }
}
