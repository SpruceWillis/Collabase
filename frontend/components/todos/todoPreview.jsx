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

  trimTitle: function(){
    var length = 25;
    var title = this.props.todo.title.trim();
    if (title.length <= length){
      return title;
    } else {
      return (title.substring(0, length - 3) + '...');
    }
  },

  nextEvent: function(){
    var todo = this.props.todo;
    if (todo.completed){
      return "Done!"
    } else {
      return this.findNextEvent();
    }
  },

  findNextEvent: function(){
    var todoItems = this.props.todo.todo_items;
    if (todoItems.length === 0){
      this.completed = "N/A";
      return "No Tasks";
    }
    var thisYear = (new Date()).getFullYear();
    for (var i = todoItems.length -1; i >= 0; i--){
      var todoItem = todoItems[i];
      if (!todoItem.completed && todoItem.due_date){
        this.completed = "False";
        var dueDate = new Date(todoItem.due_date);
        if (Math.abs(dueDate.getFullYear() - thisYear) > 1){
          return dueDate.toLocaleDateString();
        } else {
          var localeString = dueDate.toLocaleDateString();
          return localeString.substring(0, localeString.length - 5);
        }
      }
    }
    this.completed = "True";
    return "All Done!";
  },

  render: function() {
    return (
      <div onClick={this.handleClick} className={this.thisClass()}>
        <div>{this.trimTitle()}</div>
        <div>{this.findNextEvent()}</div>
      </div>
    );
  }

  // <div>{this.nextEvent()}</div>
});

module.exports = TodoPreview;
