const mongoose = require('mongoose');

//The schema so far is just the text inside the ad headers we can find so far which is a string

const ADSchema = new mongoose.Schema({
  adHeader: {type: String, required: true}
});

module.exports = mongoose.model('AD', ADSchema);
