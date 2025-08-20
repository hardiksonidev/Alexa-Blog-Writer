// const StartIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'StartIntent';
//   },
//   handle(handlerInput) {
//     const speakOutput = 'Welcome to the Blog Writer! Please tell me your first paragraph.';
    
//     return handlerInput.responseBuilder
//       .speak(speakOutput)
//       .reprompt('I\'m listening. Please say your first paragraph.')
//       .getResponse();
//   }
// };
const Alexa = require('ask-sdk-core');
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

module.exports = StartIntentHandler;
