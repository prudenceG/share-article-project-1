const getPosts = () => {
  console.log(global.db.get('posts').value());
  return global.db.get('posts').value();
};

const createPost = properties => {
  return global.db
    .get('posts')
    .push(properties)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
};
module.exports = {
  getPosts,
  createPost,
};
