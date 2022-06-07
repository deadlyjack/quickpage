/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktemplate"] = self["webpackChunktemplate"] || []).push([["src_pages_home_home_js"],{

/***/ "./node_modules/html-tag-js/dist/tag.js":
/*!**********************************************!*\
  !*** ./node_modules/html-tag-js/dist/tag.js ***!
  \**********************************************/
/***/ (function(module) {

eval("!function(e,t){ true?module.exports=t():0}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&\"object\"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,\"a\",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p=\"\",r(r.s=0)}([function(e,t,r){\"use strict\";function n(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if(\"undefined\"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e[\"@@iterator\"])return Array.from(e)}(e)||function(e,t){if(!e)return;if(\"string\"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);\"Object\"===r&&e.constructor&&(r=e.constructor.name);if(\"Map\"===r||\"Set\"===r)return Array.from(e);if(\"Arguments\"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e)||function(){throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e instanceof Element;if(!r&&\"string\"!=typeof e)throw new Error(\"\".concat(e,\" is invalid value of tag\"));var o=r?e:document.createElement(e);for(var i in t)if(void 0!==t[i])if(\"child\"===i){var u=t[i];o instanceof Node&&o.append(u)}else if(\"children\"==i&&Array.isArray(t[i]))o.append.apply(o,n(t[i]));else if(\"attr\"==i)for(var a in t[i])o.setAttribute(a,t[i][a]);else if(\"Object\"===t[i].constructor.name)for(var f in t[i])o[i][f]=t[i][f];else o[i]=t[i];return o}r.r(t),r.d(t,\"tag\",(function(){return i})),i.get=function(e){var t=document.querySelector(e);return t?i(t):null},i.getAll=function(e){var t=n(document.querySelectorAll(e));return t.map((function(e){i(e)})),t},i.parse=function(e){var t=i(\"div\");return t.innerHTML=e,1===t.childElementCount?i(t.firstElementChild):n(t.children)},i.template=function(e,t){if(t)for(var r in t)/^[a-z_][a-z0-9_\\-]*$/.test(r)&&(e=e.replace(new RegExp(\"{{\".concat(r,\"}}\"),\"g\"),t[r]));return e=e.replace(/{{[a-z_][a-z0-9_\\-]*}}/g,\"\")}}]).tag}));\n\n//# sourceURL=webpack://template/./node_modules/html-tag-js/dist/tag.js?");

/***/ }),

/***/ "./src/pages/home/home.scss":
/*!**********************************!*\
  !*** ./src/pages/home/home.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://template/./src/pages/home/home.scss?");

/***/ }),

/***/ "./src/pages/home/home.hbs":
/*!*********************************!*\
  !*** ./src/pages/home/home.hbs ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"<img src=\\\"{{logo}}\\\" alt=\\\"Logo\\\">\");\n\n//# sourceURL=webpack://template/./src/pages/home/home.hbs?");

/***/ }),

/***/ "./src/pages/home/home.js":
/*!********************************!*\
  !*** ./src/pages/home/home.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.scss */ \"./src/pages/home/home.scss\");\n/* harmony import */ var res_quickpage_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! res/quickpage-logo.png */ \"./src/res/quickpage-logo.png\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html-tag-js */ \"./node_modules/html-tag-js/dist/tag.js\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(html_tag_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mustache */ \"./node_modules/mustache/mustache.mjs\");\n/* harmony import */ var _home_hbs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home.hbs */ \"./src/pages/home/home.hbs\");\n\n\n\n\n\n\nfunction home() {\n  const html = mustache__WEBPACK_IMPORTED_MODULE_3__[\"default\"].render(_home_hbs__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    logo: res_quickpage_logo_png__WEBPACK_IMPORTED_MODULE_1__,\n  });\n  const $page = html_tag_js__WEBPACK_IMPORTED_MODULE_2___default()('div', {\n    className: 'page',\n    innerHTML: mustache__WEBPACK_IMPORTED_MODULE_3__[\"default\"].render(html, {}),\n    attr: {\n      'data-id': 'l4y9mqtw',\n    },\n  });\n\n  return {\n    render() {\n      main.innerHTML = '';\n      main.append($page);\n    },\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (home);\n\n\n//# sourceURL=webpack://template/./src/pages/home/home.js?");

/***/ }),

/***/ "./src/res/quickpage-logo.png":
/*!************************************!*\
  !*** ./src/res/quickpage-logo.png ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("module.exports = __webpack_require__.p + \"quickpage-logo.png\";\n\n//# sourceURL=webpack://template/./src/res/quickpage-logo.png?");

/***/ })

}]);