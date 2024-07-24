/* eslint-disable global-require */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import open from 'open';
import { exec } from 'child_process';
import { env } from 'process';
import { config } from 'dotenv';

config();
const { PORT = 3000 } = env;
const inspect = process.argv.includes('--inspect');
let serverStarted = false;

const configProcess = exec('node .vscode/config.js d', processHandler);
configProcess.on('exit', build);

function build() {
  const buildProcess = exec(`webpack --watch --mode development`, processHandler);
  buildProcess.stdout.on('data', writeStdout);
  buildProcess.stderr.on('data', writeStderr);
}

function start() {
  const nodemonProcess = exec(`nodemon ${inspect ? '--inspect' : ''} --watch server server/main -q`, processHandler);
  nodemonProcess.stdout.on('data', writeStdout);
  nodemonProcess.stderr.on('data', writeStderr);
  open(`http://localhost:${PORT}`);
}

function processHandler(err) {
  if (err) console.error(err);
}

function writeStdout(data) {
  console.log(data.trim());
  if (!serverStarted && /webpack \d+\.\d+\.\d+ compiled .*successfully.*/.test(data)) {
    serverStarted = true;
    start();
  }
}

function writeStderr(data) {
  console.error(data);
}
