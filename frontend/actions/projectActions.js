var projectApiUtil = require('../util/projectApiUtil');

 var ProjectActions= {
  fetchCurrentProject: function(data){
    projectApiUtil.fetchCurrentProject(data);
  },

  updateProject: function(data, cb){
    projectApiUtil.updateProject(data, cb);
  },

  createProject: function(data, cb){
    projectApiUtil.createProject(data, cb);
  },

  destroyProject: function(data, cb){
    projectApiUtil.destroyProject(data, cb);
  },

  addMember: function(data){
    projectApiUtil.addMember(data);
  },

  removeMember: function(data){
    projectApiUtil.removeMember(data);
  }

};

module.exports = ProjectActions;
