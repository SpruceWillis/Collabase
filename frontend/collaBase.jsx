var React = require('react');
var ReactDOM = require('react-dom');
var SplashPage = require('./components/splashPage');
var NavBar = require('./components/navBar');
var Modal = require("react-modal");
var ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;


var App = React.createClass({
  render: function() {
    return (
      <div id="App">
        {this.props.children}
      </div>
    );
  }
});
// <NavBar />
// <IndexRoute component={SplashPage}></IndexRoute>

var router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SplashPage}></IndexRoute>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  // debugger;
  Modal.setAppElement(document.body);
  ReactDOM.render(router, document.getElementById('root'));
});
