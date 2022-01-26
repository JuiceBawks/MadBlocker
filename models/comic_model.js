import mongoose from 'mongoose';

//The schema so far is just the text inside the ad headers we can find so far which is a string

const madSchema = new mongoose.Schema({
  comic_title: {type: String, required: true},
  image_url: {type: String, required: true}
});

export default mongoose.model('madComic', madSchema);
