// alexaSkill.js
const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to Blog Writer. You can say start a blog to begin.';
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

// StartIntent Handler
const StartIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartIntent';
  },
  async handle(handlerInput) {
    const title = Alexa.getSlotValue(handlerInput.requestEnvelope, 'title');
    const axios = require('axios');
    await axios.post('https://alexa-blog-writer.onrender.com/start', { title });
    const speakOutput = `Starting blog titled ${title}. What's your first paragraph?`;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

// ParagraphIntent Handler
const ParagraphIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'ParagraphIntent';
  },
  async handle(handlerInput) {
    const paragraph = Alexa.getSlotValue(handlerInput.requestEnvelope, 'paragraph');
    const axios = require('axios');
    const response = await axios.post('https://alexa-blog-writer.onrender.com/paragraph', { paragraph });
    const speakOutput = `Paragraph added. Would you like to add another?`;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

// ReferenceIntent Handler
const ReferenceIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReferenceIntent';
  },
  async handle(handlerInput) {
    const url = Alexa.getSlotValue(handlerInput.requestEnvelope, 'url');
    const axios = require('axios');
    await axios.post('https://alexa-blog-writer.onrender.com/reference', { url });
    const speakOutput = `Reference from the URL has been added. Do you want to publish the blog now?`;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

// PublishIntent Handler
const PublishIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'PublishIntent';
  },
  async handle(handlerInput) {
    const axios = require('axios');
    const response = await axios.post('https://alexa-blog-writer.onrender.com/publish');
    const speakOutput = `Your blog has been published. You can view it at ${response.data.url}`;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You can start a blog, add paragraphs, references, and then publish. What would you like to do?';
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder
      .speak('Sorry, I had trouble doing what you asked. Please try again.')
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartIntentHandler,
    ParagraphIntentHandler,
    ReferenceIntentHandler,
    PublishIntentHandler,
    HelpIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();

// module.exports = skill;
