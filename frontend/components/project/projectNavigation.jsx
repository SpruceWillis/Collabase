var React = require('react');
var history = require('react-router').hashHistory;

var ProjectNavigation = React.createClass({

  gotoTodos: function(){
    history.push('/users/' + this.props.user.id +  '/projects/'
    + this.props.project.id + '/todos');
  },

  render: function() {
    return (
      <div>
        <button onClick={this.gotoTodos}>Todos</button>
      </div>
    );
  }

});

module.exports = ProjectNavigation;
