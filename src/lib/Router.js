function Router() {
  const routes = {};

  return {
    onnavigate: () => {},
    /**
     * Adds new route
     * @param {string} path
     * @param {function(Object, Object):void} callback
     */
    add(path, callback) {
      routes[path] = callback;
    },
    /**
     * Nvigate to given path
     * @param {string} pathname
     */
    navigate(pathname) {
      const { location } = window;
      pathname = (typeof pathname === 'string' ? pathname : location.pathname);
      const route = (decodeURI(pathname)).split('/');
      let query = decodeURI(location.search.substr(1));
      const params = {};
      const queries = {};
      let callback;

      Object.keys(routes).every((path) => {
        let match = false;

        if (!path) {
          callback = routes[path];
          return false;
        }

        const navigation = path.split('/');
        for (let i = 0; i < navigation.length; ++i) {
          const nav = navigation[i];
          const routeSeg = route[i];
          if (nav === '*') {
            match = true;
            break;
          } else if (nav[0] === ':') {
            const IS_OPTIONAL = nav.substr(-1) === '?';
            const IS_ALLOWED = IS_OPTIONAL && !routeSeg;
            const cleanNav = IS_OPTIONAL ? nav.slice(1, -1) : nav.slice(1);
            const key = cleanNav.replace(/\(.*\)$/, '');
            const execValue = /\((.+)\)/.exec(cleanNav);
            if (Array.isArray(execValue)) {
              const regex = new RegExp(execValue[1]);
              if (IS_ALLOWED || regex.test(routeSeg)) {
                match = true;
              } else {
                match = false;
                break;
              }
            } else if (IS_ALLOWED || routeSeg) {
              match = true;
            } else {
              match = false;
              break;
            }
            params[key] = routeSeg || '';
          } else if (nav === routeSeg) {
            match = true;
          } else if (new RegExp(nav).test(routeSeg)) {
            match = true;
          } else if (nav !== routeSeg) {
            match = false;
            break;
          }
        }

        if (match) {
          callback = routes[path];
          return false;
        }

        return true;
      });

      if (callback) {
        if (query) {
          query = query.split('&');

          query.forEach((get) => {
            get = get.split('=');
            [, queries[get[0]]] = get;
          });
        }

        callback(params, queries);
      }
    },
    listen() {
      const { location, history } = window;
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
        const thisSite = new RegExp(`(^https?://(www.)?${location.hostname}(/.*)?)|(^/)`);

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
  };
}

export default Router;
