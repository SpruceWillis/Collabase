var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../navBar'),
    TodoStore = require('../../stores/todoStore'),
    TodoActions = require('../../actions/todoActions'),
    TodoItemAssignments = require('./todoItemAssignments');
var currentUserLookups = require('../../mixins/currentUserLookups');
var TodoItemPage = React.createClass({

  getInitialState: function(){
    var params = this.props.params;
    return this.getItemInfo(params.todoid, params.id);
  },

  componentWillMount: function() {
    TodoActions.getTodoItem({id: this.props.params.id});
    this.itemListener = TodoStore.addListener(this.updateTodo);
  },

  updateTodo: function(){
    var params = this.props.params;
    this.setState(this.getItemInfo(params.todoid, params.id));
  },

  componentWillUnmount: function(){
    this.itemListener.remove();
  },

  getItemInfo: function(todoId, id){
    var due;
    var item = TodoStore.currentItem(todoId, id);
    due = (item.due_date === null) ? "" : item.due_date;
    if (item){
      return {
        description: item.description,
        dueDate: due,
        title: item.title,
        assignments: item.assignments
      };
    } else {
      return {
        description: null,
        dueDate: null,
        title: null,
        assignments: null
      };
    }
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
    TodoActions.getTodoItem({id: params.id});
    this.setState(this.getItemInfo(params.todoid, params.id));
  },

  linkState: function(e){
    e.preventDefault();
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div clasName="background">
          <div className="project-inner-div">
            {this.itemDisplay()}
            <TodoItemAssignments assignments={this.state.assignments} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TodoItemPage;
