var projectApiUtil = require('../util/projectApiUtil');

 var ProjectActions= {
  fetchCurrentProject: function(data){
    projectApiUtil.fetchCurrentProject(data);
  },

  updateProject: function(data, cb){
    projectApiUtil.updateProject(data, cb);
  },

  createProject: function(data){
    projectApiUtil.createProject(data);
  },

  destroyProject: function(data){
    projectApiUtil.destroyProject(data);
  },

  removeMember: function(data){
    projectApiUtil.removeMember(data);
  }

};

module.exports = ProjectActions;
