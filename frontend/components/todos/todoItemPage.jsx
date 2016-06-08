var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../navBar'),
    TodoStore = require('../../stores/todoStore');

var TodoItemPage = React.createClass({

  getInitialState: function(){
    var params = this.props.params;
    var item = TodoStore.currentItem(params.todoid, params.id);
    debugger;
    return {
      description: item.description,
      dueDate: item.due_date,
      title: item.title,
      assignments: item.assignments
    };
  },

  itemDisplay: function(){
    return (
      <form>
        <input type="text" value={this.state.title}/>
      </form>
    )
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div clasName="background">
          <div className="todo-outer-div">
            {this.itemDisplay()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TodoItemPage;
