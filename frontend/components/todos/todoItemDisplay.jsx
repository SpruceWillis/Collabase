var React = require('react');
var PropTypes = React.PropTypes;

var TodoItemDisplay = React.createClass({

  getInitialState: function() {
    return {
      edit: false
    };
  },



  render: function() {
    return (
      <div>{this.props.todoItem.title}</div>
    );
  }

});

module.exports = TodoItemDisplay;
