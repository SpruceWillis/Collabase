var React = require('react');
var NavBar = require('../navBar'),
    ProjectHeader = require('./projectHeader'),
    ProjectNavigation = require('./ProjectNavigation');
var CurrentUserState = require('../../mixins/currentUserState');
var CurrentProjectState = require('../../mixins/currentProjectState');

var ProjectLandingPage = React.createClass({

  mixins: [CurrentUserState, CurrentProjectState],

  componentWillMount: function() {
    this.redirectUnlessLoggedIn();
  },

  project: function(){
    if (this.hasProject()){
      return (
        <ProjectHeader project={this.state.currentProject}
          user={this.state.currentUser}/>);
    } else {
      return (<div>Loading...</div>);
    }
  },

  projectNavigation: function(){
    if (this.hasProject()){
      return (
        <ProjectNavigation project={this.state.currentProject}
          user={this.state.currentUser} />
      );
    } else {
      return;
    }
  },

  hasProject: function(){
    return !($.isEmptyObject(this.state.currentProject));
  },

  render: function() {
    return (
      <div className="background">
        <NavBar />
        {this.project()}
        {this.projectNavigation()}

      </div>
    );
  }

});


module.exports = ProjectLandingPage;
