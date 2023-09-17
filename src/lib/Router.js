export default class Router {
  static #customEvent = new CustomEvent('locationchange');
  #routes = {};
  #beforeNavigate = {};
  #lastPath = '/';
  #on = {
    navigate: [],
  };
  onnavigate;

  /**
   * Add route to router
   * @param {string} path path to listen
   * @param {NavigationCallback} callback callback to call when path is matched
   */
  add(path, callback) {
    this.#routes[path] = callback;
  }

  /**
   * Navigate to given path
   * @param {string} url
   */
  navigate(url) {
    const { location } = window;
    url = typeof url === 'string' ? url : location.pathname;
    url = url.toLowerCase();
    const allCallbacks = [];

    Object.keys(this.#beforeNavigate).forEach((path) => {
      if (url.startsWith(path)) {
        const callbacks = this.#beforeNavigate[path];
        if (Array.isArray(callbacks)) {
          allCallbacks.push(...callbacks);
        }
      }
    });

    allCallbacks.push(() => {
      this.#navigate(url);
    });

    Router.#callWithNext(allCallbacks, url);
  }

  #navigate(url) {
    const routes = Object.keys(this.#routes);

    for (let i = 0; i < routes.length; ++i) {
      const path = routes[i];
      try {
        const route = this.#routes[path];
        const [params, queries] = Router.#execRoute(path, url);
        const changed = this.#lastPath !== path;
        this.#lastPath = path;
        route(params, queries);

        if (typeof this.onnavigate === 'function') {
          this.onnavigate(url, changed);
        }

        this.#on.navigate.forEach((listener) => listener(url, changed));
        break;
      } catch (error) {
        // not matched
      }
    }
  }

  /**
   * Add listener for navigate event
   */
  listen() {
    const { location } = window;
    this.navigate(location.pathname);
    document.addEventListener('locationchange', () => this.navigate());
    document.body.addEventListener('click', Router.#listenForAnchor);
    window.addEventListener('popstate', () => {
      document.dispatchEvent(Router.#customEvent);
    });
  }

  /**
   * Add event listener
   * @param {'navigate'} event
   * @param {function(string):void} callback
   */
  on(event, callback) {
    if (event in this.#on) {
      this.#on[event].push(callback);
    }
  }

  /**
   * Removes event listener
   * @param {'navigate'} event
   * @param {function(string):void} callback
   */
  off(event, callback) {
    if (event in this.#on) {
      this.#on[event].splice(this.#on[event].indexOf(callback), 1);
    }
  }

  /**
   *
   * @param {import('./RouterExtension').default} router
   */
  use(router) {
    const { routes, beforeNavigateCallbacks } = router;
    Object.keys(routes).forEach((path) => {
      this.add(path, routes[path]);
    });

    beforeNavigateCallbacks.forEach(({ path, callback }) => {
      if (!this.#beforeNavigate[path]) this.#beforeNavigate[path] = [];
      this.#beforeNavigate[path].push(callback);
    });
  }

  /**
   *
   * @param {Array<any>} callbacks
   * @param {string} url
   */
  static #callWithNext(callbacks, url) {
    const callback = callbacks.shift();
    if (callback) {
      callback(url, next);
    }

    function next() {
      Router.#callWithNext(callbacks);
    }
  }

  /**
   * Test if given path matches the given route
   * @param {string} route route to be tested on
   * @param {string} path path to test
   */
  static #execRoute(route, path) {
    // if path starts with : then it is a param
    // if param ends with ? then it is optional
    // if param pattern is 'param(path1|path2)' then value can be path1 or path2
    // if param pattern is 'param(path1|path2)?' then value can be path1 or path2 or empty
    // if route is * then it is a wildcard
    const queryString = window.location.search.substring(1);

    const params = {};
    const queries = {};
    const routeSegments = route.split('/');
    const pathSegments = path.split('/');

    queryString?.split('&').forEach((get) => {
      const [key, value] = get.split('=');
      queries[key] = value;
    });

    const len = Math.max(routeSegments.length, pathSegments.length);

    for (let i = 0; i < len; ++i) {
      const routeSegment = routeSegments[i];
      const pathSegment = pathSegments[i];

      if (routeSegment === undefined) {
        return null;
      }

      if (routeSegment === '*') {
        return [params, queries]; // wildcard
      }

      if (routeSegment.startsWith(':')) {
        const IS_OPTIONAL = routeSegment.endsWith('?');
        const IS_ALLOWED = IS_OPTIONAL && !pathSegment;
        const cleanRouteSegment = IS_OPTIONAL
          ? routeSegment.slice(1, -1)
          : routeSegment.slice(1);
        const key = cleanRouteSegment.replace(/\(.*\)$/, '');
        const execValue = /\((.+)\)/.exec(cleanRouteSegment);
        if (Array.isArray(execValue)) {
          const regex = new RegExp(execValue[1]);
          if (IS_ALLOWED || regex.test(pathSegment)) {
            params[key] = pathSegment;
          } else {
            return null;
          }
        } else if (IS_ALLOWED || pathSegment) {
          params[key] = pathSegment;
        } else {
          return null;
        }
      } else if (routeSegment !== pathSegment) {
        return null;
      }
    }
    return [params, queries];
  }

  /**
   * Listens for click event on anchor tag
   * @param {MouseEvent} e
   * @returns
   */
  static #listenForAnchor(e) {
    const $el = e.target;

    if (!($el instanceof HTMLAnchorElement)) return;
    if ($el.target === '_blank') return;

    e.preventDefault();

    /**
     * @type {string}
     */
    const href = $el.getAttribute('href');
    Router.loadUrl(href);
  }

  static loadUrl(href) {
    const { location, history } = window;
    const thisSite = new RegExp(
      `(^https?://(www.)?${location.hostname}(/.*)?)|(^/)`,
    );
    if (!thisSite.test(href)) {
      window.location.href = href;
    }

    const currentUrl = location.pathname + location.search;
    if (href !== currentUrl) {
      history.pushState(history.state, document.title, href);
      document.dispatchEvent(Router.#customEvent);
    }
  }
}
