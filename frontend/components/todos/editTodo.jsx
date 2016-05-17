var React = require('react');
var TodoApiUtil = require('../../util/todoApiUtil');
var TodoActions = require('../../actions/todoActions');
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
        projectid: this.props.todo.project_id,
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

  cancel: function(e){
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
    this.setState({completed: !this.state.completed});
  },

  todoRedirect: function(todo){
    history.push('/users/' + this.props.userid + '/projects/' + todo.project_id
      + '/todos/' + todo.id);
  },

  handleSubmit: function(){
    if (this.props.new){
      TodoActions.createTodoList(this.state, this.todoRedirect);
    } else {
      TodoActions.updateTodoList(this.state);
    }
  },

  header: function(){
    if (this.props.new){
      // return (<div className="add-todolist-txt">Add Todo</div>);
      return;
    } else {
      return (<div className="editing-todolist-header">
        <div>Editing Todo-List</div>
      </div>);
    }
  },

  checked: function(){
    if (this.props.new){
      return;
    } else {
      return (
        <p onClick={this.updateCompletion} className="edit-todolist-completed">
          <input type="checkbox" checked={this.state.completed} id="completed"/>
          <label for="completed">Completed</label>
        </p>
      );
    }
  },

  // <label for="completed" className="edit-todolist-completed">Completed
  //   <input type="checkbox" onChange={this.updateCompletion}
  //     checked={this.state.completed} id="completed"
  //     ></input>
  // </label>

  render: function() {
    return (
      <div>
        {this.header()}
        <form onSubmit={this.handleSubmit} className="edit-todolist-form"
          id="edit">
          <input type="text" value={this.state.title} placeholder="title"
            onChange={this.updateTitle} required
            className="edit-todolist-text"></input>
          <input type="text" value={this.state.description}
            onChange={this.updateDescription} required
            className="edit-todolist-text" placeholder="description">
          </input>
          {this.checked()}
          <div className="todolist-save">
            <button className="todolist-save-btn">{this.buttonText()}</button>
            <button onClick={this.cancel} className="todolist-cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = EditTodo;
