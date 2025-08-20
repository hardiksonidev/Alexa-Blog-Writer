const Alexa = require('ask-sdk-core');
const StartIntentHandler = require('./intents/StartIntentHandler');
const ParagraphIntentHandler = require('./intents/ParagraphIntentHandler');
const PublishIntentHandler = require('./intents/PublishIntentHandler');
// Added from vs code
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log('LaunchRequest triggered');
    const speakOutput = 'Welcome to Blog Writer. You can say start a blog to begin.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt('You can say publish my blog.')
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('You can say publish blog to publish your writing.')
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Error handled globally: ${error.message}`, error.stack);
    return handlerInput.responseBuilder
      .speak('Sorry, something went wrong.')
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartIntentHandler,
    ParagraphIntentHandler,
    PublishIntentHandler,
    require('ask-sdk-core').HelpIntentHandler,
    require('ask-sdk-core').CancelAndStopIntentHandler,
    require('ask-sdk-core').SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
