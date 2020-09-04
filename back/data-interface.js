const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const getPosts = () => {
  return db.get('posts').value();
};

const getPostsById = postId => {
  return db
    .get('posts')
    .find({ id: postId })
    .value();
};
const findPostByUrl = url => {
  return getPosts().find(post => post.url === url);
};

const createPost = properties => {
  return db
    .get('posts')
    .push(properties)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
};

const addPost = (addFavorites, userId) => {
  return db
    .get('users')
    .find({ id: userId })
    .assign({ favorites: addFavorites })
    .write();
};

const deleteFavorite = (newFavorites, userId) => {
  return db
    .get('users')
    .find({ id: userId })
    .assign({ favorites: newFavorites })
    .write();
};

const deletePost = id => {
  return db
    .get('posts')
    .remove({ id })
    .write();
};

const findUserByEmail = email => {
  return db
    .get('users')
    .value()
    .find(user => user.email === email);
};

const findUserById = id => {
  return db
    .get('users')
    .value()
    .find(user => user.id === id);
};

const createUser = user => {
  return db
    .get('users')
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
};

module.exports = {
  addPost,
  createPost,
  createUser,
  deletePost,
  findPostByUrl,
  findUserByEmail,
  findUserById,
  getPosts,
  getPostsById,
  deleteFavorite,
};
