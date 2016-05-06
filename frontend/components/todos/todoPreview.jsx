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
    } else if (this.nothing) {
      return "todo-nothing";
    } else if (this.overdue){
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
      return "Completed";
    } else {
      return this.findNextEvent();
    }
  },

  findNextEvent: function(){
    this.nothing = false;
    this.overdue = false;
    var todoItems = this.props.todo.todo_items;
    var finished = true;
    if (todoItems.length === 0){
      this.nothing = true;
      return "No Tasks";
    }
    var thisYear = (new Date()).getFullYear();
    for (var i = todoItems.length -1; i >= 0; i--){
      var todoItem = todoItems[i];
      if (!todoItem.completed && todoItem.due_date){
        var dueDate = new Date(todoItem.due_date);
        if (dueDate < (new Date())){
          this.overdue = true;
        }
        if (Math.abs(dueDate.getFullYear() - thisYear) > 1){
          return dueDate.toLocaleDateString();
        } else {
          var localeString = dueDate.toLocaleDateString();
          return localeString.substring(0, localeString.length - 5);
        }
      }
    }
    return "Nothing Due"
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className={this.thisClass()}>
        <div>{this.trimTitle()}</div>
        <div>{this.nextEvent()}</div>

      </div>
    );
  }

  // <div>{this.nextEvent()}</div>
});

module.exports = TodoPreview;
