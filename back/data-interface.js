const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const getPosts = () => {
  return db.get('posts').value();
};
const findPostByUrl = url => {
  return getPosts().find(post => post.url === url);
}

const createPost = properties => {
  return db
    .get('posts')
    .push(properties)
    .last()
    .assign({id: Date.now().toString()})
    .write();
};

const deletePost = (id) => {
  return db
    .get('posts')
    .remove({ id })
    .write();
};

const findUserByEmail = (email) => {
  return db
    .get('users')
    .value()
    .find(user => user.email === email)
}

const createUser = (user) => {
  return db
    .get('users')
    .push(user)
    .last()
    .assign({id: Date.now().toString()})
    .write();
}

module.exports = {
  createPost,
  findPostByUrl,
  getPosts,
  deletePost,
  createUser,
  findUserByEmail
};
