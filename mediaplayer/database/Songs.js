const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const songSchema = new mongoose.Schema({
  songId: Number,
  title: String,
  artist: String,
  created: Date,
  category: String,
  waveData: Array,
  audio: String,
  duration: Number,
  albumArt: String,
  comments: Array,
});

const Songs = mongoose.model('Songs', songSchema);

module.exports = Songs;