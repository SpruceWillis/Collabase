var projectServerActions = require('../actions/projectServerActions');
var SessionStore = require('../stores/sessionStore');

function currentUser(){
  return SessionStore.currentUser();
}

var ProjectApiUtil = {
  fetchCurrentProject: function(data){
    $.ajax({
      url: '/api/projects/' + data.project_id,
      method: "GET",
      success: function(response){
        projectServerActions.receiveProject(response);
      },
      failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.errors);
      }
    });
  },

  createProject: function(data){
    $.ajax({
      url: '/api/projects',
      data: {project: data},
      method: "POST",
      success: function(response){
        projectServerActions.receiveProject(response);
      }, failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.console.errors);
      }
    });
  },

  updateProject: function(data, cb){
    $.ajax({
      url: '/api/projects/' + data.project_id,
      data: {project: data},
      method: "PATCH",
      success: function(response){
        projectServerActions.receiveProject(response, cb);
      },
      failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.errors);
      }
    });
  },

  destroyProject: function(data){
    $.ajax({
      url: '/api/projects/' + data.project_id,
      method: "DELETE",
      success: function(response){
        projectServerActions.destroyProject();
      }, failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.errors);
      }
    });
  },

  addMember: function(data){
    $.ajax({
      url: '/api/project_memberships',
      method: 'POST',
      data: {project_membership: data},
      success: function(response){
        projectServerActions.receiveProject(response);
      }, failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.errors);
      }
    })
  },

  removeMember: function(data){
    $.ajax({
      url: '/api/project_memberships',
      method: "DELETE",
      data: {project_membership: data},
      success: function(response){
        projectServerActions.receiveProject(response);
      }, failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.errors);
      }
    });
  },




};

module.exports = ProjectApiUtil;
