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
        return <TodoPreview key={todo.id} params={that.props.params} todo={todo}/>;
      });
      return <ul className="group todoitems-container">{todoItems}</ul>;
    } else {
      return (<div className="">No Todos Found!</div>);
    }
  },

  // <h2 className="todo-container-header">Your Todo Lists</h2>
  render: function() {
    return (
      <div>
        <div className="s">
          {this.todos()}
        </div>
      </div>
    );
  }

});

module.exports = ProjectTodosContainer;
