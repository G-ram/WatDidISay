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
				    var pastStatusArray = [];
				    for(var i = 0; i < result.data.data.length; i++){
				    	statusArray[statusArray.length] = result.data.data[i]["message"];
				    	if(i != 0){
				    		pastStatusArray[pastStatusArray.length] = result.data.data[i]["message"];
				    	}
				    }
				    currentStatus = invokeWatson(result.data.data[0]["message"]);
				    pastStatuses = invokeWatson(pastStatusArray.toString());
				    Meteor.users.update({_id: user._id},{$set: {updates:statusArray}},
				    function(error){
						if(error){throw error;}
					});
				    console.log(user.firstName+" said: "+statusArray[0]);
				    computeDifferenceOfTrees(currentStatus,pastStatuses);			    
				}
			}
		}
	});
}
function invokeWatson(rawString){
	while(rawString.split(" ").length < 250){
		rawString += rawString+" ";
	}
	var analysis = Meteor.http.post("https://gateway.watsonplatform.net/systemu/service/api/v2/profile", {
		headers:{
			"Content-Type":"application/json",
			"Authorization": "Basic " + new Buffer("dda82351-1e07-4ae4-bba0-317acd1224f1:lhy6mbkEyjoB").toString("base64")
		},
	    data: {
	        contentItems : [{ 
				userid : "dummy",
				id : "dummyUuid",
				sourceid : "freetext",
				contenttype : "text/plain",
				language : "en",
				content : rawString
			}]
	    }
	});
	return analysis["content"];
}
function computeDifferenceOfTrees(tree1,tree2){
	var string1 = tree1+"";
	var string2 = tree2+"";
	var numbers1 = getNumbers(string1);
	var numbers2 = getNumbers(string2);
	var diff = 0;
	for(var i = 0; i < numbers1.length;i++){
		diff += Math.abs(numbers1[i]-numbers2[i]);
	}
	console.log("DIFF: "+diff/54);
	return diff/54;
}
function getNumbers(str){
	var regex = /[+-]?\d+\.\d+/g;
	return str.match(regex).map(function(v) { return parseFloat(v);});
}
