var React = require('react');
var currentUserLookups = require('../../mixins/currentUserLookups');

var TodoItemAssignments = React.createClass({

  mixins: [currentUserLookups],

  assignments: function(){
    var assignees;
    var that = this;
    if (this.props.assignments.length > 0){
      assignees = this.props.assignments.map(function(person){
        return <li key={person.id}>{person.name}</li>;
      });
    } else {
      return <div>Unassigned</div>;
    }
    return <ul>{assignees}</ul>;
  },

  render: function() {
    return (
      <div>
        {this.assignments()}
      </div>
    );
  }

});

module.exports = TodoItemAssignments;
