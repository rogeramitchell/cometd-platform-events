/*
	set this as your instance url appended with /cometd/40.0
	example: https://na10.salesforce.com/cometd/40.0
*/
let baseUrl = 'https://rogermitchell-dev-ed.my.salesforce.com/cometd/40.0';

/*
	either make an OAuth call and retrieve the token,
	or copy this value from the `sid` cookie associated
	with your baseUrl from within the browser
*/
let token = '00DE00000001233333!jfdsfkljdsklfjdasjflds;fjkadsfaddasf';

/*
	set this as the API name of your platform event
*/
let platformEventName = 'User_Update__e';

// define node modules
require('cometd-nodejs-client').adapt();
let lib = require('cometd');
let cometd = new lib.CometD();

// configure this instance of CometD
cometd.configure({
	url: baseUrl,
	requestHeaders: { 
		Authorization: 'Bearer ' + token
	},
	appendMessageTypeToURL: false
});

// handle the handshake's success
cometd.handshake((shake) => {
	if(shake.successful) {
		// set your event here
		cometd.subscribe('/event/' + platformEventName, (message) => {
			console.log(message.data);
		});
	} else {
		console.log('An error occurred!');
		console.log(shake);
	}
});