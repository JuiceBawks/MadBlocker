const AD = require('./models/AD_model');
const mongoose = require('mongoose');


const comicController = {};

comicController.getComic = function(req, res, next) {  

  console.log('help')
  fetch("https://comicvine.gamespot.com/api/search/?api_key=8604af845804563b4ef5a3b8b0f2ece0345e98c5&format=json&&query=mad")
    .then(DBres => DBres.json())
    .then(DBres => {
        res.locals = DBres;
        return next();
    })
    .catch(err => next({
      log: `comicController getComic ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      err: {error: 'Error at comicController getComic. Check logs for more details'}
    }));

  next();
}

module.exports = comicController;
