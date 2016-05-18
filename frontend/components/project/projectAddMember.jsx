var React = require('react');
var CurrentUserLookups = require('../../mixins/currentUserLookups');
var UserActions = require('../../actions/userActions');
var ProjectActions = require('../../actions/projectActions');
var ProjectAddMember = React.createClass({

  mixins: [CurrentUserLookups],

  getInitialState: function(){
    return {name: "", same_organization: false};
  },

  handleInput: function(e){
    e.preventDefault();
    this.updateName(e.target.value);
  },

  updateName: function(name){
    var data = {name: name};
    this.setState(data);
    if (this.state.same_organization) {
      data["organization"] = this.props.user.organization;
    }
    data["project_id"] = this.props.project.id;
    UserActions.fetchCurrentUsers(data);
  },

  componentDidMount: function() {
    this.updateName("");
  },

  searchBar: function(){
    return <input type="text" value={this.state.name} className="search"
      onInput={this.handleInput} placeholder="Name"></input>;
  },

  addMember: function(member){
    if (confirm("Add " + member.name + 'to this project?')){
      ProjectActions.addMember({
        project_id: this.props.project.id,
        member_id: member.id
      });
    }
  },

  potentialMembers: function(){
    var that = this;
    if (this.state.currentUsers && this.state.currentUsers.length > 0){
      var members = this.state.currentUsers.map(function(member){
        return (<li onClick={that.addMember.bind(that,member)}
        className="found-member" key={member.id}>{member.name}</li>);
      });
      return <ul className="results group">{members}</ul>;
    } else {
      return <div className="no-members"> No members found</div>;
    }
  },

  render: function() {
    return (
      <div className="add-members">
        <div className="search-members">
          <div className="add-members-header"> Add Project Members</div>
          {this.searchBar()}
        </div>
        {this.potentialMembers()}
      </div>
    );
  }

});

module.exports = ProjectAddMember;
