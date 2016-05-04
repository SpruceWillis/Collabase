var React = require('react');
var TodoStore = require('../../stores/todoStore');
var EditTodo = require('./editTodo');
var TodoActions = require('../../actions/todoActions');
var TodoPage = React.createClass({

  getInitialState: function() {
    return {
      todo: TodoStore.currentTodo(this.props.params.todoid),
      edit: false
    };
  },

  componentWillMount: function() {
    this.listener = TodoStore.addListener(this.update);
    TodoActions.getTodo(this.props.params.todoid);
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



  edit: function(){
    if (this.state.edit){
      var boundClick = this.cancel.bind(this);
      return <EditTodo new={false} todo={this.state.todo}
        cancel={boundClick} />;
    } else {
      return (<div>
        <button onClick={this.enableEdit}>Edit</button>
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
