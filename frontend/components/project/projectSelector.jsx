var React = require('react');
var CurrentUserState = require('../../mixins/currentUserState');
var history = require('react-router').hashHistory;
var ProjectSelector = React.createClass({

navigateToProject: function(id){
  history.push('/users/' + this.props.user.id + '/projects/' + id.toString()) ;
},

projects: function(){
  var that = this;
  var projectListItems = this.props.user.projects.map(function(project){
    return (
    <li className="dropdown-item" key={project.id}
      onClick={that.navigateToProject.bind(that, project.id)}>
      {project.title}
    </li>);
  });
  return (<ul className="dropdown-content">
    {projectListItems}
    <li onClick={this.navigateToNewProject}
      className="dropdown-item new-project">New Project</li>
  </ul>);
},

navigateToNewProject: function(){
  history.push('/projects/new');
},

  render: function() {
    return (
      <div className="dropdown">Projects
        <div>
          {this.projects()}
        </div>
      </div>
    );
  }

});

module.exports = ProjectSelector;
