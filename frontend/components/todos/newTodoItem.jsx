var React = require('react');
var TodoActions = require('../../actions/todoActions');

var NewTodoItem = React.createClass({

  getInitialState: function() {
    return {
      title: "",
      description: "",
      due_date: "",
      completed: false,
      projectid: this.props.todo.project_id,
      id: this.props.todo.id
    };
  },

  handleUpdate: function(e){
    e.preventDefault();
    var newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  handleSubmit: function(e){
    e.preventDefault();
    TodoActions.createTodoItem(this.state, this.props.success);
  },

  render: function() {
    return (
      <div className="new-todo-container">
        <form onSubmit={this.handleSubmit} id="new-todo-form">
          <input type="text" onChange={this.handleUpdate} id="title"
            value={this.state.title} className="edit-todolist-text"
            required placeholder="title"/>
          <input type="text" onChange={this.handleUpdate} id="description"
            value={this.state.description} required placeholder="Description"
            className="edit-todolist-text"/>
          <input type="date" onChange={this.handleUpdate} id="due_date"
            value={this.state.due_date} className="edit-todolist-text"/>
        </form>
        <div className="new-todoitem-btns">
          <button type="submit" form="new-todo-form"
            className="edit-todolist-btn">Add Task</button>
          <button onClick={this.props.cancel} className="del-todolist-btn">Cancel</button>
        </div>
      </div>
    );
  }

});

module.exports = NewTodoItem;
