export default class RouterExtension {
  #base = '';
  #routes = {};
  #beforeNavigate = [];
  constructor(base) {
    this.#base = base;
  }

  /**
   * Add route
   * @param {string} path
   * @param {NavigationCallback} callback
   */
  add(path, callback) {
    path = this.#base + (path.startsWith('/') ? path : `/${path}`);
    // remove duplicate slashes
    path = path.replace(/\/+/g, '/');
    this.#routes[path] = callback;
  }

  beforeNavigate(callback) {
    this.#beforeNavigate.push({
      callback,
      path: this.#base,
    });
  }

  get routes() {
    return {
      ...this.#routes,
    };
  }

  get beforeNavigateCallbacks() {
    return [
      ...this.#beforeNavigate,
    ];
  }
}
