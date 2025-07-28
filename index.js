const express = require('express');
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const { formatBlog } = require('./utils/formatBlog');
const { fetchMeta } = require('./utils/fetchMeta');
const Alexa = require('ask-sdk-core');
const app = express();
app.use(bodyParser.json());
// Add Alexa endpoint
const skillBuilder = Alexa.SkillBuilders.custom();
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const handlers = require('./skill');

const skill = skillBuilder
  .addRequestHandlers(...handlers)
  .create();

const skillAdapter = new ExpressAdapter(skill, false, false);

app.post('/alexa', skillAdapter.getRequestHandlers());
let blogData = { title: '', paragraphs: [], references: [] };

app.post('/start', (req, res) => {
  blogData = { title: req.body.title, paragraphs: [], references: [] };
  res.send({ message: `Blog titled '${blogData.title}' started.` });
});

// app.post('/paragraph', async (req, res) => {
//   try {
//     const { paragraph } = req.body;
//     if (!paragraph) {
//       return res.status(400).json({ error: 'Paragraph is required' });
//     }

//     const polished = await polishText(paragraph);
//     res.json({ polished });
//   } catch (err) {
//     console.error('Error handled:', err.response?.data || err.message);
//     res.status(500).json({
//       version: '1.0',
//       response: {
//         outputSpeech: {
//           type: 'SSML',
//           ssml: '<speak>Sorry, I had trouble doing what you asked. Please try again.</speak>',
//         },
//       },
//       userAgent: 'ask-node/2.14.0 Node/v20.19.0',
//       sessionAttributes: {},
//     });
//   }
// });

// app.post('/paragraph', async (req, res) => {
//   try {
//     console.log('Incoming body:', req.body);

//     const para = req.body.paragraph;
//     if (!para || typeof para !== 'string') {
//       console.error('Invalid paragraph input:', para);
//       return res.status(400).send({ error: 'Invalid paragraph input.' });
//     }

//     console.log('Calling polishText with:', para);
//     const polished = await polishText(para);
//     console.log('Polished text:', polished);

//     blogData.paragraphs.push(polished);
//     res.send({ message: 'Paragraph added.', polished });
//   } catch (error) {
//     console.error('Error in /paragraph:', error); // 👈 this will now log full error
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

app.post('/paragraph', async (req, res) => {
  try {
    const { paragraph } = req.body;

    if (!paragraph) {
      return res.status(400).json({ error: 'Paragraph missing' });
    }

    console.log('Received paragraph:', paragraph);

    // Simulate saving or processing paragraph
    res.json({ success: true, message: 'Paragraph received!' });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send('Internal Server Error');
  }
});






app.post('/reference', async (req, res) => {
  const meta = await fetchMeta(req.body.url);
  blogData.references.push(meta);
  res.send({ message: 'Reference added.', meta });
});

app.post('/publish', async (req, res) => {
  const content = formatBlog(blogData);
  const result = await publishToWordPress(blogData.title, content);
  res.send({ message: 'Published.', url: result.link });
});

// async function polishText(text) {
  
//   const res = await axios.post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: `Polish this paragraph:\n${text}` }],
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     }
//   );
//   return res.data.choices[0].message.content.trim();
// }

async function polishText(text) {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Polish this paragraph:\n${text}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI API Error:', err.response?.data || err.message);
    throw err;
  }
}


// async function publishToWordPress(title, content) {
//   const wpUrl = `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`;
//   const auth = Buffer.from(`${process.env.WORDPRESS_USER}:${process.env.WORDPRESS_APP_PASS}`).toString('base64');
//   const res = await axios.post(
//     wpUrl,
//     {
//       title,
//       content,
//       status: 'publish',
//     },
//     {
//       headers: {
//         Authorization: `Basic ${auth}`,
//       },
//     }
//   );
//   return res.data;
// }

app.listen(3000, () => console.log('Blog Writer running on port 3000'));
