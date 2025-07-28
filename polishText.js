const axios = require('axios');
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

module.exports = polishText;
