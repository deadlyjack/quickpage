import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __dirname = process.cwd();
const arg = process.argv[2];
const babelrcPath = resolve(__dirname, '../.babelrc');

let babelrc;

try {
  babelrc = readFileSync(babelrcPath, 'utf8');
  if (babelrc) babelrc = JSON.parse(babelrc);
} catch (error) {
  babelrc = null;
}

if (arg === 'd') {
  if (babelrc) babelrc.compact = false;
} else if (arg === 'p') {
  if (babelrc) babelrc.compact = true;
}

if (babelrc) {
  babelrc = JSON.stringify(babelrc, undefined, 2);
  writeFileSync(babelrcPath, babelrc, 'utf8');
}
process.exit(0);
