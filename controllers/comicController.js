import fetch from 'node-fetch';
import mongoose from 'mongoose';
import madComic from '../models/comic_model.js';

mongoose.connect('mongodb+srv://Juice:juice@cluster0.e17ez.mongodb.net/Cluster0?retryWrites=true&w=majority');

const comicController = {};


comicController.retrieveData = function(req, res, next) {
  madComic.find({}, function(err, comic) {
    if(err) {
      next({
        log: `comicController retrieve data ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        err: {error: 'Error at comicController retrieve data. Check logs for more details'}
      });
    }
    res.locals.readData = comic;
    next();
  })
};


comicController.getComic = function(req, res, next) {  
  try {
    const max = res.locals.readData.length;
    let randomNum = Math.floor(Math.random() * (max + 1));
    while (randomNum === 10) {
      randomNum = Math.floor(Math.random() * (max + 1));
    }
    const randomComic = res.locals.readData[randomNum].image_url;
    res.locals.comic = `<img src = ${randomComic}></img>`;

    next();
  } catch (err) {
    next({
      log: `comicController getComic ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      err: {error: 'Error at comicController getComic. Check logs for more details'}
    });
  } 
};


comicController.getData = function(req, res, next) {
  fetch(`https://comicvine.gamespot.com/api/search/?api_key=8604af845804563b4ef5a3b8b0f2ece0345e98c5&format=json&query=${req.params.name}`)
    .then(resp => resp.json())
    .then(resp => {
      res.locals.data = [];
      resp.results.forEach(comic => {
        if (!comic.name) comic.name = 'n/a';
        res.locals.data.push({comic_title: comic.name, image_url: comic.image.medium_url});
        madComic.create({comic_title: comic.name, image_url: comic.image.medium_url});
      });
      next();
    })
    .catch(err => next({
      log: `comicController getData ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      err: {error: 'Error at comicController getData. Check logs for more details'}
    }));
};


comicController.dropData = async function(req, res, next) {
  await madComic.deleteMany({});
  next();
};

export default comicController;
