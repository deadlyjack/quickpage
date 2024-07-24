/* eslint-disable no-console */
import express from 'express';
import { env } from 'process';
import { resolve } from 'path';
import { json } from 'express';
import { config } from 'dotenv';
import { existsSync } from 'fs';

config();
const app = express();
const { PORT = 3000 } = env;
const currentDir = process.cwd();

app.use(json());

app.get('/:filename', (req, res, next) => {
  const file = resolve(currentDir, `public/${req.params.filename}`);
  if (existsSync(file)) {
    res.sendFile(file);
    return;
  }
  next();
});

app.get('*', (req, res) => {
  res.sendFile(resolve(currentDir, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
