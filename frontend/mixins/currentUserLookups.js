var UserStore = require('../stores/userStore');
var UserActions = require('../actions/userActions');

module.exports = {

  getInitialState: function(){
    return {
      currentUsers: UserStore.currentUsers(),
      projectErrors: UserStore.errors()
    };
  },

//how do we determine which project to fetch?
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.update);
      // UserActions.fetchCurrentUsers({
      //   user_params: this.props.user_params,
      // });
  },

  componentWillReceiveProps: function(nextProps){
    UserActions.fetchCurrentUsers({
      user_params: nextProps.user_params,
    });
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  update: function(){
    this.setState({
      currentUsers: UserStore.currentUsers(),
      projectErrors: UserStore.errors()
    });
  }

};
