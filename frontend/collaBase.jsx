var React = require('react');
var ReactDOM = require('react-dom');
var NavBarAuth = require('./components/navBarAuth');
var Modal = require("react-modal");


document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(<NavBarAuth />, document.getElementById('root'));
});
