function Router() {
  const routes = {};
  const listeners = {
    navigate: [],
  };
  const locationChanged = () => { document.dispatchEvent(new CustomEvent('locationchange')); };
  let onnavigate;
  let lastPath;

  return {
    set onnavigate(listener) {
      onnavigate = listener;
    },
    get onnavigate() {
      return onnavigate;
    },
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
     * @param {string} url
     */
    navigate(url) {
      const { location } = window;
      url = (typeof url === 'string' ? url : location.pathname);

      const route = (decodeURI(url)).split('/');
      let query = decodeURI(location.search.substring(1));
      const params = {};
      const queries = {};
      let callback;
      let matchedPath; // Current rout

      Object.keys(routes).every((path) => {
        let match = false;

        if (!path) {
          callback = routes[path];
          return false;
        }

        const navigation = path.split('/');
        const navLen = navigation.length;
        const routLen = route.length;
        const len = navLen > routLen ? navLen : routLen;
        for (let i = 0; i < len; ++i) {
          const nav = navigation[i];
          const routeSeg = route[i];

          if (nav === null || nav === undefined) {
            match = false;
            break;
          }

          if (nav === '*') {
            match = true;
            break;
          } else if (nav.startsWith(':')) {
            const IS_OPTIONAL = nav.endsWith('?');
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
          matchedPath = path;
          callback = routes[path];
          return false;
        }

        return true;
      });

      const changed = lastPath !== matchedPath;
      lastPath = matchedPath;

      if (typeof this.onnavigate === 'function') this.onnavigate(url, changed);
      listeners.navigate.forEach((listener) => listener(url, changed));

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
      const { location } = window;
      this.navigate(location.pathname);
      document.addEventListener('locationchange', () => this.navigate());
      document.body.addEventListener('click', listenForAncher);
      window.addEventListener('popstate', () => {
        locationChanged();
      });

      /**
       *
       * @param {MouseEvent} e
       */
      function listenForAncher(e) {
        const $el = e.target;

        if (!($el instanceof HTMLAnchorElement)) return;
        e.preventDefault();

        /**
         * @type {string}
         */
        const href = $el.getAttribute('href');
        Router.loadUrl(href);
      }
    },
    /**
     *
     * @param {"navigate"} event
     * @param {function(url):void} listener
     */
    on(event, listener) {
      listeners[event] = listener;
    },
    /**
     *
     * @param {"navigate"} event
     * @param {function(url):void} listener
     */
    off(event, listener) {
      const index = listeners[event].indexOf(listener);
      listeners[event].splice(index, 1);
    },
  };
}

/**
 *
 * @param {string} href
 */
Router.loadUrl = (href) => {
  const { location, history } = window;
  const thisSite = new RegExp(`(^https?://(www.)?${location.hostname}(/.*)?)|(^/)`);
  if (!thisSite.test(href)) {
    window.location.href = href;
  }
  if (href !== location.pathname) {
    history.pushState(history.state, document.title, href);
    document.dispatchEvent(new CustomEvent('locationchange'));
  }
};

export default Router;
