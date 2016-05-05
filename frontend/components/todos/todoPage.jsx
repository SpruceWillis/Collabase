var React = require('react');
var TodoStore = require('../../stores/todoStore');
var EditTodo = require('./editTodo'),
    NewTodoItem = require('./newTodoItem'),
    TodoItemDisplay = require('./todoItemDisplay'),
    NavBar = require('../navBar');
var TodoActions = require('../../actions/todoActions');
var history = require('react-router').hashHistory;
var TodoPage = React.createClass({

  getInitialState: function() {
    return {
      todo: TodoStore.currentTodo(this.props.params.todoid),
      edit: false,
      add: false
    };
  },

  componentWillMount: function() {
    this.listener = TodoStore.addListener(this.update);
    TodoActions.getTodoList({
      id: this.props.params.todoid,
      projectid: this.props.params.projectid
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      todo: TodoStore.currentTodo(nextProps.params.todoid),
      edit: false,
      add: false
    });
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  update: function(){
    this.setState( {
      todo: TodoStore.currentTodo(this.props.params.todoid),
    });
  },

  enableEdit: function(){
    this.setState({edit: true});
  },

  cancelEdit: function(){
    this.setState({edit: false});
  },

  enableAdd: function(){
    this.setState({add:true});
  },

  cancelAdd: function(){
    this.setState({add:false});
  },

  redirectOnRemoval: function(){
    history.push('/users/' + this.props.params.userid + '/projects/' +
    this.props.params.projectid);
    alert ('Todo-list removed');
  },

  destroyTodoList: function(e){
    e.preventDefault();
    TodoActions.destroyTodoList({
      projectid: this.props.params.projectid,
      id: this.props.params.todoid
    }, this.redirectOnRemoval);
  },

  edit: function(){
    if (this.state.edit){
      var boundClick = this.cancelEdit;
      return <EditTodo new={false} todo={this.state.todo}
        cancel={boundClick} />;
    } else {
      return (<div>
        <div>
          <button onClick={this.enableEdit}>Edit</button>
          <button onClick={this.destroyTodoList}>Delete</button>
        </div>
        <h1>{this.state.todo.title}</h1>
        <h2>{this.state.todo.description}</h2>
      </div>);
    }
  },

  onTodoCreate: function(){
    this.setState({add: false});
    alert("New task added");
  },

  add: function(){
    if (this.state.add){
      return <NewTodoItem todo={this.state.todo} cancel={this.cancelAdd}
        success={this.onTodoCreate}/>;
    } else {
      return (<div onClick={this.enableAdd}>
        <button >+</button>
        <div>New Task</div>
      </div>);
    }
  },

  todoItems: function(){
    var that = this;
    var items = this.state.todo.todo_items.map(function(item){
      return (<TodoItemDisplay todoItem={item} key={item.id} />)
    });
    return (<ul>
      {items}
    </ul>)
  },

  render: function() {
    return (
      <div>
        <NavBar />
        {this.edit()}
        {this.add()}
        {this.todoItems()}
      </div>
    );
  }

});

module.exports = TodoPage;
