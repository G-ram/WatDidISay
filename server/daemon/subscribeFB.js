Meteor.setInterval(function(){checkForNewStatuses()},20000);
function checkForNewStatuses(){
	var users = Meteor.users.find({});
	users.forEach(function(user){
		var accessToken = user.services.facebook.accessToken;
	    result = Meteor.http.get("https://graph.facebook.com/me/statuses?fields=message", {
	        params: {
	            access_token: accessToken,
	        }
	    });
	    if(result.error){
	    	console.log(result)
	    }else{
	    	if(result.data.data[0]){
		    	if(user.updates[0] != result.data.data[0]["message"]){
				    var statusArray = [];
				    for(var i = 0; i < result.data.data.length; i++){
				    	statusArray[statusArray.length] = result.data.data[i]["message"];
				    }
				    Meteor.users.update({_id: user._id},{$set: {updates:statusArray}},
				    function(error){
						if(error){throw error;}
					});
				    console.log(user.firstName+" said: "+statusArray[0]);
				    //New Status!!!

				}
			}
		}
	});
}