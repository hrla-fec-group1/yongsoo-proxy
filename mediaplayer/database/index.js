const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/mediaplayer';
// const mongoUri = 'mongodb://mongo:27017';

const db = mongoose.connect(mongoUri, { useMongoClient: true });

module.exports = db;