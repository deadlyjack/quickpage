const path = require('path');
const fs = require('fs');

const arg = process.argv[2];
const wbcpath = path.resolve(__dirname, '../webpack.config.js');
const babelrcpath = path.resolve(__dirname, '../.babelrc');

let wbc = fs.readFileSync(wbcpath, 'utf8');
let babelrc;

try {
  babelrc = fs.readFileSync(babelrcpath, 'utf8');
  if (babelrc) babelrc = JSON.parse(babelrc);
} catch (error) {
  babelrc = null;
}

if (babelrc) babelrc = JSON.parse(babelrc);

if (arg === 'd') {
  wbc = wbc.replace(/mode: '.*'/, "mode: 'development'");
  if (babelrc) babelrc.compact = false;
} else if (arg === 'p') {
  wbc = wbc.replace(/mode: '.*'/, "mode: 'production'");
  if (babelrc) babelrc.compact = true;
}

fs.writeFileSync(wbcpath, wbc, 'utf8');
if (babelrc) {
  babelrc = JSON.stringify(babelrc, undefined, 2);
  fs.writeFileSync(babelrcpath, babelrc, 'utf8');
}
process.exit(0);