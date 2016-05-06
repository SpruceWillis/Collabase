var React = require('react');
var TodoStore = require('../../stores/todoStore');
var NavBar = require('../navBar'),
    TodoPreview = require('./todoPreview'),
    EditTodo = require('./editTodo');
var TodoServerActions = require('../../actions/todoServerActions');
var TodoActions = require('../../actions/todoActions');

var ProjectTodosContainer = React.createClass({

  getInitialState: function() {
    return {
      todos: TodoStore.allTodos(),
      errors: TodoStore.errors(),
    };
  },

  componentDidMount: function() {
    this.listener = TodoStore.addListener(this.update);
    // TodoActions.getTodoLists(this.props.params);
  },

  componentWillReceiveProps: function(nextProps) {
    TodoActions.getTodoLists(nextProps.params);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  update: function(){
    this.setState({
      todos: TodoStore.allTodos(),
       errors: TodoStore.errors()
    });
  },

  todos: function(){
    var that = this;
    if (this.state.todos && this.state.todos.length > 0){
      var todoItems = this.state.todos.map(function(todo){
        return <li key={todo.id} className="todo-preview"><TodoPreview
          params={that.props.params} todo={todo}/></li>;
      });
      return <ul className="group todo-previews-list">{todoItems}</ul>;
    } else {
      return (<div className="todos-none">No Todos Found!</div>);
    }
  },

  render: function() {
    return (
      <div>
        <div>
          {this.todos()}
        </div>
      </div>
    );
  }

});

module.exports = ProjectTodosContainer;
