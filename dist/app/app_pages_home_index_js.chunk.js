"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkquickpage"] = self["webpackChunkquickpage"] || []).push([["app_pages_home_index_js"],{

/***/ "./app/pages/home/index.js":
/*!*********************************!*\
  !*** ./app/pages/home/index.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-tag-js */ \"./node_modules/html-tag-js/dist/tag.js\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html_tag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ \"./app/pages/home/style.scss\");\n\n\nfunction home() {\n  var count = html_tag_js__WEBPACK_IMPORTED_MODULE_0___default().use(0);\n  var onclick = function onclick() {\n    ++count.value;\n  };\n  return html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()(\"section\", {\n    id: 'home',\n    children: [\"\\n    \", html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()(\"span\", {\n      className: 'counter',\n      children: [\"\\n      Count: \", html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()(\"strong\", {\n        children: [count]\n      }), \" times clicked\\n    \"]\n    }), \"\\n    \", html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()(\"button\", {\n      onclick: onclick,\n      type: 'button',\n      children: [\"Click\"]\n    }), \"\\n  \"]\n  });\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (home);\n\n//# sourceURL=webpack://quickpage/./app/pages/home/index.js?");

/***/ }),

/***/ "./app/pages/home/style.scss":
/*!***********************************!*\
  !*** ./app/pages/home/style.scss ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://quickpage/./app/pages/home/style.scss?");

/***/ })

}]);