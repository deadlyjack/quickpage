const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const args = process.argv.slice(2);
const [action, arg1, arg2, arg3] = args;
const SRC_PATH = path.resolve(__dirname, '../src');
const TMPLT = path.resolve(__dirname, './templates');
const MAIN_STYLE = path.resolve(__dirname, '../src/main.scss');
const VALID_NAME = /^[$A-Z_][0-9A-Z_$]*$/i;
const MARK_C = '/*{{Component import}}*/';

const actions = {
  "add": function (type, name = '') {

    if (!name || !VALID_NAME.test(name)) {
      console.error("Invalid name '" + name + "'");
      this.help();
      process.exit(1);
    }

    let template, path, mode;
    if (['p', 'page'].includes(type)) {
      mode = 'p';
      template = TMPLT + '/page/';
      path = SRC_PATH + '/pages/' + name + '/';

      if (!fs.existsSync(SRC_PATH + '/pages/'))
        fs.mkdirSync(SRC_PATH + '/pages/');

    } else if (['c', 'components'].includes(type)) {
      mode = 'c';
      template = TMPLT + '/component/';
      path = SRC_PATH + '/components/' + name + '/';

      if (!fs.existsSync(SRC_PATH + '/components/'))
        fs.mkdirSync(SRC_PATH + '/components/');
    }

    if (!mode)
      return this.help();

    const SCRIPT_PATH = template + 'script.temp';
    const STYLE_PATH = template + 'style.temp';
    const ID = uuid();

    const SCRIPT = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const STYLE = fs.readFileSync(STYLE_PATH, 'utf8');

    const script = mustache.render(SCRIPT, {
      __NAME: name,
      __ID: ID
    });
    const style = mustache.render(STYLE, {
      __ID: ID
    });

    fs.mkdir(path, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      writeFile(path + name + '.js', script);
      writeFile(path + name + '.scss', style);
      writeFile(path + name + '.hbs', '');
      if (mode === 'c') {
        const importStmnt = getImportStmnt(mode, name);
        let maincss = fs.readFileSync(MAIN_STYLE, 'utf8');
        maincss = maincss.replace(MARK_C, importStmnt + '\n' + MARK_C);
        fs.writeFileSync(MAIN_STYLE, maincss, 'utf8');
      }
      process.exit(0);
    });
  },
  "remove": function (type, name) {
    if (!VALID_NAME.test(name)) {
      console.error("Invalid name '" + name + "'");
      process.exit(1);
    }

    let path, mode;
    if (['p', 'page'].includes(type)) {
      mode = 'p';
      path = SRC_PATH + '/pages/' + name + '/';
    } else if (['c', 'components'].includes(type)) {
      mode = 'c';
      path = SRC_PATH + '/components/' + name + '/';
    }

    if (!mode)
      return this.help();

    fs.rmdir(path, {
      recursive: true
    }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      if (mode === 'c') {
        const importStmnt = getImportStmnt(mode, name);
        let maincss = fs.readFileSync(MAIN_STYLE, 'utf8');
        maincss = maincss.replace(importStmnt + '\n', '');
        fs.writeFileSync(MAIN_STYLE, maincss, 'utf8');
      }
    });
  },
  "rename": function (type, name, newname) {
    let path, newpath, mode;
    if (['p', 'page'].includes(type)) {
      mode = 'p';
      path = SRC_PATH + '/pages/' + name + '/';
      newpath = SRC_PATH + '/pages/' + newname + '/';
    } else if (['c', 'components'].includes(type)) {
      mode = 'c';
      path = SRC_PATH + '/components/' + name + '/';
      newpath = SRC_PATH + '/components/' + newname + '/';
    }


    fs.rename(path, newpath, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      fs.renameSync(newpath + name + '.js', newpath + newname + '.js');
      fs.renameSync(newpath + name + '.scss', newpath + newname + '.scss');
      fs.renameSync(newpath + name + '.hbs', newpath + newname + '.hbs');

      if (mode === 'c') {
        const oldImportStmnt = getImportStmnt(mode, name);
        const newImportStmnt = getImportStmnt(mode, newname);
        let maincss = fs.readFileSync(MAIN_STYLE, 'utf8');
        maincss = maincss.replace(oldImportStmnt, newImportStmnt);
        fs.writeFileSync(MAIN_STYLE, maincss, 'utf8');
      }

      process.exit(0);
    });

  },
  "help": function () {
    console.log("Use 'add c' to add new component.");
    console.log("Use 'remove c' to remove a component.");
    console.log("Use 'add p' to add new page.");
    console.log("Use 'remove p' to remove page.");
    process.exit(0);
  }
};

if (action in actions) {
  actions[action](arg1, arg2, arg3);
}

/**
 * Returns unique ID
 * @returns {string}
 */
function uuid() {
  return (new Date().getTime() + parseInt(Math.random() * 100000000000)).toString(36);
}

function writeFile(path, data) {
  fs.writeFileSync(path, data, 'utf8');
}

function getImportStmnt(mode, name) {
  return `@import './${mode === 'p' ? 'pages' : 'components'}/${name}/${name+'.scss'}';`;
}