var React = require('react');
var ProjectActions  = require('../../actions/projectActions');
var CurrentProjectState = require('../../mixins/currentProjectState');
var ProjectAddMember = require('./projectAddMember');
var history = require('react-router').hashHistory;

var ProjectHeader = React.createClass({

  getInitialState: function(){
    return ({
      edit: false,
      title: this.props.project.title,
      description: this.props.project.description,
      project_id: this.props.project.id,
    });
  },

  toggleEdit: function(){
    if (this.state.edit){
      this.setState({edit: false});
    } else {
      this.setState({edit: true});
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      title: nextProps.project.title,
      description: nextProps.project.description,
      project_id: nextProps.project.id,
      edit: false
    });
  },

  componentDidMount: function() {

    this.setState({edit: false});
  },

  // componentWillUnmount: function() {
  //   window.removeEventListener("beforeunload", this.confirmPageLeaving.bind(this));
  // },

  saveChanges: function(e){
    e.preventDefault();
    ProjectActions.updateProject(this.state, this.saveAlert);
  },

  // confirmPageLeaving: function(){
  //   debugger;
  //   if (this.state.edit){
  //     return "Are you sure you want to continue? Any unsaved changes will be lost.";
  //   } else {
  //     return;
  //   }
  // },

  saveAlert: function(){
    alert('Changes successfully saved');
    this.toggleEdit();
  },

  linkState: function(e){
    var newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  discardChanges: function(e){
    e.preventDefault();
    if (confirm('Are you sure you want to discard changes?')){
      this.toggleEdit(false);
    }
  },

  removeMember: function(member){
    if (confirm('Are you sure you want to remove ' + member.name
    + ' from this project?' )){
      ProjectActions.removeMember({
        project_id: this.props.project.id,
        member_id: member.id
      });
    }
  },

  success: function(){
    if (this.state.success){
      return <h3> Changes successfully saved</h3>;
    } else {
      return;
    }
  },

  destroyProject: function(){
    if (confirm("Are you sure you want to delete this project?")){
      ProjectActions.destroyProject({project_id: this.props.project.id},
      this.redirectOnDeletion);
    }
  },

  redirectOnDeletion: function(project){
    var nextId = -1;
    for (var i = 0; i < this.props.user.projects.length; i++){
      if (this.props.user.projects[i].id !== project.id){
        nextId = this.props.user.projects[i].id;
        break;
      }
    }
    if (nextId >= 0){
      history.push('/users/' + this.props.user.id + '/projects/' + nextId);
    } else {
      history.push('/projects/new');
    }
  },

  members: function(){
    var that = this;
    var memberInfo = this.props.project.members.map(function(member){
        if (that.state.edit
          && member.id !== that.props.project.owner_id
          && member.id !== that.props.user.id){
          return <li onClick={that.removeMember.bind(that, member)}
             className="member-list-item-edit group" key={member.id}>
            <div className="member-list-name">{member.name}</div>
            <button className="member-list-remove">X</button>
          </li>;
      } else {
        return <li className="member-list-item group" key={member.id}>{member.name}</li>;
      }
    });
    return (<div>
      <h2 className="project-member-header">Members</h2>
      <ul className="project-member-list group">{memberInfo}</ul>
    </div>);
  },


  titleBlock: function(){

    if (this.state.edit){
      return(
        <div>
          <div className="edit-project-header">Editing Project</div>
          <form id="editProjectForm" onSubmit={this.saveChanges}>
            <input type="text" value={this.state.title}
              onChange={this.linkState} placeholder="Title"
              maxLength="40" className="edit-project-title" id="title"/>
            <input maxLength="100" type="text" value={this.state.description}
              onChange={this.linkState} placeholder="Description"
              className="edit-project-description" id="description" />
          </form>
          <div>
          {this.members()}
          <ProjectAddMember project={this.props.project} user={this.props.user}/>
          </div>
          <div className="edit-project-options">
            <button className="save-project-button"
              type="submit" form="editProjectForm">Save</button>
            <button className="nosave-project-button"
              onClick={this.discardChanges}>Discard Changes</button>
            <button className="done-project-button"
              onClick={this.toggleEdit.bind(this, false)}>Done</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="project-innerheader">
          <div>
            <button className="edit-project-button"
              onClick={this.toggleEdit}>Edit</button>
            <button className="delete-project-button"
              onClick={this.destroyProject}>Delete</button>
          </div>
          <h1 className="project-title">{this.props.project.title}</h1>
          <h2 className="project-description">{this.props.project.description}</h2>
          {this.members()}
        </div>
      );
    }
  },

  render: function() {
    return (
      <div className="project-header">
        {this.success()}
        {this.titleBlock()}
      </div>
    );
  }

});

module.exports = ProjectHeader;
