var React = require('react');
var TodoActions = require('../../actions/todoActions');
var history = require('react-router').hashHistory;

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
    var dueDate = this.props.todoItem.due_date;
    if (dueDate === null){
      return "No due date";
    }
    dueDate = new Date(dueDate);
    var date = dueDate.getDate();
    var month = dueDate.getMonth() + 1;
    var year = dueDate.getFullYear().toString().substring(2);
    return [month, date, year].join('/');
  },

  checkedClass: function(){
    if (this.state.completed){
      return "todoitem-complete";
    } else if (this.props.todoItem.due_date < (new Date())) {
      return "todoitem-overdue";
    } else {
      return "todoitem-incomplete";
    }
  },

  redirectToItem: function(id){
    history.push('todos/' + this.props.todoItem.todo_list_id + '/todo_item/' + id);
  },

  render: function() {
    return (
      <li className="todoitem-display">
        <div className="todoitem-btnheader">
          <button onClick={this.destroy} className="todoitem-destroybtn">X</button>
        </div>
        <div>
          <div className="todoitem-txt">{this.formatDueDate()}</div>
          <div className="todoitem-title"
            onClick={this.redirectToItem.bind(this, this.props.todoItem.id)}>
            {this.props.todoItem.title}</div>
          <div className="todoitem-txt">{this.props.todoItem.description}</div>
          <p onClick={this.props.handleClick}>
            <input type="checkbox" checked={this.state.completed}
               id={'c' + this.props.todoItem.id}/>
            <label for={'c' + this.props.todoItem.id}>Completed</label>
          </p>
        </div>
      </li>
    );
  }

});

module.exports = TodoItemDisplay;
