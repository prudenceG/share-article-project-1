const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtsecret');
const { getMetaProperties } = require('./scrape');
const dataInterface = require('./data-interface');
const getToken = require('./getToken');

const getPosts = (req, res) => {
  const id = req.params.id;
  const token = getToken(req);
  if (token === null) {
    res.status(401).json({ message: 'You are not authorized' });
  }
  const decoded = jwt.verify(token, jwtSecret);
  if (decoded.id === id) {
    res.status(201).send(dataInterface.getPosts());
  } else {
    res.status(404).send('Unauthorized');
  }
};

const getPreview = async (req, res) => {
  const url = req.body.url;
  const currentPost = await getMetaProperties(url);
  res.status(201).send(currentPost);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  res.status(201).send(dataInterface.findUserById(id));
};

const createPost = async (req, res) => {
  const { id, url } = req.body;
  const token = getToken(req);
  if (token === null) {
    res.status(401).json({ message: 'You are not authorized' });
  } else {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.id === id) {
      if (dataInterface.findPostByUrl(url)) {
        res.send(403, { error: 'Cet article existe déjà' });
      } else {
        const user = dataInterface.findUserById(id);
        const pseudo = user.pseudo;
        const properties = {
          ...(await getMetaProperties(url)),
          url,
          pseudoUser: pseudo,
          idUser: id,
        };
        dataInterface.createPost(properties);
        res.status(201).send(properties);
      }
    } else {
      res.status(401).json({ message: 'You are not authorized' });
    }
  }
};

const addFavorites = async (req, res) => {
  const { userId, postId } = req.body;
  const token = getToken(req);
  if (token === null) {
    res.status(401).json({ message: 'You are not authorized' });
  } else {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.id === userId) {
      const user = dataInterface.findUserById(userId);
      const userFavorites = user.favorites;
      const newUser = {
        ...user,
        favorites: [...userFavorites, postId],
      };
      const newUserFavorites = newUser.favorites;
      dataInterface.addPost(newUserFavorites, userId);
      res
        .status(201)
        .json({ message: 'Article added in user favorites array' });
    } else {
      res.status(401).json({ message: 'You are not authorized' });
    }
  }
};

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const token = getToken(req);
  if (token === null) {
    res.status(401).json({ message: 'You are not authorized' });
  } else {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded) {
      const user = dataInterface.findUserById(decoded.id);
      const userFavorites = user.favorites;
      let newFavorites = [];
      userFavorites.map(favorite => {
        if (favorite === id) {
          newFavorites = [...newFavorites];
        } else {
          newFavorites = [...newFavorites, favorite];
        }
      });
      dataInterface.deleteFavorite(newFavorites, decoded.id);
      let allFavorites = [];
      await newFavorites.map(favorite => {
        const getOneFavorite = dataInterface.getPostsById(favorite);
        allFavorites = [...allFavorites, getOneFavorite];
      });
      res.status(201).send({ allFavorites, newFavorites });
    } else {
      res.status(401).json({ message: 'You are not authorized' });
    }
  }
};

const getFavorites = async (req, res) => {
  const { id } = req.params;
  const user = dataInterface.findUserById(id);
  const favoritesId = user.favorites;
  let allFavorites = [];
  await favoritesId.map(favorite => {
    const getOneFavorite = dataInterface.getPostsById(favorite);
    allFavorites = [...allFavorites, getOneFavorite];
  });
  res.status(201).send({ allFavorites, favoritesId });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  dataInterface.deletePost(id);
  res.status(201).send(`post number: ${id} has been deleted`);
};

const createUser = async (req, res) => {
  const user = req.body;
  const findUser = dataInterface.findUserByEmail(user.email);
  if (findUser) {
    res.status(400).send('Cet utilisateur existe déjà');
  } else {
    bcrypt.hash(user.password, 10, function(err, hash) {
      const newUser = {
        ...user,
        password: hash,
        favorites: [],
      };
      res.status(201).send(dataInterface.createUser(newUser));
    });
  }
};

const loginUser = async (req, res) => {
  console.log('LOGIN');
  const { email, password } = req.body;
  const findUser = dataInterface.findUserByEmail(email);
  if (findUser) {
    bcrypt.compare(password, findUser.password, function(err, decoded) {
      console.log('decoded', decoded);
      if (decoded) {
        const tokenInfo = {
          id: findUser.id,
          pseudo: findUser.pseudo,
        };
        const token = jwt.sign(tokenInfo, jwtSecret);
        res.status(201).json({ token: `${token}`, id: `${findUser.id}` });
      } else {
        console.log('WRONG')
        res.status(404).send('wrong password');
      }
    });
  } else {
    res.status(404).send('user not found');
  }
};

module.exports = {
  getPosts,
  createPost,
  getPreview,
  deletePost,
  createUser,
  loginUser,
  addFavorites,
  getFavorites,
  getUser,
  deleteFavorite,
};
