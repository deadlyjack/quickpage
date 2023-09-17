/* eslint-disable no-console */
import express, { json } from 'express';
import { readFileSync } from 'fs';
import path, { resolve } from 'path';
import { env } from 'process';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

config();
const __dirname = fileURLToPath(path.dirname(import.meta.url));
const app = express();
const { PORT = 3000 } = env;

const template = readFileSync(
  resolve(__dirname, 'index.html'),
  'utf8',
);

main();

function main() {
  app.use(json());

  app.get('/:filename', (req, res) => {
    res.sendFile(resolve(__dirname, `../public/${req.params.filename}`));
  });

  app.get('*', (req, res) => {
    res.send(template);
  });

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}
