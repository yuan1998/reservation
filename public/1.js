(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/clipboard/dist/clipboard.js":
/*!**************************************************!*\
  !*** ./node_modules/clipboard/dist/clipboard.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clipboardAction = __webpack_require__(1);

var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

var _tinyEmitter = __webpack_require__(3);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _goodListener = __webpack_require__(4);

var _goodListener2 = _interopRequireDefault(_goodListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
var Clipboard = function (_Emitter) {
    _inherits(Clipboard, _Emitter);

    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    function Clipboard(trigger, options) {
        _classCallCheck(this, Clipboard);

        var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

        _this.resolveOptions(options);
        _this.listenClick(trigger);
        return _this;
    }

    /**
     * Defines if attributes would be resolved using internal setter functions
     * or custom functions that were passed in the constructor.
     * @param {Object} options
     */


    _createClass(Clipboard, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
        }

        /**
         * Adds a click event listener to the passed trigger.
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         */

    }, {
        key: 'listenClick',
        value: function listenClick(trigger) {
            var _this2 = this;

            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                return _this2.onClick(e);
            });
        }

        /**
         * Defines a new `ClipboardAction` on each click event.
         * @param {Event} e
         */

    }, {
        key: 'onClick',
        value: function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
                this.clipboardAction = null;
            }

            this.clipboardAction = new _clipboardAction2.default({
                action: this.action(trigger),
                target: this.target(trigger),
                text: this.text(trigger),
                container: this.container,
                trigger: trigger,
                emitter: this
            });
        }

        /**
         * Default `action` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultAction',
        value: function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
        }

        /**
         * Default `target` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultTarget',
        value: function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
                return document.querySelector(selector);
            }
        }

        /**
         * Returns the support of the given action, or all actions if no action is
         * given.
         * @param {String} [action]
         */

    }, {
        key: 'defaultText',


        /**
         * Default `text` lookup function.
         * @param {Element} trigger
         */
        value: function defaultText(trigger) {
            return getAttributeValue('text', trigger);
        }

        /**
         * Destroy lifecycle.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
                this.clipboardAction.destroy();
                this.clipboardAction = null;
            }
        }
    }], [{
        key: 'isSupported',
        value: function isSupported() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

            var actions = typeof action === 'string' ? [action] : action;
            var support = !!document.queryCommandSupported;

            actions.forEach(function (action) {
                support = support && !!document.queryCommandSupported(action);
            });

            return support;
        }
    }]);

    return Clipboard;
}(_tinyEmitter2.default);

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */


function getAttributeValue(suffix, element) {
    var attribute = 'data-clipboard-' + suffix;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}

module.exports = Clipboard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _select = __webpack_require__(2);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
var ClipboardAction = function () {
    /**
     * @param {Object} options
     */
    function ClipboardAction(options) {
        _classCallCheck(this, ClipboardAction);

        this.resolveOptions(options);
        this.initSelection();
    }

    /**
     * Defines base properties passed from constructor.
     * @param {Object} options
     */


    _createClass(ClipboardAction, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = options.action;
            this.container = options.container;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;

            this.selectedText = '';
        }

        /**
         * Decides which selection strategy is going to be applied based
         * on the existence of `text` and `target` properties.
         */

    }, {
        key: 'initSelection',
        value: function initSelection() {
            if (this.text) {
                this.selectFake();
            } else if (this.target) {
                this.selectTarget();
            }
        }

        /**
         * Creates a fake textarea element, sets its value from `text` property,
         * and makes a selection on it.
         */

    }, {
        key: 'selectFake',
        value: function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

            this.removeFake();

            this.fakeHandlerCallback = function () {
                return _this.removeFake();
            };
            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = yPosition + 'px';

            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;

            this.container.appendChild(this.fakeElem);

            this.selectedText = (0, _select2.default)(this.fakeElem);
            this.copyText();
        }

        /**
         * Only removes the fake element after another click event, that way
         * a user can hit `Ctrl+C` to copy because selection still exists.
         */

    }, {
        key: 'removeFake',
        value: function removeFake() {
            if (this.fakeHandler) {
                this.container.removeEventListener('click', this.fakeHandlerCallback);
                this.fakeHandler = null;
                this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
                this.container.removeChild(this.fakeElem);
                this.fakeElem = null;
            }
        }

        /**
         * Selects the content from element passed on `target` property.
         */

    }, {
        key: 'selectTarget',
        value: function selectTarget() {
            this.selectedText = (0, _select2.default)(this.target);
            this.copyText();
        }

        /**
         * Executes the copy operation based on the current selection.
         */

    }, {
        key: 'copyText',
        value: function copyText() {
            var succeeded = void 0;

            try {
                succeeded = document.execCommand(this.action);
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        }

        /**
         * Fires an event based on the copy operation result.
         * @param {Boolean} succeeded
         */

    }, {
        key: 'handleResult',
        value: function handleResult(succeeded) {
            this.emitter.emit(succeeded ? 'success' : 'error', {
                action: this.action,
                text: this.selectedText,
                trigger: this.trigger,
                clearSelection: this.clearSelection.bind(this)
            });
        }

        /**
         * Moves focus away from `target` and back to the trigger, removes current selection.
         */

    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            if (this.trigger) {
                this.trigger.focus();
            }

            window.getSelection().removeAllRanges();
        }

        /**
         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
         * @param {String} action
         */

    }, {
        key: 'destroy',


        /**
         * Destroy lifecycle.
         */
        value: function destroy() {
            this.removeFake();
        }
    }, {
        key: 'action',
        set: function set() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

            this._action = action;

            if (this._action !== 'copy' && this._action !== 'cut') {
                throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
        }

        /**
         * Gets the `action` property.
         * @return {String}
         */
        ,
        get: function get() {
            return this._action;
        }

        /**
         * Sets the `target` property using an element
         * that will be have its content copied.
         * @param {Element} target
         */

    }, {
        key: 'target',
        set: function set(target) {
            if (target !== undefined) {
                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                    }

                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                    }

                    this._target = target;
                } else {
                    throw new Error('Invalid "target" value, use a valid Element');
                }
            }
        }

        /**
         * Gets the `target` property.
         * @return {String|HTMLElement}
         */
        ,
        get: function get() {
            return this._target;
        }
    }]);

    return ClipboardAction;
}();

