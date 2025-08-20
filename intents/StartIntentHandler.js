const Alexa = require('ask-sdk-core');
const StartIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartIntent';
  },
  async handle(handlerInput) {
    const title = Alexa.getSlotValue(handlerInput.requestEnvelope, 'title');

   const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.blogTitle = title;
    sessionAttributes.blogContent = [];
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    const axios = require('axios');
    await axios.post('https://alexa-blog-writer.onrender.com/start', { title });
    const speakOutput = `Starting blog titled ${title}`;
    return handlerInput.responseBuilder.speak(speakOutput).reprompt("Please provide a paragraph.").getResponse();
  }
};

module.exports = StartIntentHandler;
