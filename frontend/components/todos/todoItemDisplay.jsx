var React = require('react');
var TodoActions = require('../../actions/todoActions');

var TodoItemDisplay = React.createClass({

  getInitialState: function() {
    return {
      edit: false,
      completed: this.props.completed
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({completed: nextProps.completed});
  },

  destroy: function(e){
    e.preventDefault();
    if (confirm('Are you sure you want to remove this task?')){
      TodoActions.destroyTodoItem(this.props.todoItem.id);
    }
  },

  render: function() {
    return (
      <div>
        <div>
          <input type="checkbox" checked={this.state.completed}
            onChange={this.props.handleClick}/>
          <button onClick={this.destroy}>X</button>
        </div>
        <div>{this.props.todoItem.title}</div>
        <div>{this.props.todoItem.description}</div>
        <div>{this.props.todoItem.due_date}</div>
      </div>
    );
  }

});

module.exports = TodoItemDisplay;
