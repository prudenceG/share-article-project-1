const getPosts = () => {
  return global.db.get('posts').value();
};
const findPostByUrl = url => {
  console.log('url findPost', url)
  console.log('getPosts', getPosts());
  return getPosts().find(post => post.url === url);
}

const createPost = properties => {
  return global.db
    .get('posts')
    .push(properties)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
};
module.exports = {
  createPost,
  findPostByUrl,
  getPosts,
};
