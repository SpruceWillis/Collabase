var React = require('react');
var NavBar = require('../navBar'),
    ProjectHeader = require('./projectHeader');
var CurrentUserState = require('../../mixins/currentUserState');
var CurrentProjectState = require('../../mixins/currentProjectState');

var ProjectLandingPage = React.createClass({

  mixins: [CurrentUserState, CurrentProjectState],

  componentWillMount: function() {
    this.redirectUnlessLoggedIn();
  },

  project: function(){
    if (this.hasProject()){
      return (<div>
        <ProjectHeader project={this.state.currentProject}
          user={this.state.currentUser}/>
      </div>);
    } else {
      return (<div>Loading...</div>);
    }
  },

  hasProject: function(){
    return !($.isEmptyObject(this.state.currentProject));
  },

  render: function() {
    return (
      <div>
        <NavBar />
        {this.project()}
      </div>
    );
  }

});


module.exports = ProjectLandingPage;
