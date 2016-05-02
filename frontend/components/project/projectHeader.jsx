var React = require('react');
var ProjectActions  = require('../../actions/projectActions');
var CurrentProjectState = require('../../mixins/currentProjectState');
var ProjectAddMember = require('./projectAddMember');
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
    debugger;
    this.setState({
      title: nextProps.project.title,
      description: nextProps.project.description,
      project_id: nextProps.project.id,
    });
  },

  saveChanges: function(e){
    e.preventDefault();
    ProjectActions.updateProject(this.state, this.saveAlert);

  },

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

  members: function(){
    var that = this;
    var memberInfo = this.props.project.members.map(function(member){
        if (that.state.edit
          && member.id !== that.props.project.owner_id
          && member.id !== that.props.user.id){
          return <li key={member.id}>
            {member.name}
            <button onClick={that.removeMember.bind(that, member)}>X</button>
          </li>;
      } else {
        return <li key={member.id}>{member.name}</li>;
      }
    });
    return (<div>
      <h2>Members</h2>
      <ul>{memberInfo}</ul>
    </div>);
  },


  titleBlock: function(){

    if (this.state.edit){
      return(
        <div>
          <form id="editProjectForm" onSubmit={this.saveChanges}>
            <label>Project Title
            <input type="text" value={this.state.title}
              onChange={this.linkState} id="title"/>
            </label>
            <label>Project Description
            <input type="text" value={this.state.description}
              onChange={this.linkState} id="description" />
            </label>
          </form>
          <div>
          {this.members()}
          <ProjectAddMember project={this.props.project} user={this.props.user}/>
          </div>
          <div>
            <button type="submit" form="editProjectForm">Save</button>
            <button onClick={this.discardChanges}>Discard Changes</button>
            <button onClick={this.toggleEdit.bind(this, false)}>Done</button>

          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleEdit}>Edit</button>
          <h1>{this.props.project.title}</h1>
          <h1>{this.props.project.description}</h1>
          {this.members()}
        </div>
      );
    }
  },

  render: function() {
    return (
      <div>
        {this.success()}
        {this.titleBlock()}

      </div>
    );
  }

});

module.exports = ProjectHeader;
