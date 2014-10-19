Template.signup.events({
	'click #signup-twitter-button': function(e) {
		Template.notification.changeAndDisplayNotificationWithHTML("Now monitoring Twitter!","green");
		/*Meteor.loginWithTwitter(function (err) {
		  if (err){
				Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong.:-(","red");
			}else{
				Template.notification.changeAndDisplayNotificationWithHTML("Welcome","green");
			}
		});*/
	},
	'click #signup-facebook-button': function(e) {
		Meteor.loginWithFacebook({
			requestPermissions: ['public_profile', 'email']
			}, function (err) {
			if (err){
				Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong.:-(","red");
			}else{
				Template.notification.changeAndDisplayNotificationWithHTML("Welcome back!","green");
			}
		});
	},
})