var projectApiUtil = require('../util/projectApiUtil');

 var ProjectActions= {
  fetchCurrentProject: function(data){
    projectApiUtil.fetchCurrentProject(data);
  },

  updateProject: function(data){
    projectApiUtil.updateProject(data);
  },

  createProject: function(data){
    projectApiUtil.createProject(data);
  },

  destroyProject: function(data){
    projectApiUtil.destroyProject(data);
  },


};

window.ProjectActions = ProjectActions;

module.exports = ProjectActions;
