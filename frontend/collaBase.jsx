var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./components/navBar');
var Modal = require("react-modal");


document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(<NavBar />, document.getElementById('root'));
});
