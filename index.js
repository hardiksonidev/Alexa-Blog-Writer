const express = require('express');
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const { formatBlog } = require('./utils/formatBlog');
const { fetchMeta } = require('./utils/fetchMeta');

const app = express();
app.use(bodyParser.json());
// Add Alexa endpoint
const skillBuilder = require('./alexaSkill');
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const skill = skillBuilder.create();
const skillAdapter = new ExpressAdapter(skill, false, false);

app.post('/alexa', skillAdapter.getRequestHandlers());
let blogData = { title: '', paragraphs: [], references: [] };

app.post('/start', (req, res) => {
  blogData = { title: req.body.title, paragraphs: [], references: [] };
  res.send({ message: `Blog titled '${blogData.title}' started.` });
});

app.post('/paragraph', async (req, res) => {
  const para = req.body.paragraph;
  const polished = await polishText(para);
  blogData.paragraphs.push(polished);
  res.send({ message: 'Paragraph added.', polished });
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

async function polishText(text) {
  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Polish this paragraph:\n${text}` }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  return res.data.choices[0].message.content.trim();
}

async function publishToWordPress(title, content) {
  const wpUrl = `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`;
  const auth = Buffer.from(`${process.env.WORDPRESS_USER}:${process.env.WORDPRESS_APP_PASS}`).toString('base64');
  const res = await axios.post(
    wpUrl,
    {
      title,
      content,
      status: 'publish',
    },
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );
  return res.data;
}

app.listen(3000, () => console.log('Blog Writer running on port 3000'));
