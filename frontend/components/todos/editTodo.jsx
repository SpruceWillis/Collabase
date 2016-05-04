var React = require('react');
var TodoApiUtil = require('../../util/todoApiUtil');
var history = require('react-router').hashHistory;
var EditTodo = React.createClass({

  getInitialState: function() {
    if (this.props.new){
      return {
        title: "",
        description: "",
        completed: false,
        projectid: this.props.project
      };
    } else {
      return {
        title: this.props.todo.title,
        description: this.props.todo.description,
        completed: this.props.todo.completed,
        id: this.props.todo.id,
        cancel: this.props.cancel
      };
    }
  },

  buttonText: function(){
    if (this.props.new) {
      return "New";
    } else {
      return "Update";
    }
  },

  cancelButton: function(){
    if (this.props.new){
      return;
    } else {
      return <button onClick={this.cancel}
        className="todolist-cancel">Cancel</button>;
    }
  },

  cancel: function(e){
    debugger;
    e.preventDefault();
    this.props.cancel();
  },

  updateTitle: function(e){
    e.preventDefault();
    this.setState({title: e.target.value});
  },

  updateDescription: function(e){
    e.preventDefault();
    this.setState({description: e.target.value});
  },

  updateCompletion: function(e){
    this.setState({completed: e.target.checked});
  },

  todoRedirect: function(todo){
    history.push('/users/' + this.props.userid + '/projects/' + todo.project_id
      + '/todos/' + todo.id);
  },

  handleSubmit: function(){
    if (this.props.new){
      TodoApiUtil.createTodoList(this.state, this.todoRedirect);
    } else {
      TodoApiUtil.updateTodoList(this.state);
    }
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="edit-todolist-form"
          id="edit">
          <input type="text" value={this.state.title} placeholder="title"
            onChange={this.updateTitle}
            className="edit-todolist-title"></input>
          <input type="text" value={this.state.description}
            onChange={this.updateDescription}
            className="edit-todolist-description" placeholder="description">
          </input>
          <label for="completed">Completed
            <input type="checkbox" onClick={this.updateCompletion}
            value={this.state.completed} id="completed"></input>
          </label>
          <div>
            <button className="todolist-save">{this.buttonText()}</button>
            {this.cancelButton()}
          </div>
        </form>
      </div>
    );
  }

});

module.exports = EditTodo;
