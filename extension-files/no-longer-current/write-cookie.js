finish = function finish()
{
	var value = (value + "=");
	var decodedCookie = window.wrappedJSObject.document.cookie;
	//console.log("Cookies Obtained!");
	/*separates cookies into an array by their separating ";"*/
	var allcookie = decodedCookie.split(';');
	/*For if a GVCC is found (by name "euconsent")*/
	var found = false;
	/*This is used to trim the finished 
	product of whitespace on both sides.*/
	var trimspace;
	/*Iterates through all available cookies?*/
	var euconsentfound;
	for (var i=0;i<allcookie.length;i++)
	{
		var inc = allcookie[i];
		var incsplit = inc.split('=');
		var incone = incsplit[0];
		var inctwo = incsplit[1];
		//console.log(incone + " ? " + inctwo); 
		var GVCCTicket = inctwo.split('-');
		var last = GVCCTicket[GVCCTicket.length-1];
		if (incone == " euconsent")
		{
			euconsentfound = i;
			/*Sets an euconsent cookie to a different value (0's for now). Trims value.*/
			found = true;
			//console.log("****************CONSENT COOKIE FOUND****************\n\n");
			//console.log("GVCC FOUND!");
			trimspace = "euconsent=BOSCllVOSCllVABABBENBZAAAAAfaAAA-" + last + ";";
			//console.log(trimspace);
			allcookie[i] = trimspace.trim();
		}
	}
	//Empty function for now because a lot of the same harmless error come up.
	function handleError(error) 
	{
	}
	//This function below and the function above are (c) 2018 Mozilla and indicdual contributors.
	//Content is dedicated to the Public Domain.
	//Source: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage
	function notifyBackgroundPage() 
	{
	  var sending = browser.runtime.sendMessage({
		greeting: "Do the delete!"
	  });
	  sending.then(handleError); 
	}
	notifyBackgroundPage();

	write = function()
	{
		if (found)
		{
			var messenger;
			var domain;
			domain = window.location.host.split(/\.(.+)/)[1];
			trimspace = allcookie[euconsentfound] + " path=/; domain=" + domain + "; expirationDate: 1566398584; hostOnly: false; httpOnly: false; session: false;";
			//console.log(trimspace);
			//window.wrappedJSObject.document.cookie = trimspace.trim();
			messenger = {
			  notify: function(message) {
				document.cookie = message;
			  }
			};
		//This call below, cloneInto is (c) 2018 Mozilla and individual contributors.
		//Content is dedicated to the Public Domain.
		//Source: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.cloneInto
		window.wrappedJSObject.messenger = cloneInto
		(
		messenger,
		window,
		{cloneFunctions: true
		});
		window.wrappedJSObject.messenger.notify(trimspace.trim());
		console.log("Your GVCC has been overwritten!");
		}
	};
	var writeSlow = setTimeout(write, 1500);
	writeSlow;
};

finish();

//console.log(window.wrappedJSObject.document.cookie);