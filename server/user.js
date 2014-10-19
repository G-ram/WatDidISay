Accounts.onCreateUser(function (options, user) {
    var result;
    user.profile = [];
    if(user.services.facebook){
    	var accessToken = user.services.facebook.accessToken;
	    result = Meteor.http.get("https://graph.facebook.com/me/statuses?fields=message", {
	        params: {
	            access_token: accessToken,
	        }
	    });
	    if(result.error){
	    	console.log(result)
	    }else{
		    user.firstName = user.services.facebook.first_name;
		    user.lastName = user.services.facebook.last_name;
		    user.phone = user.phone;
		    user.email = user.services.facebook.email;
		    var statusArray = [];
		    for(var i = 0; i < result.data.data.length; i++){
		    	statusArray[statusArray.length] = result.data.data[i]["message"];
		    }
		    user.updates = statusArray;
		}
	}/*else if(user.services.twitter){
		user.profile["firstName"] = user.services.twitter.screenName;
		user.profile["lastName"] = user.services.twitter.screenName;
	}*/else{
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