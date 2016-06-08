var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../navBar'),
    TodoStore = require('../../stores/todoStore');

var TodoItemPage = React.createClass({

  getInitialState: function(){
    var params = this.props.params;
    return this.getItemInfo(params.todoid, params.id);
  },

  getItemInfo: function(todoId, id){
    var due;
    var item = TodoStore.currentItem(todoId, id);
    due = (item.due_date === null) ? "" : item.due_date;
    return {
      description: item.description,
      dueDate: due,
      title: item.title,
      assignments: item.assignments
    };
  },

  itemDisplay: function(){
    return (
      <form>
        <input type="text" value={this.state.title} id="title"
          onChange={this.linkState} className="edit-todolist-text"/>
        <input type="text" value={this.state.description}
          id="description" onChange={this.linkState} className="edit-todolist-text"/>
        <input type="date" value={this.state.dueDate} id="dueDate"
          onChange={this.linkState} className="edit-todolist-text"/>
      </form>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    var params = nextProps.params;
    this.setState(this.getItemInfo(params.todoid, params.id));
  },

  linkState: function(e){
    e.preventDefault();
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  assignments: function(){
    var assignees;
    var that = this;
    if (this.state.assignments.length > 0){
      assignees = this.state.assignments.map(function(person){
        return <li key={person.id}>{person.name}</li>;
      });
    } else {
      return <div>Unassigned</div>;
    }
    return <ul>{assignees}</ul>;
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div clasName="background">
          <div className="project-inner-div">
            {this.itemDisplay()}
            {this.assignments()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TodoItemPage;
