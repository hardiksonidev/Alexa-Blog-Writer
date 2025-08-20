// const publishToWordPress = require('../../publishToWordPress');

// const PublishIntentHandler = {
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request;
//     return request.type === 'IntentRequest' &&
//            request.intent.name === 'PublishIntent';
//   },
//   async handle(handlerInput) {
//     try {
//       const paragraph = "Test paragraph from Alexa. 1"; // Simulate getting paragraph from session
      
//       const response = await publishToWordPress('1 test',paragraph);
      
//       const speechText = `Paragraph added: ${response.data?.polished || paragraph}`;
//       return handlerInput.responseBuilder
//         .speak(speechText)
//         .getResponse();

//     } catch (error) {
//       console.error('Alexa publish error:', error.message);
//       return handlerInput.responseBuilder
//         .speak('Sorry, I was unable to publish your blog due to a server error. Please try again later.')
//         .getResponse();
//     }
//   },
// };

// module.exports = PublishIntentHandler;


const axios = require('axios');

const PublishIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'PublishIntent';
  },
  async handle(handlerInput) {
    try {
      const title = '1 test';
      const paragraph = 'Test paragraph from Alexa. 1';

      // Hit your Express publish endpoint
      const response = await axios.post('https://alexa-blog-writer.onrender.com/publish', {
        title,
        paragraph
      });

      const speechText = `Paragraph added: ${response.data?.message || 'Published successfully'}`;
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();

    } catch (error) {
      console.error('Alexa publish error:', error.message);
      return handlerInput.responseBuilder
        .speak('Sorry, I was unable to publish your blog due to a server error. Please try again later.')
        .getResponse();
    }
  },
};

module.exports = PublishIntentHandler;