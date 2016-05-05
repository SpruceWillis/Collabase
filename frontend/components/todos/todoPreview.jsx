var React = require('react');
var history = require('react-router').hashHistory;

var TodoPreview = React.createClass({

  handleClick: function(){
    history.push('/users/' + this.props.params.userid +
    '/projects/' + this.props.todo.project_id+
    '/todos/' + this.props.todo.id);
  },

  thisClass: function(){
    if (this.props.todo.completed){
      return "todo-completed";
    } else {
      return "todo-incomplete";
    }
  },

  render: function() {
    return (
      <div onClick={this.handleClick} className={this.thisClass()}>
        <h1>{this.props.todo.title}</h1>
        <h2>{this.props.todo.description}</h2>
        <h2>{this.props.todo.completed.toString()}</h2>
      </div>
    );
  }

});

module.exports = TodoPreview;
