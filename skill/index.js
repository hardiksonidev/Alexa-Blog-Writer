const StartIntentHandler = require('./handlers/StartIntentHandler');
const ParagraphIntentHandler = require('./handlers/ParagraphIntentHandler');
const PublishIntentHandler = require('./handlers/PublishIntentHandler');
module.exports = [
  StartIntentHandler,
  ParagraphIntentHandler,
  PublishIntentHandler
];
