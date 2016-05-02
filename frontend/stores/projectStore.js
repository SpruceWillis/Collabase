var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

var ProjectStore = new Store(dispatcher);
if (localStorage.getItem('currentProject') === "undefined"){
  var _project = {};
  localStorage.setItem('currentProject', JSON.stringify({}));
  localStorage.getItem('currentProject');
} else {
  _project = JSON.parse(localStorage.getItem('currentProject'));
}

var _errors = [];

ProjectStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case ActionTypes.RECEIVE_PROJECT:
      ProjectStore.receiveProject(payload.project);
      break;
    case ActionTypes.LOGOUT:
      ProjectStore.logout();
      break;
    case ActionTypes.PROJECT_ERROR:
      ProjectStore.handleErrors(payload.errors);
      break;
    case ActionTypes.DESTROY_PROJECT:
      ProjectStore.logout();
      break;
    default:

  }
};

ProjectStore.receiveProject = function(project){
  _project = project;
  localStorage.setItem('currentProject', JSON.stringify(project));
  localStorage.getItem('currentProject');
  _errors = [];
  ProjectStore.__emitChange();
};

ProjectStore.currentProject = function(){
  if (localStorage.getItem('currentProject') === "undefined"){
    return {};
  } else {
    return (JSON.parse(localStorage.getItem('currentProject')));
  }
};

ProjectStore.errors = function(){
  return [].slice.call(_errors);
};

ProjectStore.handleErrors = function(errors){
  _project = {};
  localStorage.setItem('currentProject', JSON.stringify({}));
  localStorage.getItem('currentProject');
  _errors = errors;
};

ProjectStore.logout = function(){
  _project = {};
  localStorage.setItem('currentProject', JSON.stringify({}));
  _errors = [];
};

ProjectStore.errors = function () {

  return [].slice.call(_errors);
};

module.exports = ProjectStore;
