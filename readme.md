# Quickpage

Quickpage is github template for creating single page application with front-end routing. See demo at official page <https://quickpage.foxdebug.com>.

## Usage

Create github repository using this template.

## Documentation

### Start server

To start server to preview the application run following bash command

```bash
: yarn start
```

The server uses nodejs and expressjs for serving files. You can edit server src code in `server` directory.

### Add new page and components

#### Adding new page

To add a new page run following bash command in the teminal

```bash
: yarn new-page home
```

After adding new page you can see a new directory under `pages` directory which contains three files i.e. javascript, html and a hbs file, also you add a route in `src/main.js` for your newly added page.

```js
import home from 'pages/home/home';

router.add('/home', (params, queries)=>{
  home(params, queries).render();
});

```

Or you can use webpack lazy loading

```js

router.add('/home', (params, queries)=>{
  import(/* webpckChunkName: "home" */ 'pages/home/home')
  .then(module=>{
    const home = module.default();
    home(params, queries).render();
  });
});

```

#### Adding new component

To add a new component run following bash command in the teminal

```bash
: yarn new-component tile
```

After add component you can use that component in any other modules by using import statement.

```js

import tile from 'components/tile/tile';

function home(){
  //code
  list.appendChild(tile);
  console.log(tile);
  //code
}

```

The argument `pageName` and `componentName` shuld be valid javascript identifier. This cli is defined in `utils/create.js` file and uses some pre defined templates to create javascript, css and hbs file. These templates are in `utils/templates` directory.

### Remove or rename page and components

#### Remove

To remove previously added page use below command

```bash
: yarn remove-page home
```

To remove previously added component use below command

```bash
: yarn remove-component tile
```

#### Rename

To rename previously added page use below command

```bash
: yarn rename-page home about
```

To rename previously added component use below command

```bash
: yarn rename-component tile listItem
```
