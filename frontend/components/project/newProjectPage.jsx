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
    if (this.state.title !== "" && this.state.description !== ""){
      ProjectActions.createProject(this.state, this.redirectToProject);
    }
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
      <div className="project-header">
        <form onSubmit={this.handleSubmit} id="editProjectForm">
            <input  type="text" onChange={this.updateTitle} placeholder="Title"
              className="edit-project-title" value={this.state.title} required></input>
            <input type="text" onChange={this.updateDescription}
              className="edit-project-description" placeholder="Description"
               value={this.state.description} required></input>
            <div className="new-project-buttons">
              <button className="create-project-button"
                type="submit" form="editProjectForm">Create Project</button>
              <button className="cancel-project-button"
                onClick={this.cancel}>Cancel</button>
          </div>
          <div className="new-member-clause">
            You'll get the chance to add additional members later.
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
      <div className="background">
        <NavBar />
          {this.projectForm()}
      </div>

    );
  }

});

module.exports = NewProjectPage;
