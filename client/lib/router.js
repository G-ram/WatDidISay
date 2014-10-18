//Setup
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

//Basic Routes
Router.map(function() {
  this.route('home', {
    path: '/'
  });
});

//On before routing actions
var beforeHooks = {
    isAdmin: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          this.render('login');
          pause();
        }
    },
    isRevise: function(bankId){
      if(bankId){
        Session.set("isRevise","Revise");
      }else{
        Session.set("isRevise","Add");
      }
    }
}
Router.onBeforeAction('loading');