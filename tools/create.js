/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

const args = process.argv.slice(2);
const [action, arg1, arg2, arg3] = args;
const SRC_PATH = path.resolve(__dirname, '../src');
const TMPLT = path.resolve(__dirname, './templates');
const VALID_NAME = /^[$A-Z_][0-9A-Z_$]*$/i;

const actions = {
  add(type, name = '') {
    if (!name || !VALID_NAME.test(name)) {
      console.error(`Invalid name '${name}'`);
      this.help();
      process.exit(1);
    }

    let template;
    let filePath;
    let mode;
    if (['p', 'page'].includes(type)) {
      mode = 'p';
      template = `${TMPLT}/page/`;
      filePath = `${SRC_PATH}/pages/${name}/`;

      if (!fs.existsSync(`${SRC_PATH}/pages/`)) fs.mkdirSync(`${SRC_PATH}/pages/`);
    } else if (['c', 'components'].includes(type)) {
      mode = 'c';
      template = `${TMPLT}/component/`;
      filePath = `${SRC_PATH}/components/${name}/`;

      if (!fs.existsSync(`${SRC_PATH}/components/`)) fs.mkdirSync(`${SRC_PATH}/components/`);
    }

    if (!mode) return this.help();

    const SCRIPT_PATH = `${template}script.temp`;
    const STYLE_PATH = `${template}style.temp`;
    const ID = uuid();

    const SCRIPT = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const STYLE = fs.readFileSync(STYLE_PATH, 'utf8');

    const script = mustache.render(SCRIPT, {
      __NAME: name,
      __ID: ID,
    });
    const style = mustache.render(STYLE, {
      __ID: ID,
    });

    fs.mkdir(filePath, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      writeFile(`${filePath + name}.js`, script);
      writeFile(`${filePath + name}.scss`, style);
      writeFile(`${filePath + name}.hbs`, '');
      process.exit(0);
    });

    return true;
  },
  remove(type, name) {
    if (!VALID_NAME.test(name)) {
      console.error(`Invalid name '${name}'`);
      process.exit(1);
    }

    let filePath;
    let mode;
    if (['p', 'page'].includes(type)) {
      mode = 'p';
      filePath = `${SRC_PATH}/pages/${name}/`;
    } else if (['c', 'components'].includes(type)) {
      mode = 'c';
      filePath = `${SRC_PATH}/components/${name}/`;
    }

    if (!mode) return this.help();

    fs.rmdir(filePath, {
      recursive: true,
    }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    return true;
  },
  rename(type, name, newname) {
    let filePath;
    let newpath;
    if (['p', 'page'].includes(type)) {
      filePath = `${SRC_PATH}/pages/${name}/`;
      newpath = `${SRC_PATH}/pages/${newname}/`;
    } else if (['c', 'components'].includes(type)) {
      filePath = `${SRC_PATH}/components/${name}/`;
      newpath = `${SRC_PATH}/components/${newname}/`;
    }

    fs.rename(filePath, newpath, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      fs.renameSync(`${newpath + name}.js`, `${newpath + newname}.js`);
      fs.renameSync(`${newpath + name}.scss`, `${newpath + newname}.scss`);
      fs.renameSync(`${newpath + name}.hbs`, `${newpath + newname}.hbs`);

      process.exit(0);
    });
  },
  help() {
    console.log("Use 'add c' to add new component.");
    console.log("Use 'remove c' to remove a component.");
    console.log("Use 'add p' to add new page.");
    console.log("Use 'remove p' to remove page.");
    process.exit(0);
  },
};

if (action in actions) {
  actions[action](arg1, arg2, arg3);
}

/**
 * Returns unique ID
 * @returns {string}
 */
function uuid() {
  return (new Date().getTime() + parseInt(Math.random() * 10 ** 10, 10)).toString(36);
}

function writeFile(filePath, data) {
  fs.writeFileSync(filePath, data, 'utf8');
}
