var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ActionTypees = require('../constants/ActionTypes');

var ProjectStore = new Store(dispatcher);

var _project = {};
