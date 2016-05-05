var React = require('react');
var NavBar = require('../navBar'),
    ProjectHeader = require('./projectHeader'),
    ProjectTodosContainer = require('../todos/projectTodosContainer');
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

  // projectNavigation: function(){
  //   if (this.hasProject()){
  //     return (
  //       <ProjectNavigation project={this.state.currentProject}
  //         user={this.state.currentUser} />
  //     );
  //   } else {
  //     return;
  //   }
  // },

  hasProject: function(){
    return !($.isEmptyObject(this.state.currentProject));
  },

  // {this.projectNavigation()}
  render: function() {
    return (
      <div className="background">
        <NavBar />
        {this.project()}
        <ProjectTodosContainer params={this.props.params}/>
      </div>
    );
  }

});


module.exports = ProjectLandingPage;
