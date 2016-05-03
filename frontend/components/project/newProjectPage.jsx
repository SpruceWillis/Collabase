var React = require('react');
var NavBar = require('../navBar');
var history = require('react-router').hashHistory;
var ProjectActions = require('../../actions/projectActions');

var NewProjectPage = React.createClass({

  getInitialState: function() {
    return {
      title: "",
      description: ""
    };
  },

  handleSubmit: function(e){
    e.preventDefault();
    ProjectActions.createProject(this.state, this.redirectToProject);
  },

  redirectToProject: function(response){
    history.push('users/' + response.owner_id + '/projects/' + response.id);
    alert('Project successfully created');
  },

  updateTitle: function(e){
    e.preventDefault();
    this.setState({title: e.target.value});
  },

  updateDescription: function(e){
    e.preventDefault();
    this.setState({description: e.target.value});
  },

  projectForm: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="newProjectForm">
          <label>Title
            <input  type="text" onChange={this.updateTitle} value={this.state.title}></input>
          </label>
          <label>Description
            <input type="text" onChange={this.updateDescription} value={this.state.description}></input>
          </label>
          <div>
            <button type="submit" form="newProjectForm">Create Project</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>);
  },

  cancel: function(){
    if (confirm("Are you sure you want to leave this page?" +
    "Any information you have will be lost.")){
      history.goBack();
    }
  },

  render: function() {
    return (
      <div>
        <NavBar />
        {this.projectForm()}
        <div>You'll get the chance to add additional members later.</div>
      </div>

    );
  }

});

module.exports = NewProjectPage;
