/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(elements){\n    this.elements = elements;\n  }\n  \n  html(str=null) {\n    if(str !== null)\n      this.elements.forEach((el)=>el.innerHTML=str);\n    else\n      return this.elements[0].innerHTML;\n  }\n  \n  empty() {\n    this.elements.forEach((el)=>el.innerHTML=\"\");\n  }\n  \n  append(input){\n    this.elements.forEach((element)=>{\n      if(input instanceof HTMLElement)\n        element.innerHTML += input.outerHTML;\n      else if (el instanceof DOMNodeCollection)\n        input.elements.forEach((e)=>element.innerHTML += e.outerHTML);\n      else if (typeof el == 'string')\n        element.innerHTML += el;\n    });\n  }\n  \n  attr(type, value = null){\n    let res = [];\n    this.elements.forEach((element)=>{\n      if(value === null)\n        res += element.getAttribute(type);\n      else\n        element.setAttribute(type, value);\n    });\n    if(value === null)\n      return;\n    return res;\n  }\n  \n  addClass(name){\n    this.elements.forEach((element)=>{\n      let arr = element.getAttribute('class').split(' ');\n      let idx = arr.indexOf(name);\n      if(idx < 0)\n        arr.push(name);\n      element.setAttribute('class', arr.join(' '));\n    });\n  }\n  \n  removeClass(name){\n    this.elements.forEach((element)=>{\n      let arr = element.getAttribute('class').split(' ');\n      let idx = arr.indexOf(name);\n      if(idx >= 0){\n        arr.splice(idx, 1);\n      }\n      if(arr.length === 0)\n        element.removeAttribute('class');\n      else{\n        element.setAttribute('class', arr.join(' '));\n      }\n    });\n  }\n  \n  children(){\n    return this.find('*');\n  }\n  \n  parent(){\n    let arr = [];\n    this.elements.forEach((el)=>{\n      arr.push(el.parentElement);\n    });\n    return new DOMNodeCollection(arr);\n  }\n  \n  find(selector){\n    let arr = [];\n    this.elements.forEach((el)=>{\n      arr.push(...[].slice.call(el.querySelectorAll(selector)));\n    });\n    return new DOMNodeCollection(arr);\n  }\n  \n  remove(){\n    this.elements.forEach((el)=>el.outerHTML=\"\");\n    this.elements = [];\n  }\n  \n  on(action, func){\n    this.elements.forEach((el)=>{\n      el.addEventListener(action, func);\n    });\n  }\n  \n  off(action, func){\n    this.elements.forEach((el)=>{\n      el.removeEventListener(action, func);\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNC = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nWindow.prototype.$l = function(selector){\n  if(selector instanceof HTMLElement)\n    return new DOMNC([selector]);\n  if(typeof selector === 'string')\n    return new DOMNC([].slice.call(document.querySelectorAll(selector)));\n  if(selector instanceof Function){\n    if(this.funcs === undefined){\n      this.funcs = [];\n    }\n    this.funcs.push(selector);\n    document.onreadystatechange = () => {\n      if (document.readyState === 'complete') {\n        this.funcs.forEach((el)=>el());\n      }\n    };\n  }\n};\n\n\n$l(()=>{\n  $l('li').on('click',(e)=>{\n    console.log('LIST ITEM');\n    console.log(e.target);\n    console.log(e.currentTarget);\n  });\n});\n$l(()=>{\n  $l('ul').on('click',(e)=>{\n    console.log('UNORDERED LIST');\n    console.log(e.target);\n    console.log(e.currentTarget);\n  });\n});\n$l(()=>{\n  $l('div').on('click',(e)=>{\n    console.log('DIV');\n    console.log(e.target);\n    console.log(e.currentTarget);\n  });\n});\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });