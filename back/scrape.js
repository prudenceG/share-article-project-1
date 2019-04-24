// install node-fetch and cheerio
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getMetaProperties = url => {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      const $ = cheerio.load(text)
      const title = 
        $('title').text() ||
        $('meta[property="og:title"]').attr('content') ||
        `Il n'y a pas de titre pour cet article`;
      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="Description"]').attr('content')||
        `Il n'y a pas de description pour cet article`;
      const imageURL =
        $('meta[property="og:image"]').attr('content') ||
        $('img')
          .first()
          .attr('src') ||
        `IL n'y a pas d'image pour illustrer cet article`;
        return { title, description, imageURL };
    })
}

module.exports = { getMetaProperties }