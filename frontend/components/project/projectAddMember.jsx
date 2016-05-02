var React = require('react');
var CurrentUserLookups = require('../../mixins/currentUserLookups');
var UserActions = require('../../actions/userActions');
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
    return <input type="text" value={this.state.name}
      onInput={this.handleInput} ></input>;
  },

  autoComplete: function(value){
    this.updateName(value);
  },

  potentialMembers: function(){
    var that = this;
    var members = this.state.currentUsers.map(function(member){
      return <li key={member.id} onClick=
        {that.autoComplete.bind(that,member.name)}>{member.name}</li>
    });
    return <ul>{members}</ul>;
  },

  render: function() {
    return (
      <div >
        {this.searchBar()}
        {this.potentialMembers()}
      </div>
    );
  }

});

module.exports = ProjectAddMember;
