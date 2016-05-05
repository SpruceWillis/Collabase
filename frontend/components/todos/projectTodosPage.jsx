var React = require('react');
var TodoStore = require('../../stores/todoStore');
var NavBar = require('../navBar'),
    TodoPreview = require('./todoPreview'),
    EditTodo = require('./editTodo');
var TodoServerActions = require('../../actions/todoServerActions');
var TodoActions = require('../../actions/todoActions');

var ProjectTodosPage = React.createClass({

  getInitialState: function() {
    return {
      todos: TodoStore.allTodos(),
      errors: TodoStore.errors(),
    };
  },

  componentDidMount: function() {
    this.listener = TodoStore.addListener(this.update);
    TodoActions.getTodos(this.props.params);
  },

  componentWillReceiveProps: function(nextProps) {
    TodoActions.getTodos(nextProps.params);
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
          userid={that.props.params.userid} todo={todo}/></li>;
      });
      return <ul>{todoItems}</ul>;
    }
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div>
          <div>Todo-Lists</div>
          {this.todos()}
        </div>
        <div>
          <div>Add a Todo</div>
          <EditTodo userid={this.props.params.userid} new={true}
            project={this.props.params.projectid} />
        </div>
      </div>
    );
  }

});

module.exports = ProjectTodosPage;
