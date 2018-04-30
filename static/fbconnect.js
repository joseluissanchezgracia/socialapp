function show_login_status(network, status)
{
	if (status)
	{
		$("#" + network + "Status").html("You are currently logged in to <span class='red'>" + network + "</span>");
	}else{
		$("#" + network + "Status").html("You are not currently logged in to <span class='green'>" + network + "</span>");
	}
}
			
window.fbAsyncInit = function(){
	FB.init({ appId:'1250338068434577', status:true,  cookie:true, xfbml:true});
	FB.getLoginStatus(function(response){
		if (response.status != "unknown")
		{
			show_login_status("Facebook", true);
		}else{
			show_login_status("Facebook", false);
		}
	});
};
// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	d.getElementsByTagName('head')[0].appendChild(js);
}(document));