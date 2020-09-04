const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

const {
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
} = require('./controller');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/posts/:id', getPosts);

app.get('/users/:id', getUser);

app.get('/favorites/:id', getFavorites);

app.post('/post', getPreview);

app.post('/posts', createPost);

app.delete('/posts/:id', deletePost);

app.post('/users', createUser);

app.post('/login', loginUser);

app.post('/post/favorite', addFavorites);

app.delete('/favorites/:id', deleteFavorite);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

module.exports = app;
