var React = require('react');
var NavBar = require('../navBar'),
    ProjectHeader = require('./projectHeader'),
    ProjectTodosContainer = require('../todos/projectTodosContainer'),
    EditTodo = require('../todos/editTodo');
var CurrentUserState = require('../../mixins/currentUserState');
var CurrentProjectState = require('../../mixins/currentProjectState');

var ProjectLandingPage = React.createClass({

  mixins: [CurrentUserState, CurrentProjectState],

  getInitialState: function() {
    return {
      showEdit: false
    };
  },

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

  newTodoList: function(){
    if (this.state.showEdit){
      return (
        <div>
          <div>Add a Todo</div>
          <EditTodo userid={this.props.params.userid} new={true}
            project={this.props.params.projectid} cancel={this.hideNewTodo} />
      </div>);
    } else {
      return (<div onClick={this.showNewTodo}>
        <button >+</button>
        <div>Add New Todo</div>
      </div>);
    }
  },

  showNewTodo: function(){
    this.setState({showEdit: true});
  },

  hideNewTodo: function(){
    this.setState({showEdit: false});
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
        {this.newTodoList()}
        <ProjectTodosContainer params={this.props.params}/>
      </div>
    );
  }

});


module.exports = ProjectLandingPage;
