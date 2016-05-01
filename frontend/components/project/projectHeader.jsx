var React = require('react');
var ProjectActions  = require('../../actions/ProjectActions');
var CurrentProjectState = require('../../mixins/currentProjectState');

var ProjectHeader = React.createClass({

  getInitialState: function(){
    return ({
      edit: false,
      title: this.props.project.title,
      description: this.props.project.description,
      project_id: this.props.project.id
    });
  },

  toggleEdit: function(){
    this.setState({
      edit: !this.state.edit
    });
  },

  // componentWillMount: function() {
  //   this.setState({title: this.props.currentProject.title,
  // description: this.state.currentProject.description});
  // },

  componentWillReceiveProps: function(nextProps){
      this.setState({edit: false});
  },

  saveChanges: function(e){
    e.preventDefault();
    ProjectActions.updateProject(this.state);
  },

  linkState: function(e){
    var newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  discardChanges: function(e){
    e.preventDefault();
    if (confirm('Are you sure you want to discard changes?')){
      this.toggleEdit(e);
    }
  },

  members: function(){
    var memberInfo = this.props.project.members.map(function(member){
      return <li>{member.name}</li>;
    });
    return <ul>{memberInfo}</ul>
  },

  titleBlock: function(){
    if (this.state.edit){
      return(
        <div>
          <input type="text" value={this.state.title}
            onChange={this.linkState} id="title"/>
          <input type="text" value={this.state.description}
            onChange={this.linkState} id="description" />
            <h2>Members</h2>
            {this.members()}
          <button onClick={this.saveChanges}>Save</button>
          <button onClick={this.discardChanges}>Discard Changes</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.toggleEdit}>Edit</button>
          <h1>{this.props.project.title}</h1>
          <h1>{this.props.project.description}</h1>
          <h2>Members</h2>
          {this.members()}
        </div>
      );
    }
  },

  render: function() {
    return (
      <div>
          {this.titleBlock()}
      </div>
    );
  }

});

module.exports = ProjectHeader;
