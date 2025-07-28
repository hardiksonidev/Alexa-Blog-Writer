// const alexaTest = require('alexa-skill-test-framework');
// alexaTest.initialize(
//   require('./index'), // Alexa handler
//   'amzn1.ask.skill.3091e61f-e1e1-4ebd-8de9-8dc4b3ecbaa5', // Skill ID
//   'amzn1.ask.account.AMA3NP2IGVNZPQ3QGGIEHCWYS3HZWBLQCALH6LPCBQQOPWMSH2GH6OCNBOBKTICQ4XUZJG5NTH357SJMW34H3XKMNHV7BFZUP7INL3WCIXLJKANJVIEPRT5GTG2PQN2F4TAZH2KVQZKDNUWNYGIU3DY4SR7L3R5YTDVLPHE4L3HGGWVGYYEMYBUOCDLJBDJBCUJRPCH6LP242KDJXZCRVNODEDCHZBCH4VU2O4RYOI' // User ID
// );

// describe('LaunchRequest Test', () => {
//   alexaTest.test([
//     {
//       request: alexaTest.getLaunchRequest(),
//       says: 'Welcome to Blog Creator Skill!',
//       shouldEndSession: true
//     }
//   ]);
// });

const alexaTest = require('alexa-skill-test-framework');
const skillHandler = require('./alexaSkill'); // This must be the exported handler function

alexaTest.initialize(
  skillHandler,
  'amzn1.ask.skill.3091e61f-e1e1-4ebd-8de9-8dc4b3ecbaa5', // Skill ID
  'amzn1.ask.account.AMA3NP2IGVNZPQ3QGGIEHCWYS3HZWBLQCALH6LPCBQQOPWMSH2GH6OCNBOBKTICQ4XUZJG5NTH357SJMW34H3XKMNHV7BFZUP7INL3WCIXLJKANJVIEPRT5GTG2PQN2F4TAZH2KVQZKDNUWNYGIU3DY4SR7L3R5YTDVLPHE4L3HGGWVGYYEMYBUOCDLJBDJBCUJRPCH6LP242KDJXZCRVNODEDCHZBCH4VU2O4RYOI' // User ID
);

describe("LaunchRequest Test", function () {
  it("returns the correct responses", function () {
    alexaTest.test([
      {
        request: alexaTest.getLaunchRequest(),
        says: "Welcome to the Blog Writer", // your expected speech response
        shouldEndSession: false
      }
    ]);
  });
});


// StartIntent
describe('StartIntent Test', () => {
  alexaTest.test([
    {
      request: alexaTest.getIntentRequest('StartIntent'),
      says: 'Sure! What is your blog topic?',
      shouldEndSession: false
    }
  ]);
});

// const alexaTest = require('alexa-skill-test-framework');
// const skillHandler = require('./alexaSkill'); // This must be the exported handler function

// alexaTest.initialize(
//   skillHandler,
//   'amzn1.ask.skill.3091e61f-e1e1-4ebd-8de9-8dc4b3ecbaa5', // Skill ID
//   'amzn1.ask.account.AMA3NP2IGVNZPQ3QGGIEHCWYS3HZWBLQCALH6LPCBQQOPWMSH2GH6OCNBOBKTICQ4XUZJG5NTH357SJMW34H3XKMNHV7BFZUP7INL3WCIXLJKANJVIEPRT5GTG2PQN2F4TAZH2KVQZKDNUWNYGIU3DY4SR7L3R5YTDVLPHE4L3HGGWVGYYEMYBUOCDLJBDJBCUJRPCH6LP242KDJXZCRVNODEDCHZBCH4VU2O4RYOI' // User ID
// );

// // Launch Request
// describe('LaunchRequest Test', () => {
//   alexaTest.test([
//     {
//       request: alexaTest.getLaunchRequest(),
//       says: 'Welcome to Blog Writer! Say "Start blog" to begin.',
//       shouldEndSession: false
//     }
//   ]);
// });

// // StartIntent
// describe('StartIntent Test', () => {
//   alexaTest.test([
//     {
//       request: alexaTest.getIntentRequest('StartIntent'),
//       says: 'Sure! What is your blog topic?',
//       shouldEndSession: false
//     }
//   ]);
// });

// // ParagraphIntent
// describe('ParagraphIntent Test', () => {
//   alexaTest.test([
//     {
//       request: alexaTest.getIntentRequest('ParagraphIntent', {
//         paragraph: 'This is a test paragraph about AI and future tech.'
//       }),
//       says: 'Great! What would you like to add next?',
//       shouldEndSession: false
//     }
//   ]);
// });

// // ReferenceIntent
// describe('ReferenceIntent Test', () => {
//   alexaTest.test([
//     {
//       request: alexaTest.getIntentRequest('ReferenceIntent', {
//         reference: 'According to OpenAI...'
//       }),
//       says: 'Got it. Anything else to include?',
//       shouldEndSession: false
//     }
//   ]);
// });

// // PublishIntent
// describe('PublishIntent Test', () => {
//   alexaTest.test([
//     {
//       request: alexaTest.getIntentRequest('PublishIntent'),
//       says: 'Your blog has been published successfully!',
//       shouldEndSession: true
//     }
//   ]);
// });
