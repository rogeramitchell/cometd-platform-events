let baseUrl = 'https://rogermitchell-dev-ed.my.salesforce.com/cometd/40.0'; // place your base instance URL here
let token = ''; // place your token here

require('cometd-nodejs-client').adapt();

let lib = require('cometd');
let cometd = new lib.CometD();

cometd.configure({
	url: baseUrl,
	requestHeaders: { 
		Authorization: 'Bearer ' + token
	},
	appendMessageTypeToURL: false
});

cometd.handshake((shake) => {
	if(shake.successful) {
		// set your event here
		cometd.subscribe('/event/User_Update__e', (message) => {
			console.log(message.data);
		});
	}
});