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
    var todo = TodoStore.currentTodo(this.props.params.todoid);
    return {
      todo: todo,
      edit: false,
      add: false,
      completed: this.getCompletions(todo)
    };
  },

  getCompletions: function(todo){
    var completions =  todo.todo_items.map(function(todoItem){
      return todoItem.completed;
    });
    return completions;
  },

  componentWillMount: function() {
    this.listener = TodoStore.addListener(this.update);
    TodoActions.getTodoList({
      id: this.props.params.todoid,
      projectid: this.props.params.projectid
    });
  },

  saveIfDifferent: function(){
    if (this.isDifferent()){
      this.save();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var todo = TodoStore.currentTodo(nextProps.params.todoid);
    this.setState({
      todo: todo,
      edit: false,
      add: false,
      completed: this.getCompletions(todo)
    });
  },

  componentWillUnmount: function() {
    this.listener.remove();
    if (this.isDifferent()){
      this.save();
    }
  },

  save: function(e){
    if (e){
      e.preventDefault();
      TodoActions.updateTodoListItems(this.state, this.saveAlert);
    } else {
      TodoActions.updateTodoListItems(this.state);
    }
  },

  isDifferent: function(){
    var storeTodo = TodoStore.currentTodo(this.props.params.todoid);
    var storeCompleted = this.getCompletions(storeTodo);
    if (storeCompleted.length !== this.state.completed.length) {
      return true;
    } else {
      for (var i = 0; i < storeCompleted.length; i++){
        if (storeCompleted[i] !== this.state.completed[i]){
          return true;
        }
      }
    }
    return false;
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
        <h2>Completed: {this.state.todo.completed.toString()}</h2>
      </div>);
    }
  },

  onTodoCreate: function(){
    this.setState({add: false});
  },

  back: function(){
    history.push('/users/' + this.props.params.userid + '/projects/'
    + this.props.params.projectid);
  },

  updateItemCompletion: function(index){
    var _completed = this.state.completed;
    _completed[index] = !_completed[index];
    this.setState({completed: _completed})
  },

  saveAlert: function(){
    alert("Todo-list saved");
  },

  add: function(){
    if (this.state.add){
      return <NewTodoItem todo={this.state.todo} cancel={this.cancelAdd}
        success={this.onTodoCreate}/>;
    } else {
      return (<div onClick={this.enableAdd} className="new-todolist-header">
        <button className="btn-new-todolist">+</button>
        <div className="txt-new-todolist">New Task</div>
      </div>);
    }
  },

  todoItems: function(){
    var that = this;
    var items = this.state.todo.todo_items.map(function(item, index){
      return (<TodoItemDisplay todoItem={item} completed={that.state.completed[index]}
        key={item.id} handleClick={that.updateItemCompletion.bind(that, index)} />);
    });
    return (<ul>
      {items}
    </ul>);
  },

  render: function() {
    return (
      <div>
        <NavBar />
        {this.edit()}
        {this.add()}
        {this.todoItems()}
        <div>
          <button onClick={this.save}>Save</button>
          <button onClick={this.back}>Back</button>
        </div>
      </div>
    );
  }

});

module.exports = TodoPage;
