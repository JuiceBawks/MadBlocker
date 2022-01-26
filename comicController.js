import fetch from 'node-fetch';
// import mongoose from 'mongoose';

const comicController = {};

comicController.getComic = function(req, res, next) {  

  fetch("https://comicvine.gamespot.com/api/search/?api_key=8604af845804563b4ef5a3b8b0f2ece0345e98c5&format=json&&query=mad")
    .then(DBres => DBres.json())
    .then(DBres => {
        res.locals = DBres.results;
        return next();
    })
    .catch(err => next({
      log: `comicController getComic ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      err: {error: 'Error at comicController getComic. Check logs for more details'}
    }));

}

export default comicController;
