// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';

process.env.DEBUG = 'actions-on-google:*';



let ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
let express = require('express');
let bodyParser = require('body-parser');
var nforce = require('nforce'); 
var chatter = require('nforce-chatter')(nforce);
var _ = require('lodash');
var args = require('nforce-chatter');
var body = require('nforce-chatter');
var opts = require('nforce-chatter');
var pluralize = require('pluralize');




let app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json({type: 'application/json'}));

app.post('/', function (request, response) {
  console.log('handle post');
  const assistant = new ActionsSdkAssistant({request: request, response: response});

    function mainIntent (assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
          'How is it going Demen? Let me guess. You need help with Salesforce again. ' +
          '<say-as interpret-as="text">What do you want to Chatter?</say-as>. .</speak>',
          ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
    assistant.ask(inputPrompt);
  }

 var org = nforce.createConnection({
  clientId: 'YOURCLIENTID',
  clientSecret: 'YOURCLIENTSECRET',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: '36.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single', // optional, 'single' or 'multi' user mode, multi default
  plugins: ['chatter']
});


  function rawInput (assistant) {
   //const input = assistant.getRawInput();
   var textinput = assistant.getRawInput();
   
// single-user mode 
var oauth;
org.authenticate({ username: 'YOURSALESFORCEUSERNAME', password: 'YOURPASSWORD'}, function(err, resp){
  // store the oauth object for this user 
  if(!err) 
//oauth = resp; 
{
  
org.chatter.postFeedItem({id: 'YOURPROFILEID', 

text: textinput , oauth: oauth}, function(err, resp) {
  if (!err) 
  
{
body = {
      "body":
        { "messageSegments":
          [ { "type":"Text", "text": args.text } ]
        },
        "feedElementType" : "FeedItem",
        "subjectId" : args.id
      }



let inputPrompt = assistant.buildInputPrompt(true, '<speak>You have just posted: ' + textinput  + '</speak>',
['Still there my friend?', 'Did you fall asleep again?', 'Come on Demen, I can/t hear you, are you talking to this Alexa again?']);
  assistant.ask(inputPrompt);

console.log('Your message has been posted my friend: ' + textinput);

}else  console.log('message could not be posted ' + err);
});

  }else {
    console.log('Error: ' + err.message );
  }
});





  }



  /*

  function rawInput (assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'bye') {
      assistant.tell('Okay, whatever man. I am just trying to help you know.');
    } else {


      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' +
        assistant.getRawInput() + '</say-as></speak>',
          ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
      assistant.ask(inputPrompt);
    }
  }
*/




  let actionMap = new Map();
  actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
  actionMap.set(assistant.StandardIntents.TEXT, rawInput);

  assistant.handleRequest(actionMap);
});

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]




/*

module.exports = function(nforce, pluginName) {

  if (!pluginName) pluginName = 'chatter';

  // throws if the plugin already exists
  var plugin = nforce.plugin(pluginName);

  plugin.fn('myNewsFeed', function(args, callback) {
    var opts = this._getOpts(args, callback);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feeds/record/me/feed-elements';
    opts.method = 'GET';
    return this._apiRequest(opts, opts.callback);
  });

}

*/




// Start the server

// [END app]
