/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const { env } = require('process');

const app = express();
const { PORT } = env;

main();

function main() {
  app.use(express.json());

  app.get('/js/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../public/js/${req.params.filename}`));
  });

  app.get('/:dir(css|style)/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../public/css/${req.params.filename}`));
  });

  app.get('/res/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../public/res/${req.params.filename}`));
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });

  app.get('*', (req, res) => {
    res.sendStatus(404, 'File not found');
  });

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}
