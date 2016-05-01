var ProjectStore = require('../stores/projectStore');
var ProjectActions = require('../actions/projectActions');

module.exports = {

  getInitialState: function(){
    return {
      currentProject: ProjectStore.currentProject(),
      projectErrors: ProjectStore.errors()
    };
  },

//how do we determine which project to fetch?
  componentDidMount: function(){
    this.projectListener = ProjectStore.addListener(this.update);
    if (Object.keys(ProjectStore.currentProject()).length === 0){
      ProjectActions.fetchCurrentProject({
        project_id: this.props.params.projectid,
      });
    }
  },

  componentWillUnmount: function() {
    this.projectListener.remove();
  },

  update: function(){
    this.setState({
      currentProject: ProjectStore.currentProject(),
      projectErrors: ProjectStore.errors()
    });
  }

};
