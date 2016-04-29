var ProjectStore = require('../stores/ProjectStore');
var ProjectActions = require('../actions/ProjectActions');

module.exports = {

  getInitialState: function(){
    return {
      currentProject: ProjectStore.currentProject(),
      projectErrors: ProjectStore.errors()
    };

  },

  componentDidMount: function(){
    this.projectListener = ProjectStore.addListener(this.update);
    if (Object.keys(ProjectStore.currentProject()).length === 0){
      ProjectActions.fetchCurrentProject();
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
