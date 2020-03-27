const path = require('path');
const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.json());

app.get('/js/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/js/' + req.params.filename));
});

app.get('/style/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/css/' + req.params.filename));
});

app.get('/res/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/res/' + req.params.filename));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log("listening at PORT:" + PORT);
});