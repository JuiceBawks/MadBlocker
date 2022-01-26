const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;

const comicController = require('./comicController.js');

app.use(express.json());

app.get('*', comicController.getComic, (req, res, next) => {
  res.send('It Worked!');
});

app.use((err, req, res, next) => {
  const defErr = {
    log: 'Express caught an unknown middleware error',
    status: 400,
    message: {err: 'Error in middleware'}
  };

  const errObj = Object.assign({}, defErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
