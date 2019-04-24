// link between scrape.js and my db data-interface
// controllers like in Angular call routes
// I choose to import all file dataInterface because I need all functions inside

const { getMetaProperties } = require('./scrape');
const dataInterface = require('./data-interface');

const getPosts = (req, res) => {
  res.send(dataInterface.getPosts());
};

// send properties (title, img, description) of the url
const getPreview = async (req, res) => {
  const url = req.body.url
  const currentPost = await getMetaProperties(url);
  res.status(201).send(currentPost);
}

const createPost = async (req, res) => {
  const url = req.body.url
  if (dataInterface.findPostByUrl(url)) {
    res.send(403, {error: 'Cet article existe déjà'})
  } else {
    const properties = {...(await getMetaProperties(url)), url};
    dataInterface.createPost(properties);
    res.status(201).send(properties)

  }
}

module.exports = { getPosts, createPost, getPreview };