var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

module.exports = {
  receiveProject: function(response, cb){
    if (typeof cb !== "undefined"){
      cb(response);
    }
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

  destroyProject: function(response, cb){
    if(typeof cb !== "undefined"){
      cb(response);
    }
    dispatcher.dispatch({
      actionType: ActionTypes.DESTROY_PROJECT,
      project: response
    });
  },

  receiveProjectAndUpdateUser: function(response, cb){
    if (typeof cb !== "undefined"){
      cb(response);
    }
    dispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT_AND_UDPATE,
      project: response
    });
  }
};
