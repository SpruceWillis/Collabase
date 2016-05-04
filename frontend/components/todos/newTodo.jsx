var React = require('react');
var PropTypes = React.PropTypes;

var NewTodo = React.createClass({

  getInitialState: function() {
    if (this.props.edit){
      return {
        
      }
    } else {
      return {
        title: "",
        description: ""
      };
    }
  },



  render: function() {
    return (
      <div />
    );
  }

});

module.exports = NewTodo;