module.exports = ClipboardAction;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(5);
var delegate = __webpack_require__(6);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(7);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ })
/******/ ]);
});

/***/ }),

/***/ "./node_modules/vue-json-viewer/vue-json-viewer.js":
/*!*********************************************************!*\
  !*** ./node_modules/vue-json-viewer/vue-json-viewer.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"),__webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js")):undefined}(this,function(t,o){return function(t){var o={};function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=o,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)r.d(t,o,function(e){return n[e]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=25)}([function(e,n,t){"use strict";function o(e,n,t,o,r,i,a,s){var u,l="function"==typeof e?e.options:e;if(n&&(l.render=n,l.staticRenderFns=t,l._compiled=!0),o&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),a?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},l._ssrRegister=u):r&&(u=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),u)if(l.functional){l._injectStyles=u;var c=l.render;l.render=function(e,n){return u.call(n),c(e,n)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,u):[u]}return{exports:e,options:l}}t.d(n,"a",function(){return o})},function(e,n,t){"use strict";t.r(n);var o=t(2),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});i(t(27));var o=i(t(21)),r=i(t(38));function i(e){return e&&e.__esModule?e:{default:e}}n.default={name:"JsonViewer",components:{JsonBox:o.default},props:{value:{type:[Object,Array,String,Number,Boolean,Function],required:!0},expandDepth:{type:Number,default:1},copyable:{type:Boolean,default:!1},sort:{type:Boolean,default:!1},boxed:{type:Boolean,default:!1},theme:{type:String,default:"jv-light"}},provide:function(){return{expandDepth:this.expandDepth}},data:function(){return{copied:!1,expandableCode:!1,expandCode:!1}},watch:{value:function(){this.onResized()}},computed:{jvClass:function(){return"jv-container "+this.theme+(this.boxed?" boxed":"")}},mounted:function(){this.boxed&&this.$refs.jsonBox&&(this.onResized(),this.$refs.jsonBox.$el.addEventListener("resized",this.onResized,!0))},methods:{onResized:function(){var e=this;this.$nextTick(function(){250<=e.$refs.jsonBox.$el.clientHeight?e.expandableCode=!0:e.expandableCode=!1})},clip:function(){var e=this;if(!this.copied){var n=new r.default(this.$refs.clip,{text:function(){return JSON.stringify(e.value,null,2)}});n.on("success",function(){e.copied=!0,setTimeout(function(){e.copied=!1},2e3),e.$emit("copied"),n.destroy()})}},toggleExpandCode:function(){this.expandCode=!this.expandCode}}}},function(e,n,t){"use strict";t.r(n);var o=t(4),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=o(t(28)),a=o(t(29)),s=o(t(30)),u=o(t(31)),l=o(t(32)),c=o(t(33)),d=o(t(34));function o(e){return e&&e.__esModule?e:{default:e}}n.default={name:"JsonBox",inject:["expandDepth"],props:{value:{type:[Object,Array,String,Number,Boolean,Function],default:null},keyName:{type:String,default:""},sort:Boolean,depth:{type:Number,default:0}},data:function(){return{expand:!0}},mounted:function(){this.expand=!(this.depth>=this.expandDepth)},methods:{toggle:function(){this.expand=!this.expand;try{this.$el.dispatchEvent(new Event("resized"))}catch(e){var n=document.createEvent("Event");n.initEvent("resized",!0,!1),this.$el.dispatchEvent(n)}}},render:function(e){var n=this,t=[],o=void 0;return null===this.value||void 0===this.value?o=a.default:Array.isArray(this.value)?o=c.default:"object"===r(this.value)?o=l.default:"number"==typeof this.value?o=s.default:"string"==typeof this.value?o=i.default:"boolean"==typeof this.value?o=u.default:"function"==typeof this.value&&(o=d.default),this.keyName&&this.value&&(Array.isArray(this.value)||"object"===r(this.value))&&t.push(e("span",{class:{"jv-toggle":!0,open:!!this.expand},on:{click:this.toggle}})),this.keyName&&t.push(e("span",{class:{"jv-key":!0},domProps:{innerHTML:this.keyName+":"}})),t.push(e(o,{class:{"jv-push":!0},props:{jsonValue:this.value,keyName:this.keyName,sort:this.sort,depth:this.depth,expand:this.expand},on:{"update:expand":function(e){n.expand=e}}})),e("div",{class:{"jv-node":!0}},t)}}},function(e,n,t){"use strict";t.r(n);var o=t(6),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"JsonString",functional:!0,props:{jsonValue:{type:String,required:!0}},render:function(e,n){return e("span",{class:{"jv-item":!0,"jv-string":!0},domProps:{innerHTML:'"'+n.props.jsonValue.toString()+'"'}})}}},function(e,n,t){"use strict";t.r(n);var o=t(8),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"JsonUndefined",functional:!0,props:{jsonValue:{type:Object,default:null}},render:function(e,n){return e("span",{class:{"jv-item":!0,"jv-undefined":!0},domProps:{innerHTML:null===n.props.jsonValue?"null":"undefined"}})}}},function(e,n,t){"use strict";t.r(n);var o=t(10),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"JsonNumber",functional:!0,props:{jsonValue:{type:Number,required:!0}},render:function(e,n){return e("span",{class:{"jv-item":!0,"jv-number":!0},domProps:{innerHTML:n.props.jsonValue.toString()}})}}},function(e,n,t){"use strict";t.r(n);var o=t(12),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"JsonBoolean",functional:!0,props:{jsonValue:Boolean},render:function(e,n){return e("span",{class:{"jv-item":!0,"jv-boolean":!0},domProps:{innerHTML:n.props.jsonValue.toString()}})}}},function(e,n,t){"use strict";t.r(n);var o=t(14),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,r=t(21),i=(o=r)&&o.__esModule?o:{default:o};n.default={name:"JsonObject",props:{jsonValue:{type:Object,required:!0},keyName:{type:String,default:""},depth:{type:Number,default:0},expand:Boolean,sort:Boolean},computed:{ordered:function(){var n=this;if(!this.sort)return this.jsonValue;var t={};return Object.keys(this.jsonValue).sort().forEach(function(e){t[e]=n.jsonValue[e]}),t}},methods:{toggle:function(){this.$emit("update:expand",!this.expand);try{this.$el.dispatchEvent(new Event("resized"))}catch(e){var n=document.createEvent("Event");n.initEvent("resized",!0,!1),this.$el.dispatchEvent(n)}}},render:function(e){var n=[];for(var t in this.keyName||n.push(e("span",{class:{"jv-toggle":!0,open:!!this.expand},on:{click:this.toggle}})),n.push(e("span",{class:{"jv-item":!0,"jv-object":!0},domProps:{innerHTML:"{"}})),this.ordered)if(this.ordered.hasOwnProperty(t)){var o=this.ordered[t];n.push(e(i.default,{key:t,style:{display:this.expand?void 0:"none"},props:{sort:this.sort,keyName:t,depth:this.depth+1,value:o}}))}return this.expand||n.push(e("span",{style:{display:this.expand?"none":void 0},class:{"jv-ellipsis":!0},on:{click:this.toggle},attrs:{title:"click to reveal object content (keys: "+Object.keys(this.ordered).join(", ")+")"},domProps:{innerHTML:"..."}})),n.push(e("span",{class:{"jv-item":!0,"jv-object":!0},domProps:{innerHTML:"}"}})),e("span",n)}}},function(e,n,t){"use strict";t.r(n);var o=t(16),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,r=t(21),i=(o=r)&&o.__esModule?o:{default:o};n.default={name:"JsonArray",props:{jsonValue:{type:Array,required:!0},keyName:{type:String,default:""},depth:{type:Number,default:0},sort:Boolean,expand:Boolean},computed:{ordered:function(){var e=this.jsonValue;return this.sort?e.sort():e}},methods:{toggle:function(){this.$emit("update:expand",!this.expand);try{this.$el.dispatchEvent(new Event("resized"))}catch(e){var n=document.createEvent("Event");n.initEvent("resized",!0,!1),this.$el.dispatchEvent(n)}}},render:function(e){var n=[];for(var t in this.keyName||n.push(e("span",{class:{"jv-toggle":!0,open:!!this.expand},on:{click:this.toggle}})),n.push(e("span",{class:{"jv-item":!0,"jv-array":!0},domProps:{innerHTML:"["}})),this.ordered){var o=this.ordered[t];n.push(e(i.default,{key:t,style:{display:this.expand?void 0:"none"},props:{sort:this.sort,depth:this.depth+1,value:o}}))}return this.expand||n.push(e("span",{style:{display:this.expand?"none":void 0},class:{"jv-ellipsis":!0},on:{click:this.toggle},attrs:{title:"click to reveal "+this.jsonValue.length+" hidden items"},domProps:{innerHTML:"..."}})),n.push(e("span",{class:{"jv-item":!0,"jv-array":!0},domProps:{innerHTML:"]"}})),e("span",n)}}},function(e,n,t){"use strict";t.r(n);var o=t(18),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"JsonFunction",functional:!0,props:{jsonValue:{type:Function,required:!0}},render:function(e,n){return e("span",{class:{"jv-item":!0,"jv-function":!0},attrs:{title:n.props.jsonValue.toString()},domProps:{innerHTML:"&lt;function&gt;"}})}}},function(e,n,t){var o=t(36);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0};t(24)(o,r);o.locals&&(e.exports=o.locals)},function(e,n,t){var o=t(40);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0};t(24)(o,r);o.locals&&(e.exports=o.locals)},function(e,n,t){"use strict";t.r(n);var o=t(3);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);t(35);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/json-box.vue",n.default=a.exports},function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{class:e.jvClass},[e.copyable?t("div",{staticClass:"jv-tooltip"},[t("span",{ref:"clip",staticClass:"jv-button",class:{copied:e.copied},on:{click:e.clip}},[e._v(e._s(e.copied?"copied!":"copy"))])]):e._e(),e._v(" "),t("div",{staticClass:"jv-code",class:{open:e.expandCode,boxed:e.boxed}},[t("json-box",{ref:"jsonBox",attrs:{value:e.value,sort:e.sort}})],1),e._v(" "),e.expandableCode&&e.boxed?t("div",{staticClass:"jv-more",on:{click:e.toggleExpandCode}},[t("span",{staticClass:"jv-toggle",class:{open:!!e.expandCode}})]):e._e()])},r=[];o._withStripped=!0,t.d(n,"a",function(){return o}),t.d(n,"b",function(){return r})},function(e,n){e.exports=function(t){var a=[];return a.toString=function(){return this.map(function(e){var n=function(e,n){var t=e[1]||"",o=e[3];if(!o)return t;if(n&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[t].concat(i).concat([r]).join("\n")}var a;return[t].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},a.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var t={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(t[r]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&t[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),a.push(i))}},a}},function(e,n,t){var o,r,i,u={},l=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),a=(i={},function(e){if(void 0===i[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}i[e]=n}return i[e]}),c=null,d=0,s=[],f=t(37);function p(e,n){for(var t=0;t<e.length;t++){var o=e[t],r=u[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(g(o.parts[i],n))}else{var a=[];for(i=0;i<o.parts.length;i++)a.push(g(o.parts[i],n));u[o.id]={id:o.id,refs:1,parts:a}}}}function v(e,n){for(var t=[],o={},r=0;r<e.length;r++){var i=e[r],a=n.base?i[0]+n.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):t.push(o[a]={id:a,parts:[s]})}return t}function h(e,n){var t=a(e.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=s[s.length-1];if("top"===e.insertAt)o?o.nextSibling?t.insertBefore(n,o.nextSibling):t.appendChild(n):t.insertBefore(n,t.firstChild),s.push(n);else if("bottom"===e.insertAt)t.appendChild(n);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=a(e.insertInto+" "+e.insertAt.before);t.insertBefore(n,r)}}function b(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var n=s.indexOf(e);0<=n&&s.splice(n,1)}function j(e){var n=document.createElement("style");return e.attrs.type="text/css",m(n,e.attrs),h(e,n),n}function m(n,t){Object.keys(t).forEach(function(e){n.setAttribute(e,t[e])})}function g(n,e){var t,o,r,i,a,s;if(e.transform&&n.css){if(!(i=e.transform(n.css)))return function(){};n.css=i}if(e.singleton){var u=d++;t=c||(c=j(e)),o=_.bind(null,t,u,!1),r=_.bind(null,t,u,!0)}else r=n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=e,s=document.createElement("link"),a.attrs.type="text/css",a.attrs.rel="stylesheet",m(s,a.attrs),h(a,s),o=function(e,n,t){var o=t.css,r=t.sourceMap,i=void 0===n.convertToAbsoluteUrls&&r;(n.convertToAbsoluteUrls||i)&&(o=f(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t=s,e),function(){b(t),t.href&&URL.revokeObjectURL(t.href)}):(t=j(e),o=function(e,n){var t=n.css,o=n.media;o&&e.setAttribute("media",o);if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}.bind(null,t),function(){b(t)});return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else r()}}e.exports=function(e,a){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(a=a||{}).attrs="object"==typeof a.attrs?a.attrs:{},a.singleton||"boolean"==typeof a.singleton||(a.singleton=l()),a.insertInto||(a.insertInto="head"),a.insertAt||(a.insertAt="bottom");var s=v(e,a);return p(s,a),function(e){for(var n=[],t=0;t<s.length;t++){var o=s[t];(r=u[o.id]).refs--,n.push(r)}e&&p(v(e,a),a);for(t=0;t<n.length;t++){var r;if(0===(r=n[t]).refs){for(var i=0;i<r.parts.length;i++)r.parts[i]();delete u[r.id]}}}};var y,x=(y=[],function(e,n){return y[e]=n,y.filter(Boolean).join("\n")});function _(e,n,t,o){var r=t?"":o.css;if(e.styleSheet)e.styleSheet.cssText=x(n,r);else{var i=document.createTextNode(r),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,r=t(26),i=(o=r)&&o.__esModule?o:{default:o};n.default=Object.assign(i.default,{install:function(e){e.component("JsonViewer",i.default)}})},function(e,n,t){"use strict";t.r(n);var o=t(22),r=t(1);for(var i in r)"default"!==i&&function(e){t.d(n,e,function(){return r[e]})}(i);t(39);var a=t(0),s=Object(a.a)(r.default,o.a,o.b,!1,null,null,null);s.options.__file="lib/json-viewer.vue",n.default=s.exports},function(e,n){e.exports=t},function(e,n,t){"use strict";t.r(n);var o=t(5);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-string.vue",n.default=a.exports},function(e,n,t){"use strict";t.r(n);var o=t(7);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-undefined.vue",n.default=a.exports},function(e,n,t){"use strict";t.r(n);var o=t(9);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-number.vue",n.default=a.exports},function(e,n,t){"use strict";t.r(n);var o=t(11);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-boolean.vue",n.default=a.exports},function(e,n,t){"use strict";t.r(n);var o=t(13);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-object.vue",n.default=a.exports},function(e,n,t){"use strict";t.r(n);var o=t(15);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-array.vue",n.default=a.exports},function(e,n,t){"use strict";t.r(n);var o=t(17);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);var i=t(0),a=Object(i.a)(o.default,void 0,void 0,!1,null,null,null);a.options.__file="lib/types/json-function.vue",n.default=a.exports},function(e,n,t){"use strict";var o=t(19);t.n(o).a},function(e,n,t){(e.exports=t(23)(!1)).push([e.i,".jv-node {\n  position: relative;\n}\n.jv-node:after {\n    content: ',';\n}\n.jv-node:last-of-type:after {\n    content: '';\n}\n.jv-node .jv-node {\n    margin-left: 25px;\n}\n",""])},function(e,n){e.exports=function(e){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var r=n.protocol+"//"+n.host,i=r+n.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,n){var t,o=n.trim().replace(/^"(.*)"$/,function(e,n){return n}).replace(/^'(.*)'$/,function(e,n){return n});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o)?e:(t=0===o.indexOf("//")?o:0===o.indexOf("/")?r+o:i+o.replace(/^\.\//,""),"url("+JSON.stringify(t)+")")})}},function(e,n){e.exports=o},function(e,n,t){"use strict";var o=t(20);t.n(o).a},function(e,n,t){var o=t(41);(e.exports=t(23)(!1)).push([e.i,".jv-container {\n  box-sizing: border-box;\n  position: relative;\n}\n.jv-container.boxed {\n    border: 1px solid #eee;\n    border-radius: 6px;\n}\n.jv-container.boxed:hover {\n      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);\n      border-color: transparent;\n      position: relative;\n}\n.jv-container.jv-light {\n    background: #fff;\n    white-space: nowrap;\n    color: #525252;\n    font-size: 14px;\n    font-family: Consolas, Menlo, Courier, monospace;\n}\n.jv-container.jv-light .jv-ellipsis {\n      color: #999;\n      background-color: #eee;\n      display: inline-block;\n      line-height: 0.9;\n      font-size: 0.9em;\n      padding: 0px 4px 2px 4px;\n      margin: 0 4px;\n      border-radius: 3px;\n      vertical-align: 2px;\n      cursor: pointer;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n}\n.jv-container.jv-light .jv-button {\n      color: #49b3ff;\n}\n.jv-container.jv-light .jv-key {\n      color: #111111;\n      margin-right: 4px;\n}\n.jv-container.jv-light .jv-item.jv-array {\n      color: #111111;\n}\n.jv-container.jv-light .jv-item.jv-boolean {\n      color: #fc1e70;\n}\n.jv-container.jv-light .jv-item.jv-function {\n      color: #067bca;\n}\n.jv-container.jv-light .jv-item.jv-number {\n      color: #fc1e70;\n}\n.jv-container.jv-light .jv-item.jv-object {\n      color: #111111;\n}\n.jv-container.jv-light .jv-item.jv-undefined {\n      color: #e08331;\n}\n.jv-container.jv-light .jv-item.jv-string {\n      color: #42b983;\n      word-break: break-word;\n      white-space: normal;\n}\n.jv-container.jv-light .jv-code .jv-toggle:before {\n      padding: 0px 2px;\n      border-radius: 2px;\n}\n.jv-container.jv-light .jv-code .jv-toggle:hover:before {\n      background: #eee;\n}\n.jv-container .jv-code {\n    overflow: hidden;\n    padding: 20px;\n}\n.jv-container .jv-code.boxed {\n      max-height: 300px;\n}\n.jv-container .jv-code.open {\n      max-height: initial !important;\n      overflow: visible;\n      overflow-x: auto;\n      padding-bottom: 45px;\n}\n.jv-container .jv-toggle {\n    background-image: url("+o(t(42))+');\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-position: center center;\n    cursor: pointer;\n    width: 10px;\n    height: 10px;\n    margin-right: 2px;\n    display: inline-block;\n    -webkit-transition: -webkit-transform 0.1s;\n    transition: -webkit-transform 0.1s;\n    transition: transform 0.1s;\n    transition: transform 0.1s, -webkit-transform 0.1s;\n}\n.jv-container .jv-toggle.open {\n      -webkit-transform: rotate(90deg);\n              transform: rotate(90deg);\n}\n.jv-container .jv-more {\n    position: absolute;\n    z-index: 1;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 40px;\n    width: 100%;\n    text-align: center;\n    cursor: pointer;\n}\n.jv-container .jv-more .jv-toggle {\n      position: relative;\n      top: 40%;\n      z-index: 2;\n      color: #888;\n      -webkit-transition: all 0.1s;\n      transition: all 0.1s;\n      -webkit-transform: rotate(-90deg);\n              transform: rotate(-90deg);\n}\n.jv-container .jv-more:after {\n      content: "";\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      z-index: 1;\n      background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 20%, rgba(230, 230, 230, 0.3) 100%);\n      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(230, 230, 230, 0.3) 100%);\n      -webkit-transition: all 0.1s;\n      transition: all 0.1s;\n}\n.jv-container .jv-more:hover .jv-toggle {\n      top: 50%;\n      color: #111;\n}\n.jv-container .jv-more:hover:after {\n      background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 20%, rgba(230, 230, 230, 0.3) 100%);\n      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(230, 230, 230, 0.3) 100%);\n}\n.jv-container .jv-button {\n    position: relative;\n    cursor: pointer;\n    display: inline-block;\n    padding: 5px;\n    z-index: 5;\n}\n.jv-container .jv-button.copied {\n      opacity: 0.4;\n      cursor: default;\n}\n.jv-container .jv-tooltip {\n    position: absolute;\n    right: 15px;\n    top: 10px;\n}\n.jv-container .j-icon {\n    font-size: 12px;\n}\n',""])},function(e,n){e.exports=function(e){return"string"!=typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},function(e,n){e.exports="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB3aWR0aD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIAo8cG9seWdvbiBwb2ludHM9IjAsMCA4LDggMCwxNiIKc3R5bGU9ImZpbGw6IzY2NjtzdHJva2U6cHVycGxlO3N0cm9rZS13aWR0aDowIiAvPgo8L3N2Zz4="}])});

/***/ })

}]);