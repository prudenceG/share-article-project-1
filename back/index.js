const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
global.db = db;

const dataInterface = require('./data-interface');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/posts', (req, res) => {
  res.send(dataInterface.getPosts());
});

app.post('/posts', (req, res) => {
  res.send(dataInterface.createPost(req.body));
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get('posts')
    .remove({ id })
    .write();
  res.send('post deleted');
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

module.exports = app;
