var projectServerActions = require('../actions/projectServerActions');

module.exports = {
  fetchCurrentProject: function(data){
    $.ajax({
      url: '/api/projects/' + data.project_id,
      data: {user_id: data.user_id},
      method: "GET",
      success: function(response){
        projectServerActions.receiveProject(response);
      },
      failure: function(response){
        projectServerActions.handleErrors(response.responseJSON.errors);
      }
    });
  }
};
