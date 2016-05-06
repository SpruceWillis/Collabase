var React = require('react');
var history = require('react-router').hashHistory;

var TodoPreview = React.createClass({

  handleClick: function(){
    history.push('/users/' + this.props.params.userid +
    '/projects/' + this.props.todo.project_id+
    '/todos/' + this.props.todo.id);
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
      return ["No Tasks", false];
    }
    var thisYear = (new Date()).getFullYear();
    for (var i = todoItems.length -1; i >= 0; i--){
      var todoItem = todoItems[i];
      if (!todoItem.completed && todoItem.due_date){
        var dueDate = new Date(todoItem.due_date);
        var date = dueDate.getDate();
        var month = dueDate.getMonth() + 1;
        var year = dueDate.getFullYear().toString().substring(2);
        return ['Next: ' + [month,date, year].join("/"), (new Date() > dueDate)];
      }
    }
    return ["No Items Due", false];
  },

  completionFraction: function(){
    var todoItems = this.props.todo.todo_items;
    var completedCount = 0;
    var l = todoItems.length;
    if (l === 0){
      return "0/0 done";
    } else if (this.props.todo.completed){
      return "All Done!";
    }
    for (var i = 0; i < l; i++) {
      if (todoItems[i].completed){
        completedCount++;
      }
    }
    return completedCount + "/" + l + " done";
  },

  render: function() {
    var nextEvent = this.nextEvent();
    if (nextEvent[1] && !this.props.todo.completed){
      var className = "todo-overdue";
    } else {
      className = "todo-ontrack";
    }
    return (
      <li className={"todo-preview group " + className}>
        <div onClick={this.handleClick} title={this.props.todo.description}>
          <div>{this.trimTitle()}</div>
          <div>{this.nextEvent()}</div>
          <div>{this.completionFraction()}</div>
        </div>
    </li>
    );
  }

  // <div>{this.nextEvent()}</div>
});

module.exports = TodoPreview;
