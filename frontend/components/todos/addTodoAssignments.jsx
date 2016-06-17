var React = require('react');
var currentUserLookups = require('../stores/currentUserLookups');

var addTodoAssignments = React.createClass({

  mixins: [currentUserLookups],

  getInitialState: function() {
    return {
      name: "", same_project: true, exclude: this.props.toExclude
    };
  },

  render: function() {
    return (
      <div />
    );
  }

});

module.exports = addTodoAssignments;
