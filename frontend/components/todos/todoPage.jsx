var React = require('react');
var TodoStore = require('../../stores/todoStore');
var EditTodo = require('./editTodo');
var TodoActions = require('../../actions/todoActions');
var history = require('react-router').hashHistory;
var TodoPage = React.createClass({

  getInitialState: function() {
    return {
      todo: TodoStore.currentTodo(this.props.params.todoid),
      edit: false
    };
  },

  componentWillMount: function() {
    this.listener = TodoStore.addListener(this.update);
    TodoActions.getTodo({
      id: this.props.params.todoid,
      projectid: this.props.params.projectid
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      todo: TodoStore.currentTodo(nextProps.params.todoid),
      edit: false
    });
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  update: function(){
    this.setState( {
      todo: TodoStore.currentTodo(this.props.params.todoid)
    });
  },

  enableEdit: function(){
    this.setState({edit: true});
  },

  cancel: function(){
    this.setState({edit: false});
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
      var boundClick = this.cancel;
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



  render: function() {
    return (
      <div>
        {this.edit()}
      </div>
    );
  }

});

module.exports = TodoPage;
