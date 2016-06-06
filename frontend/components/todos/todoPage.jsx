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

  completed: function() {
    if (this.state.todo.completed){
      return "Completed";
    } else {
      return "Incomplete";
    }
  },

  edit: function(){
    if (this.state.edit){
      var boundClick = this.cancelEdit;
      return(
        <div className="project-inner-div">
          <EditTodo new={false} todo={this.state.todo} cancel={boundClick} />
        </div>
      );
    } else {
      // <button className="edit-todolist-btn" onClick={this.enableEdit}>Edit</button>
      // <button className="del-todolist-btn"
      //   onClick={this.destroyTodoList}>Delete</button>
      return (
        <div className="project-inner-div">
          <div className="">
            <i className="material-icons edit-project-icon del-icon"
              onClick={this.destroyTodoList}>delete_forever</i>
            <i className="material-icons edit-project-icon edit-icon"
              onClick={this.enableEdit}>mode_edit</i>
          </div>
          <div className="">
            <h1 className="project-header">{this.state.todo.title}</h1>
            <h2 className="project-description">{this.state.todo.description}</h2>
            <h2 className="member-header">{this.completed()}</h2>
            <div>
              <button onClick={this.back} className="project-back-btn">Back</button>
              <button onClick={this.back} className="todo-done-btn">Done</button>
            </div>
          </div>
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
    this.setState({completed: _completed});
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
        <div className="txt-new-todolist">Tasks</div>
      </div>);
    }
  },

  todoItems: function(){
    if (this.state.todo.todo_items.length === 0){
      return <div className="no-todoitems-header">No tasks found!</div>;
    }
    var that = this;
    var items = this.state.todo.todo_items.map(function(item, index){
      return (<TodoItemDisplay todoItem={item} completed={that.state.completed[index]}
        key={item.id} handleClick={that.updateItemCompletion.bind(that, index)} />);
    });
    return (<ul className="todoitems-list group">
      {items}
    </ul>);
  },

  // <h2 className="todo-container-header">Tasks</h2>
  render: function() {
    return (
      <div>
        <NavBar />
        <div className="background">
          <div className="todo-outer-div">
            <div>
              {this.edit()}
            </div>
            <div className="project-todo-div">
              {this.add()}
              {this.todoItems()}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TodoPage;
