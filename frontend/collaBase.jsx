var React = require('react');
var ReactDOM = require('react-dom');
var SplashPage = require('./components/splashPage');
var Modal = require("react-modal");


document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(<SplashPage />, document.getElementById('root'));
});
