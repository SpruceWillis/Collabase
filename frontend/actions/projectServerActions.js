var dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');

module.exports = {
  receiveProject: function(response){
    dispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT,
      project: response
    });
  }
};
