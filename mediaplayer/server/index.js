const express = require('express');
const bodyParser = require('body-parser');

const Songs = require('../database/Songs.js')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/songs', function(req, res) {
  console.log('req.query is ', req.query);
  Songs.find({songId: req.query.id})
    .then((results) => {
      res.status(200).send(results[0]);
    });
});

app.listen(port, () => {
  console.log(`MediaPlayer server running on port ${port}`);
});
