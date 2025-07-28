// const axios = require('axios');
// const Alexa = require('ask-sdk-core');
// const ParagraphIntentHandler = {
//   canHandle(handlerInput) {
//     return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
//       Alexa.getIntentName(handlerInput.requestEnvelope) === 'ParagraphIntent';
//   },
//   async handle(handlerInput) {
//     const paragraph = Alexa.getSlotValue(handlerInput.requestEnvelope, 'paragraph');
    
//     try {
//       console.log('Sending paragraph:', paragraph);

//       const response = await axios.post('https://alexa-blog-writer.onrender.com/paragraph', {
//         paragraph
//       });
//       console.log('Response data:', response.data); // <— Add this line to see the structure

// // console.log('Sending paragraph:', paragraph);

//       const speechText = `Paragraph added: ${response.data.polished || paragraph}`;
//       return handlerInput.responseBuilder
//         .speak(speechText)
//         .getResponse();
//     } catch (error) {
//       console.error('Error handling paragraph:', error.message);
//       return handlerInput.responseBuilder
//         .speak('Sorry, there was a problem adding your paragraph.')
//         .getResponse();
//     }
//   }
// };

// module.exports = ParagraphIntentHandler;

const polishText = require('../../polishText'); // adjust path if needed
require('dotenv').config();
const ParagraphIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ParagraphIntent';
  },
  async handle(handlerInput) {
    const paragraph = handlerInput.requestEnvelope.request.intent.slots.paragraph.value;
    
    let polished;
    try {
      polished = paragraph;// await polishText(paragraph);
    } catch (error) {
      polished = paragraph; // fallback to original
    }

    const speechText = `Paragraph added: ${polished}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};
module.exports = ParagraphIntentHandler;
