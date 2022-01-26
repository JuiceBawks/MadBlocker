import express from 'express';
const app = express();


const PORT = 3000;

import comicController from './controllers/comicController.js'

app.use(express.json());

app.get('/read', comicController.retrieveData, (req, res, next) => {
  res.status(200).setHeader('Content-Type', 'application/json').send(res.locals.readData);
});

app.get('*', comicController.retrieveData, comicController.getComic, (req, res, next) => {
  res.status(200).setHeader('Content-Type', 'text/html').send(res.locals.comic);
});

app.post('/getData/:name', comicController.getData, (req, res, next) => {
  res.status(200).setHeader('Content-Type', 'application/json').send(res.locals.data);
});

app.delete('/drop', comicController.dropData, (req, res, next) => {
  res.status(200).send("File's deleted boss");
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

