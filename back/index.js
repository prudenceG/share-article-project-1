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
  loginUser
} = require('./controller');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/posts', getPosts);

app.post('/post', getPreview);

app.post('/posts', createPost);

app.delete('/posts/:id', deletePost);

app.post('/users', createUser);

app.post('/login', loginUser);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

module.exports = app;
