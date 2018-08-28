/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/
	/*The first value of GVCC that is encountered 
	when check is being triggered. saved as a String*/
	var savedOldVal = "";
	/*Boolean value to check if the savedOldVal is 
	being encountered for the first time*/
	var firstTime = true;
	//Used to store and add second part of consent string. From cookie.value
	var sendOutValue = "";
	//Below variables to the next comment are stored from the original GVCC.
	var name;
	var domain;
	var expirationDate;
	var firstPartyDomain;
	var httpOnly;
	var path;
	var secureID;
	var storeID;
	//End of stored cookie variables.
	/*
	NAME: initiateRemoval
	PURPOSE: processes "tabs" variable and sends it to removeCookies and addGVCC
	*/
	function initiateRemoval()
	{
		function success(e)
		{
			console.log("success: " + e);
		}
		function successr(e)
		{
			console.log("removal success");
			console.log(e);
		}
		function error(e)
		{
			console.log("error: " + e);
		}
		console.log("working");
		/*
		NAME: removeCookies
		PURPOSE: removes all cookies names "euconsent" on the current tab's domain.
		*/
		function removeCookies(tabs)
		{
			//consent string will eventually be injected here
			concatenation = "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA";// + sendOutValue;
			//console.log(concatenation);
			console.log("removing");
			var cookierem = browser.cookies.remove
			({
				url: tabs[0].url,
				name: name
			})
			cookierem.then(successr, error);
		}
		/*
		NAME: addGVCC
		PURPOSE: Creates a new GVCC and adds it to the browser
		*/
		function addGVCC(tabs)
		{
			console.log("cookies.set");
				var cookieset = browser.cookies.set
				({
					url: tabs[0].url,
					name: name,
					value: concatenation,
					httpOnly: httpOnly,
					expirationDate: expirationDate,
					path: path,
					firstPartyDomain: firstPartyDomain,
					domain: domainset,
					secure: secureID,
					storeId: storeID
				})
				cookieset.then(success, error);
		}
	var getActive = browser.tabs.query
	({
		active: true,
		currentWindow: true
	});
	console.log("got active");
	getActive.then(removeCookies);
	getActive.then(addGVCC);
	}
	/*
	NAME: check
	PURPOSE: Checks for cookies mathing "euconsent" and 
	sends browser-created cookies to be removed and rewritten.
	*/
	function check(cookie)
	{
		if (cookie.name == "euconsent" || cookie.name == "EUCONSENT" || cookie.name == "EuConsent" || cookie.name == "Euconsent")
		{
			name = cookie.name;
			console.log(cookie.name);
			if (cookie.name.indexOf('-') > -1)
			{
			var cookiein = cookie.value;
			}
			else
			{
				var cookieValue = cookie.value.split('-');
				console.log(cookieValue[0]);
				var cookiein = "";
				var cookieout;
				for (var i=0;i<cookieValue.length;i++)
				{
					if (i < cookieValue.length - 2)
					{
						cookiein = cookiein + cookieValue[i] + "-";
					}
					else if (i < cookieValue.length - 1)
					{
						cookiein = cookiein + cookieValue[i];
					}
					else
					{
						cookieout = cookieValue[i];
						sendOutValue = "-" + cookieValue[i];
					}
				}
			}
			console.log(firstTime);
			if (firstTime == true)
			{
			console.log(cookie.domain);
					//BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA for 100% consent (per IAB)
					// for clean slate BOSCllVOSCllVABABBENBZAAAAAfaAAA
					//sets variables from top of page to cookie values
					//console.log(cookie);
					domain = cookie.domain;
					expirationDate = cookie.expirationDate;
					firstPartyDomain = cookie.firstPartyDomain;
					httpOnly = cookie.httpOnly;
					path = cookie.path;
					secureID = cookie.secure;
					storeID = cookie.storeId;
					/*if (firstTime)
					{
					console.log("removing");
					savedOldVal = cookiein;
					firstTime = false;
					}*/
					initiateRemoval();
					firstTime = false;
		}
		else
		{console.log("tried again!");}
		}
	}
	/*
	NAME: change
	PURPOSE: Hands over cookie value to check()
	*/
	change = function(changeInfo) 
		{
			check(changeInfo.cookie);
		};
	browser.cookies.onChanged.addListener(change);
	