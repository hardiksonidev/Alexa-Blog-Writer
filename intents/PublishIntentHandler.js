// const Alexa = require('ask-sdk-core');
// const PublishIntentHandler = {
//   canHandle(handlerInput) {
//     return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
//            Alexa.getIntentName(handlerInput.requestEnvelope) === 'PublishIntent';
//   },
//   async handle(handlerInput) {
//     const axios = require('axios');
//     console.log("Paragraph slot value:", response.data.url);
//     const response = await axios.post('https://alexa-blog-writer.onrender.com/publish');
//     const speakOutput = `Your blog has been published. You can view it at ${response.data.url}`;
//     return handlerInput.responseBuilder.speak(speakOutput).getResponse();
//   }
// };
// module.exports = PublishIntentHandler;

// // const axios = require('axios');

// // const PublishIntentHandler = {
// //   canHandle(handlerInput) {
// //     const request = handlerInput.requestEnvelope.request;
// //     return request.type === 'IntentRequest' &&
// //            request.intent.name === 'PublishIntent';
// //   },
// //   async handle(handlerInput) {
// //     try {
// //       const title = 'My Day'; // You can extract this from the intent slots
// //       const paragraph = 'Today I walked in the park.';

// //       const response = await axios.post('https://alexa-blog-writer.onrender.com/publish', {
// //         title,
// //         paragraph
// //       });

// //       console.log('Publish response:', response.data);

// //       const speechText = `Your blog was published: ${response.data.message || 'Success!'}`;
// //       return handlerInput.responseBuilder
// //         .speak(speechText)
// //         .getResponse();
// //     } catch (error) {
// //       console.error('Publish error:', error.message);
// //       return handlerInput.responseBuilder
// //         .speak('There was an error publishing your blog.')
// //         .getResponse();
// //     }
// //   }
// // };

// // module.exports = PublishIntentHandler;

// const axios = require('axios');

// const PublishIntentHandler = {
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request;
//     return request.type === 'IntentRequest' &&
//            request.intent.name === 'PublishIntent';
//   },
//   async handle(handlerInput) {
//     try {
//       const title = '1 test';
//       const paragraph = 'Test paragraph from Alexa. 1';

//       // Hit your Express publish endpoint
//       const response = await axios.post('https://alexa-blog-writer.onrender.com/publish', {
//         title,
//         paragraph
//       });

//       const speechText = `Paragraph added: ${response.data?.message || 'Published successfully'}`;
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

const Alexa = require('ask-sdk-core');
const axios = require('axios');

const PublishIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'PublishIntent';
  },
  async handle(handlerInput) {
    try {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const title = sessionAttributes.blogTitle || 'Untitled';
    const content = sessionAttributes.blogContent?.join(' ') || '';
      // Send request to your backend
      const response = await axios.post('https://alexa-blog-writer.onrender.com/publish');

      console.log("Publish response:", response.data); // For debugging
      const blogUrl = response.data.url || 'https://blog.hardiksoni.dev';

      const speakOutput = `Your blog titled ${title} with content has been published. You can view it at ${blogUrl}`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();

    } catch (error) {
      console.error("Error in PublishIntent:", error);
      const speakOutput = `There was an error publishing your blog. Please try again later.`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
  }
};

module.exports = PublishIntentHandler;

