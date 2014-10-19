Template.notification.state = false;
Template.notification.color = "green";
Template.notification.timer;
Template.notification.changeAndDisplayNotificationWithHTML = function(html,color){
	if(Template.notification.state){
		clearTimeout(Template.notification.timer);
		$("#notification-container").removeClass(Template.notification.color);
	}
	Template.notification.state = true;
	Template.notification.color = color;
	$("#notification-container").html(html);
	$("#notification-container").fadeIn("slow"); 
	$("#notification-container").addClass(Template.notification.color);
	Template.notification.timer = setTimeout(function(){
		Template.notification.state = false;
		$("#notification-container").removeClass(Template.notification.color);
	    $('#notification-container').hide();
	}, 3000);
}