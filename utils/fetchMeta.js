const axios = require('axios');
const ogs = require('open-graph-scraper');

async function fetchMeta(url) {
  try {
    const { result } = await ogs({ url });
    return {
      url,
      title: result.ogTitle || result.title || url,
    };
  } catch {
    return { url, title: url };
  }
}
module.exports = { fetchMeta };
