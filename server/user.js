Accounts.onCreateUser(function (options, user) {
    var emptyArray = [],
        result;
    if(user.services.facebook){
    	var accessToken = user.services.facebook.accessToken;
	    result = Meteor.http.get("https://graph.facebook.com/me/picture?redirect=false&height=200&type=normal&width=200", {
	        params: {
	            access_token: accessToken,
	        }
	    });
	    if(result.error){
	    	console.log(result)
	    }else{
		    user.profile.firstName = user.services.facebook.first_name;
		    user.profile.lastName = user.services.facebook.last_name;
		    user.profile.email = user.services.facebook.email;
		    user.profile.phone = user.phone;
		    user.email = user.services.facebook.email;
		    user.updates = result.data.data.url;
		}
	}else if(user.services.twitter){

	}else{
		return null;
	}
    return user;
});
//Stop the user from modifying anything directly from the client
Meteor.users.deny({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return true;
  },
  remove: function(userId, doc){
    return true;
  }
});