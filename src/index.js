'use strict';

// ***************** SETUP *************************************************
var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.c2e7ec9b-8566-4ae2-b148-30464bfdeb89"

// ***************** RESPONSE CONSTANTS ************************************
var  BENDER_QUOTES = [
    "Bite my shiny metal ass",
    "We're boned",
    "Bender is great",
    "Neat!",
    "Fun on the bun",
    "Kill all humans",
    "Another job well done",
    "I'm back, baby!",
    "Shut up you, I know it",
    "Let's go already!",
    "Cheese it!",
    "Hot diggidy daffodil!",
    "I'm bender baby!"
  ]
var BENDER_40 = "I'm 40% [item]";
var WELCOME_MESSAGE = "Do the Bender!";
var HELP_MESSAGE = "Bite my shiny metal ass";
var STOP_MESSAGE = "Bite Me!"

// ****************** HANDLER FUNCTIONS *************************************
var handleLaunchIntent = function() {
  this.attributes['speechOutput'] = WELCOME_MESSAGE;
  this.attributes['repromptSpeech'] = "I said, " + WELCOME_MESSAGE;
  this.emit(':tell', 
    this.attributes['speechOutput'],  
    this.attributes['repromptSpeech']);
}

var handleHelpIntent = function() {
  this.attributes['speechOutput'] = HELP_MESSAGE;
  this.attributes['repromptSpeech'] = "I said, " + HELP_MESSAGE;
  this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
}

var handleRepeatIntent = function() {
  this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
}

var handleStopIntent = function() {
  this.emit(':tell', STOP_MESSAGE);
}

var handleGetQuoteIntent = function() {
  var QuoteIndex = Math.floor(Math.random() * BENDER_QUOTES.length);
  var speechOutput = BENDER_QUOTES[QuoteIndex];

  this.attributes['speechOutput'] = speechOutput
  this.attributes['repromptSpeech'] = "I said, " + speechOutput;
  this.emit(':tell', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
}

var handleGetFortyPercentIntent = function() {
  var phrase = this.event.request.intent.slots.FortyPercent.value;
  var speechOutput = BENDER_40.replace('[item]', phrase);
  
  this.attributes['speechOutput'] = speechOutput
  this.attributes['repromptSpeech'] = "I said, " + speechOutput;
  this.emit(':tell', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
}


// ************** MAP HANDLERS ************************************
var handlers = {
  'LaunchRequest': handleLaunchIntent,
  'GetQuoteIntent': handleGetQuoteIntent,
  'GetFortyPercent': handleGetFortyPercentIntent,
  'AMAZON.RepeatIntent': handleRepeatIntent,
  'AMAZON.StopIntent': handleStopIntent,
  'AMAZON.CancelIntent': handleStopIntent,
  'AMAZON.HelpIntent': handleHelpIntent
}

// **************** DEFINE LAMBDA **********************************
exports.handler = function(event, context) {
   var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
}