const axios = require('axios');
const Alexa = require('ask-sdk-core');
const ParagraphIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ParagraphIntent';
  },
  async handle(handlerInput) {
    const paragraph = Alexa.getSlotValue(handlerInput.requestEnvelope, 'paragraph');
    
    try {
      console.log('Sending paragraph:', paragraph);

      const response = await axios.post('https://alexa-blog-writer.onrender.com/paragraph', {
        paragraph
      });
console.log('Sending paragraph:', paragraph);

      const speechText = `Paragraph added: ${response.data.polished}`;
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    } catch (error) {
      console.error('Error handling paragraph:', error.message);
      return handlerInput.responseBuilder
        .speak('Sorry, there was a problem adding your paragraph.')
        .getResponse();
    }
  }
};

module.exports = ParagraphIntentHandler;
