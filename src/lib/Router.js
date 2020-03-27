function Router() {
  const routes = {};

  return {
    onnavigate: () => {},
    /**
     * Adds new route
     * @param {string} path 
     * @param {function(Object, Object):void} callback 
     */
    add: function (path, callback) {
      routes[path] = callback;
    },
    /**
     * Nvigate to given path
     * @param {string} pathname 
     */
    navigate: function (pathname) {
      pathname = (typeof pathname === 'string' ? pathname : location.pathname);
      let route = (decodeURI(pathname)).split('/');
      let query = decodeURI(location.search.substr(1));
      const params = {};
      const queries = {};
      let callback;

      for (let path in routes) {
        let match = false;

        if (!path) {
          callback = routes[path];
          break;
        }

        let navigation = path.split('/');
        for (let i = 0; i < navigation.length; ++i) {
          const nav = navigation[i];
          if (nav === '*') {
            match = true;
            break;
          } else if (nav[0] === ':') {
            params[nav.substr(1)] = route[i];
            match = true;
            continue;
          } else if (nav === route[i]) {
            match = true;
            continue;
          } else if (nav !== route[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          callback = routes[path];
          break;
        }
      }

      if (callback) {
        if (query) {
          query = query.split('&');

          query.map(get => {
            get = get.split('=');
            queries[get[0]] = get[1];
          });
        }

        callback(params, queries);
      }
    },
    listen: function () {
      this.navigate(location.pathname);
      document.addEventListener('locationchange', this.navigate);
      document.body.addEventListener('click', listenForAncher);
      window.addEventListener('popstate', listenPopState);

      /**
       * 
       * @param {MouseEvent} e 
       */
      function listenForAncher(e) {

        const $el = e.target;

        if (!($el instanceof HTMLAnchorElement)) return;

        /**
         * @type {string}
         */
        const href = $el.getAttribute('href');
        const thisSite = new RegExp(`(^https?:\/\/(www\.)?${location.hostname}(\/\.*)?)|(^\/)`);

        if (!thisSite.test(href)) return;

        e.preventDefault();

        if (href !== location.pathname) history.pushState(history.state, document.title, href);
        document.dispatchEvent(new CustomEvent('locationchange'));

        if (this.onnavigate) this.onnavigate(href);
      }

      function listenPopState() {
        const path = location.pathname;
        document.dispatchEvent(new CustomEvent('locationchange'));

        if (this.onnavigate) this.onnavigate(path);
      }
    },

    /**
     * Load module using webpack lazy loading
     * @param {string} name
     */
    loadModule: function (name, path) {
      //jshint ignore:start
      return eval(`import( /* webpackChunkName: "${name}" */ '${path}')`);
      //jshint ignore:end
    }
  };
}

export default Router;