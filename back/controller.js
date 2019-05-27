const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtsecret');
const { getMetaProperties } = require('./scrape');
const dataInterface = require('./data-interface');

const getPosts = (req, res) => {
  res.status(201).send(dataInterface.getPosts());
};

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

const deletePost = async (req, res) => {
  const { id } = req.params;
  dataInterface.deletePost(id)
  res.status(201).send(`post number: ${id} has been deleted`)
};

const createUser = async (req, res) => {
  const user = req.body
  const findUser = dataInterface.findUserByEmail(user.email)
  if (findUser) {
    res.status(400).send('Cet utilisateur existe déjà')
  } else {
    bcrypt.hash(user.password, 10, function(err, hash) {
      const newUser = {
        ...user,
        password: hash,
        favorites: []
      }
      res.status(201).send(dataInterface.createUser(newUser))
    });
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body
  const findUser = dataInterface.findUserByEmail(email)
  if (findUser) {
    bcrypt.compare(password, findUser.password, function(err, decoded) {
      if (decoded) {
        const tokenInfo = {
          id: findUser.id,
          pseudo: findUser.pseudo
        };
        const token = jwt.sign(tokenInfo, jwtSecret);
        res.send(token);
      } else {
        res.send(err);
      }
    });
  }
}

module.exports = { getPosts, createPost, getPreview, deletePost, createUser, loginUser };