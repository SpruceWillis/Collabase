var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

module.exports = {
  receiveProject: function(response){
    dispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT,
      project: response
    });
  },

  handleErrors: function(response){
    dispatcher.dispatch({
      actionType: ActionTypes.PROJECT_ERROR,
      errors: response
    });
  },

  destroyProject: function(response){
    dispatcher.dispatch({
      actionType: ActionTypes.DESTROY_PROJECT,
    });
  }
};
