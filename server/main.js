/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mustach = require('mustache');
const express = require('express');
const { env } = require('process');

const app = express();
const { PORT = 3000 } = env;

const template = fs.readFileSync(
  path.resolve(__dirname, 'views/index.hbs'),
  'utf8',
);

main();

function main() {
  app.use(express.json());

  app.get('/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../public/${req.params.filename}`));
  });

  app.get('*', (req, res) => {
    res.send(
      mustach.render(template, {}),
    );
  });

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}
