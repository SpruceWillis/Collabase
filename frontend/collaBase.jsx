var React = require('react');
var ReactDOM = require('react-dom');
var SplashPage = require('./components/splashPage'),
    ProjectLandingPage = require('./components/project/projectLandingPage'),
     NavBar = require('./components/navBar'),
     NewProjectPage = require('./components/project/newProjectPage'),
    //  ProjectTodosPage = require('./components/todos/projectTodosPage'),
     TodoPage = require('./components/todos/todoPage');
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

// <Route path="/users/:userid/projects/:projectid/todos"
//   component={ProjectTodosPage} />

var router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SplashPage}></IndexRoute>
      <Route path="/projects/new" component={NewProjectPage}></Route>
      <Route path="/users/:userid/projects/:projectid"
        component={ProjectLandingPage}></Route>
      <Route path="/users/:userid/projects/:projectid/todos/:todoid"
        component={TodoPage} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(router, document.getElementById('root'));
});
