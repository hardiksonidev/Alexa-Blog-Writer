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

module.exports = LaunchRequestHandler;
