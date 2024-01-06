/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const { env } = require('process');
const { existsSync } = require('fs');

const app = express();
const { PORT = 3000 } = env;

main();

function main() {
  app.use(express.json());

  app.get('/:filename', (req, res, next) => {
    const file = path.resolve(__dirname, `../public/${req.params.filename}`);
    if (existsSync(file)) {
      res.sendFile(file);
      return;
    }
    next();
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}
