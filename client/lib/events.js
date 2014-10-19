Template.signup.events({
	/*'click #signup-twitter-button': function(e) {
		Meteor.loginWithTwitter(function (err) {
		  if (err){
				Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong.:-(","red");
			}else{
				Template.notification.changeAndDisplayNotificationWithHTML("Now monitoring Twitter!","green");
			}
		});
	},*/
	'click #signup-facebook-button': function(e) {
		Meteor.loginWithFacebook({
			requestPermissions: ['public_profile', 'email','read_stream']
			}, function (err) {
			if (err){
				Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong.:-(","red");
			}else{
				Template.notification.changeAndDisplayNotificationWithHTML("Now monitoring FB!","green");
			}
		});
	},
})