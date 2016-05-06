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

  formatDueDate: function(){
    var dueDate = new Date(this.props.todoItem.due_date);
    var date = dueDate.getDate();
    var month = dueDate.getMonth() + 1;
    var year = dueDate.getFullYear().toString().substring(2);
    return [month, date, year].join('/');
  },

  checkedClass: function(){
    if (this.state.completed){
      return "todoitem-incomplete";
    } else {
      return "todoitem-complete";
    }
  },

  // <input type="checkbox" checked={this.state.completed}
  //   onChange={this.props.handleClick}/>

  render: function() {
    return (
      <div>
        <div>
          <button onClick={this.props.handleClick} className={"todoitem-completion " + this.checkedClass()}/>
          <button onClick={this.destroy}>X</button>
        </div>
        <div>
          <div>{this.props.todoItem.title}</div>
          <div>{this.props.todoItem.description}</div>
          <div>{this.formatDueDate()}</div>
        </div>
      </div>
    );
  }

});

module.exports = TodoItemDisplay;
