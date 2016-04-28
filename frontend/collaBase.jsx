var React = require('react');
var ReactDOM = require('react-dom');
var SplashPage = require('./components/splashPage');
var Modal = require("react-modal");
var Router = require('react-router'),
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    hashHistory = require('react-router').hashHistory;


document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(<SplashPage />, document.getElementById('root'));
});
