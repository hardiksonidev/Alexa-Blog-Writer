const axios = require('axios');
async function publishToWordPress(title,content,excerpt) {
  const wpUrl = `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`;
  const auth = Buffer.from(`${process.env.WORDPRESS_USER}:${process.env.WORDPRESS_APP_PASS}`).toString('base64');
  const res = await axios.post(
    wpUrl,
    {
      title,
      content,
      excerpt,
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
module.exports = publishToWordPress;