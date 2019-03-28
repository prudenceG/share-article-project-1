const express = require('express');
const low = require('lowdb');
const bodyParser = require('body-parser');
const FileAsync = require('lowdb/adapters/FileAsync');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const adapter = new FileAsync('db.json');
low(adapter)
  .then(db => {
    // GET /posts
    app.get('/posts', (req, res) => {
      const post = db.get('posts').value();
      res.send(post);
    });
    // POST /posts
    app.post('/posts', (req, res) => {
      db.get('posts')
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(post => res.status(200).send(post));
    });
    return db.defaults({}).write();
  })

  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  });

module.exports = app;
