// const Alexa = require('ask-sdk-core');
// const axios = require('axios');

// const ParagraphIntentHandler = {
//   canHandle(handlerInput) {
//     return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
//            Alexa.getIntentName(handlerInput.requestEnvelope) === 'ParagraphIntent';
//   },
//   async handle(handlerInput) {
//     try {
//       const slot = handlerInput.requestEnvelope.request.intent.slots.paragraph;
// const paragraph = slot && slot.value ? slot.value : null;
//       // const paragraph = Alexa.getSlotValue(handlerInput.requestEnvelope, 'paragraph');
//       console.log('Paragraph slot value:', paragraph);
//       if (!paragraph) {
//         return handlerInput.responseBuilder
//           .speak("I didn't catch the topic. Please try again.")
//           .getResponse();
//       }
//       const response = await axios.post('https://alexa-blog-writer.onrender.com/paragraph', {
//         paragraph: paragraph
//       });
//       const paragraph = response.data?.paragraph || "Sorry, I couldn't generate a paragraph at this time.";

//       console.log('POST response from API:', response.data);

//       const speakOutput = `Paragraph added: ${paragraph}. Would you like to add another?`;
//       return handlerInput.responseBuilder.speak(speakOutput).getResponse();

//     } catch (error) {
//       console.error('Error in ParagraphIntentHandler:', error.message, error.stack);
//       return handlerInput.responseBuilder
//         .speak('There was an error adding your paragraph. Please try again later.')
//         .getResponse();
//     }
//   }
// };

// module.exports = ParagraphIntentHandler;
const Alexa = require('ask-sdk-core');
const axios = require('axios');

const ParagraphIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ParagraphIntent';
  },
  async handle(handlerInput) {
    try {
      // const paragraph1212 = Alexa.getSlotValue(handlerInput.requestEnvelope, 'paragraph');
      const slot = handlerInput.requestEnvelope.request.intent.slots.paragraph;
      const paragraph = slot && slot.value ? slot.value : null;
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

      if (!sessionAttributes.blogContent) {
        sessionAttributes.blogContent = [];
      }
      sessionAttributes.blogContent.push(paragraph);
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      console.log("Paragraph slot value:", paragraph);
      // console.log("Paragraph slot value:", paragraph1212);

      if (!paragraph) {
        return handlerInput.responseBuilder
          .speak("I didn't catch the topic. Please try saying it again.")
          .reprompt("What should I write the paragraph about?")
          .getResponse();
      }

      const response = await axios.post('https://alexa-blog-writer.onrender.com/paragraph', { paragraph });

      //const polished = response.data?.paragraph || response.data?.polished ? `${response.data?.paragraph || response.data?.polished} Paragraph added. Would you like to add another?` : "Sorry, I couldn't generate a paragraph at this time."; //`Paragraph added. Would you like to add another?` + response.data?.paragraph || response.data?.polished || "Sorry, I couldn't generate a paragraph at this time.";
      const speakOutput = response.data?.paragraph || response.data?.polished ? `Added paragraph for ${paragraph}. Would you like to add another or publish the blog?` : "Sorry, I couldn't generate a paragraph at this time.";
    
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt("Say add paragraph or publish blog.").getResponse();

    } catch (error) {
      console.error("Error in ParagraphIntentHandler:", error);
      return handlerInput.responseBuilder
        .speak("There was an error adding your paragraph. Please try again later.")
        .getResponse();
    }
  }
};

module.exports = ParagraphIntentHandler;
