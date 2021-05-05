/* eslint-disable global-require */
/* eslint-disable no-console */
require('dotenv').config();
const open = require('open');
const { exec } = require('child_process');
const { env } = require('process');

const { PORT } = env;
const inspect = process.argv.includes('--inspect');

const configProcess = exec('node ./tools/config.js d', processHandler);
configProcess.on('exit', build);

function build(watch) {
  const buildProcess = exec(`webpack ${watch ? '--watch' : ''}`, processHandler);
  if (!watch) buildProcess.on('close', start);
  buildProcess.stdout.on('data', writeStdout);
  buildProcess.stderr.on('data', writeStderr);
}

function start() {
  const nodemonProcess = exec(`nodemon ${inspect ? '--inspect' : ''} --watch server server/main -q`, processHandler);
  nodemonProcess.stdout.on('data', writeStdout);
  nodemonProcess.stderr.on('data', writeStderr);
  open(`http://localhost:${PORT}`);
  build(true);
}

function processHandler(err) {
  if (err) console.error(err);
}

function writeStdout(data) {
  console.log(data.trim());
}

function writeStderr(data) {
  console.error(data);
}
