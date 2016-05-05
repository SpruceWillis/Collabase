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
    if (this.state.todos.length === 0){
      return <div>No todos found!</div>;
    } else {
      var todoItems = this.state.todos.map(function(todo){
        return <li key={todo.id}><TodoPreview
          params={that.props.params} todo={todo}/></li>;
      });
      return <ul>{todoItems}</ul>;
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
