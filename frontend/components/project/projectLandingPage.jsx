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
          user={this.state.currentUser} hide={this.hideNewTodo}
          show={this.showNewTodo}/>
      );
    } else {
      return (<div>Loading...</div>);
    }
  },

  newTodoList: function(){
    if (this.state.showEdit){
      return (
        <div className="">
          <EditTodo userid={this.props.params.userid} new={true}
            project={this.props.params.projectid} cancel={this.hideNewTodo} />
      </div>);
    } else {
      return (<div onClick={this.showNewTodo} className="new-todolist-header">
        <button className="btn-new-todolist">+</button>
        <div className="txt-new-todolist">Your Todo Lists</div>
      </div>);
    }
  },

  showNewTodo: function(){
    this.setState({showEdit: true});
  },

  hideNewTodo: function(){
    this.setState({showEdit: false});
  },


  hasProject: function(){
    return !($.isEmptyObject(this.state.currentProject));
  },

  render: function() {
    return (
      <div className="background">
        <NavBar />
        <div className="pagediv group">
          <div className="project-info-div group">
            {this.project()}
          </div>
          <div className="project-todo-div">
            {this.newTodoList()}
            <ProjectTodosContainer params={this.props.params}/>
          </div>
        </div>
      </div>
    );
  }

});


module.exports = ProjectLandingPage;
