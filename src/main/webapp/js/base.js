/* Copyright 2013 Sfeir Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Client ID of the application (from the APIs Console).
 * 
 * @type {string}
 */
CLIENT_ID = '81961503995-lsc5io2g1phnfvlpkcdflcpvk05m286v.apps.googleusercontent.com';

/**
 * Scopes used by the application.
 * 
 * @type {string}
 */
SCOPES = 'https://www.googleapis.com/auth/userinfo.email';

/**
 * Response type of the auth token.
 * 
 * @type {string}
 */
RESPONSE_TYPE = 'token id_token';

/**
 * Whether or not the user is signed in.
 * 
 * @type {boolean}
 */
signedIn = false;

/**
 * Loads the application UI after the user has completed auth.
 */
userAuthenticated = function() {
	var request = gapi.client.oauth2.userinfo.get().execute(
					function(resp) {
						if (!resp.code) {
							var token = gapi.auth.getToken();
							token.access_token = token.id_token;
							gapi.auth.setToken(token);
							signedIn = true;
							document.getElementById('userLabel').innerHTML = resp.email;
							document.getElementById('signinButton').innerHTML = 'Sign out';
							document.getElementById('greetingWrapper').classList.remove('hidden');
							queryGreeting();
						}
					});
};

/**
 * Handles the auth flow, with the given value for immediate mode.
 * 
 * @param {boolean}
 *            mode Whether or not to use immediate mode.
 * @param {Function}
 *            callback Callback to call on completion.
 */
signin = function(mode, callback) {
	gapi.auth.authorize({
		client_id : CLIENT_ID,
		scope : SCOPES,
		immediate : mode,
		response_type : RESPONSE_TYPE
	}, callback);
};

/**
 * Presents the user with the authorization popup.
 */
authenticate = function() {
	if (!signedIn) {
		signin(false, userAuthenticated);
	} else {
		signedIn = false;
		document.getElementById('userLabel').innerHTML = '(not signed in)';
		document.getElementById('signinButton').innerHTML = 'Sign in';
		document.getElementById('greetingWrapper').classList.add('hidden');
	}
};

/**
 * Queries for greeting the logged user.
 * 
 */
queryGreeting = function() {
	gapi.client.helloWorld.greetings.getGreeting().execute(function(resp) {
		var greeting = document.getElementById('greetingDiv');
		greeting.innerHTML = resp.greeting;
	});
};

/**
 * Initializes the application.
 * It loads asynchronously all needed libraries
 * @param {string}
 *            apiRoot Root of the API's path.
 */
initialize = function(apiRoot) {
	var apisToLoad;
	//when all needed libraries are loaded make an attempt to authenticate the user without
	//displaying a popup(reuse an already existing session)
	//note that this is not mandatory, we can let the user click on the button sign in and the process of authentication 
	//starts from there
	var callback = function() {
		if (--apisToLoad == 0) {
			signin(true, userAuthenticated);
		}
	}
	apisToLoad = 2; // must match number of calls to gapi.client.load()
	gapi.client.load('helloWorld', 'v1', callback, apiRoot);
	gapi.client.load('oauth2', 'v2', callback);
};
