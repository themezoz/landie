"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};

var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};

var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var colors = {
  primary: '#2c7be5',
  secondary: '#748194',
  success: '#00d27a',
  info: '#27bcfd',
  warning: '#f5803e',
  danger: '#e63757',
  light: '#f9fafd',
  dark: '#000'
};
var grays = {
  white: '#fff',
  100: '#f9fafd',
  200: '#edf2f9',
  300: '#d8e2ef',
  400: '#b6c1d2',
  500: '#9da9bb',
  600: '#748194',
  700: '#5e6e82',
  800: '#4d5969',
  900: '#344050',
  1000: '#232e3c',
  1100: '#0b1727',
  black: '#000'
};

var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

var isScrolledIntoView = function isScrolledIntoView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};

var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }

  return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};

var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

var utils = {
  docReady: docReady,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  colors: colors,
  grays: grays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace
};
/* -------------------------------------------------------------------------- */

/*                             Live Configuration                             */

/* -------------------------------------------------------------------------- */

var isFluid = getItemFromStore('isFluid', false);
var isRTL = getItemFromStore('isRTL', false);
var navbarPosition = getItemFromStore('navbarPosition', 'vertical');
var navbarStyle = getItemFromStore('navbarStyle', 'transparent');

var setCheckInputValue = function setCheckInputValue(id, value) {
  var input = document.getElementById(id);
  input && (input.checked = value);
};

setCheckInputValue('mode-fluid', isFluid);
setCheckInputValue('mode-rtl', isRTL);
setCheckInputValue("option-navbar-".concat(navbarPosition), true);
setCheckInputValue("navbar-style-".concat(navbarStyle), true);

if (navbarPosition === 'top') {
  var buttonGroups = document.querySelector('.btn-group-navbar-style');
  buttonGroups && buttonGroups.querySelectorAll('.btn-check').forEach(function (input) {
    input.setAttribute('disabled', true);
  });
}

var storage = {
  isRTL: isRTL,
  isFluid: isFluid
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
  var _window = window,
      is = _window.is;
  var html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};
/*-----------------------------------------------
|   Node
-----------------------------------------------*/


var Node = /*#__PURE__*/function () {
  function Node(node) {
    _classCallCheck(this, Node);

    this.node = node;
  }

  _createClass(Node, [{
    key: "addClass",
    value: function addClass(className) {
      this.isValidNode() && this.node.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.isValidNode() && this.node.classList.remove(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this.isValidNode() && this.node.classList.toggle(className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      this.isValidNode() && this.node.classList.contains(className);
    }
  }, {
    key: "data",
    value: function data(key) {
      if (this.isValidNode()) {
        try {
          return JSON.parse(this.node.dataset[this.camelize(key)]);
        } catch (e) {
          return this.node.dataset[this.camelize(key)];
        }
      }

      return null;
    }
  }, {
    key: "attr",
    value: function attr(name) {
      return this.isValidNode() && this.node[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.isValidNode() && this.node.setAttribute(name, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this.isValidNode() && this.node.removeAttribute(name);
    }
  }, {
    key: "setProp",
    value: function setProp(name, value) {
      this.isValidNode() && (this.node[name] = value);
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      this.isValidNode() && this.node.addEventListener(event, cb);
    }
  }, {
    key: "isValidNode",
    value: function isValidNode() {
      return !!this.node;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "camelize",
    value: function camelize(str) {
      var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
      return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
    }
  }]);

  return Node;
}();
/* -------------------------------------------------------------------------- */

/*                                  Anchor JS                                 */

/* -------------------------------------------------------------------------- */


var anchors = new window.AnchorJS();
anchors.options = {
  icon: '#'
};
anchors.add('[data-anchor]');
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/

var navbarInit = function navbarInit() {
  var Selector = {
    NAVBAR: '[data-navbar-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  var ClassNames = {
    COLLAPSED: 'collapsed'
  };
  var Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var DataKey = {
    NAVBAR_ON_SCROLL: 'navbar-light-on-scroll'
  };
  var navbar = document.querySelector(Selector.NAVBAR);
  console.log(navbar);

  if (navbar) {
    var windowHeight = window.innerHeight;
    var html = document.documentElement;
    var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);

    var allColors = _objectSpread(_objectSpread({}, utils.colors), utils.grays);

    var name = utils.getData(navbar, DataKey.NAVBAR_ON_SCROLL);
    var colorName = Object.keys(allColors).includes(name) ? name : 'light';
    var color = allColors[colorName];
    var bgClassName = "bg-".concat(colorName);
    var colorRgb = utils.hexToRgb(color);

    var _window$getComputedSt = window.getComputedStyle(navbar),
        backgroundImage = _window$getComputedSt.backgroundImage;

    var transition = 'background-color 0.35s ease';
    navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, function () {
      var scrollTop = html.scrollTop;
      var alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
    }); // Toggle bg class on window resize

    utils.resize(function () {
      var breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        navbar.classList.remove(bgClassName); // document.getElementById('navbarSupportedContent').classList.remove(bgClassName);

        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
        navbar.style.transition = 'none';
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.classList.remove(bgClassName); // document.getElementById('navbarSupportedContent').classList.add(bgClassName);

        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none'; // document.getElementById('navbarSupportedContent').classList.add(bgClassName);
        // navbar.classList.remove(bgClassName);
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      navbar.classList.add(bgClassName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
      navbar.classList.remove(bgClassName);
      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      navbar.style.transition = 'none';
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                   choices                                   */

/* -------------------------------------------------------------------------- */


var choicesInit = function choicesInit() {
  if (window.Choices) {
    var elements = document.querySelectorAll('.js-choice');
    elements.forEach(function (item) {
      var userOptions = utils.getData(item, 'options');
      var choices = new window.Choices(item, _objectSpread({
        itemSelectText: ''
      }, userOptions));
      return choices;
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                   Kanbah                                   */

/* -------------------------------------------------------------------------- */


var kanbanInit = function kanbanInit() {
  var Selectors = {
    KANBAN_COLUMN: '.kanban-column',
    KANBAN_ITEMS_CONTAINER: '.kanban-items-container',
    BTN_ADD_CARD: '.btn-add-card',
    COLLAPSE: '.collapse',
    ADD_LIST_FORM: '#addListForm',
    BTN_COLLAPSE_DISMISS: '[data-dismiss="collapse"]',
    BTN_FORM_HIDE: '[data-btn-form="hide"]',
    INPUT_ADD_CARD: '[data-input="add-card"]',
    INPUT_ADD_LIST: '[data-input="add-list"]'
  };
  var ClassNames = {
    FORM_ADDED: 'form-added',
    D_NONE: 'd-none'
  };
  var Events = {
    CLICK: 'click',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    SHOWN_BS_COLLAPSE: 'shown.bs.collapse'
  };
  var addCardButtons = document.querySelectorAll(Selectors.BTN_ADD_CARD);
  var formHideButtons = document.querySelectorAll(Selectors.BTN_FORM_HIDE);
  var addListForm = document.querySelector(Selectors.ADD_LIST_FORM);
  var collapseDismissButtons = document.querySelectorAll(Selectors.BTN_COLLAPSE_DISMISS); // Show add card form and place scrollbar bottom of the list

  addCardButtons && addCardButtons.forEach(function (button) {
    button.addEventListener(Events.CLICK, function (_ref) {
      var el = _ref.currentTarget;
      var column = el.closest(Selectors.KANBAN_COLUMN);
      var container = column.querySelector(Selectors.KANBAN_ITEMS_CONTAINER);
      var scrollHeight = container.scrollHeight;
      column.classList.add(ClassNames.FORM_ADDED);
      container.querySelector(Selectors.INPUT_ADD_CARD).focus();
      container.scrollTo({
        top: scrollHeight
      });
    });
  }); // Remove add card form

  formHideButtons.forEach(function (button) {
    button.addEventListener(Events.CLICK, function (_ref2) {
      var el = _ref2.currentTarget;
      el.closest(Selectors.KANBAN_COLUMN).classList.remove(ClassNames.FORM_ADDED);
    });
  });

  if (addListForm) {
    // Hide add list button when the form is going to show
    addListForm.addEventListener(Events.SHOW_BS_COLLAPSE, function (_ref3) {
      var el = _ref3.currentTarget;
      var nextElement = el.nextElementSibling;
      nextElement && nextElement.classList.add(ClassNames.D_NONE);
    }); // Focus input field when the form is shown

    addListForm.addEventListener(Events.SHOWN_BS_COLLAPSE, function (_ref4) {
      var el = _ref4.currentTarget;
      el.querySelector(Selectors.INPUT_ADD_LIST).focus();
    });
  } // Hide add list form when the dismiss button is clicked


  collapseDismissButtons.forEach(function (button) {
    button.addEventListener(Events.CLICK, function (_ref5) {
      var el = _ref5.currentTarget;
      var collapseElement = el.closest(Selectors.COLLAPSE);
      var collapse = window.bootstrap.Collapse.getInstance(collapseElement);
      utils.hasClass(collapseElement.nextElementSibling, ClassNames.D_NONE) && collapseElement.nextElementSibling.classList.remove(ClassNames.D_NONE);
      collapse.hide();
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                         Toggle layout for live demo                        */

/* -------------------------------------------------------------------------- */


var toggleLayout = function toggleLayout(id, key, value) {
  var input = document.getElementById(id);
  input && input.addEventListener('change', function () {
    setItemToStore(key, !value);
    window.location.reload();
  });
};

var toggleNavbar = function toggleNavbar(selector, key) {
  var checkInputs = document.querySelectorAll(selector);
  checkInputs.forEach(function (input) {
    input.addEventListener('change', function (e) {
      var value = e.currentTarget.value;
      setItemToStore(key, value);
      window.location.reload();
    });
  });
};

docReady(toggleLayout('mode-rtl', 'isRTL', isRTL));
docReady(toggleLayout('mode-fluid', 'isFluid', isFluid));
docReady(toggleNavbar("input[name='navbar']", 'navbarPosition'));
docReady(toggleNavbar("input[name='navbarStyle']", 'navbarStyle'));
/* -------------------------------------------------------------------------- */

/*                             Navbar Combo Layout                            */

/* -------------------------------------------------------------------------- */

var navbarComboInit = function navbarComboInit() {
  var Selector = {
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_TOP_COMBO: '[data-navbar-top="combo"]',
    COLLAPSE: '.collapse',
    DATA_MOVE_CONTAINER: '[data-move-container]',
    NAVBAR_NAV: '.navbar-nav',
    NAVBAR_VERTICAL_DIVIDER: '.navbar-vertical-divider'
  };
  var ClassName = {
    FLEX_COLUMN: 'flex-column'
  };
  var navbarVertical = document.querySelector(Selector.NAVBAR_VERTICAL);
  var navbarTopCombo = document.querySelector(Selector.NAVBAR_TOP_COMBO);

  var moveNavContent = function moveNavContent(windowWidth) {
    var navbarVerticalBreakpoint = utils.getBreakpoint(navbarVertical);
    var navbarTopBreakpoint = utils.getBreakpoint(navbarTopCombo);

    if (windowWidth < navbarTopBreakpoint) {
      var navbarCollapse = navbarTopCombo.querySelector(Selector.COLLAPSE);
      var navbarTopContent = navbarCollapse.innerHTML;

      if (navbarTopContent) {
        var targetID = utils.getData(navbarTopCombo, 'move-target');
        var targetElement = document.querySelector(targetID);
        navbarCollapse.innerHTML = '';
        targetElement.insertAdjacentHTML('afterend', "\n            <div data-move-container>\n              <div class='navbar-vertical-divider'>\n                <hr class='navbar-vertical-hr' />\n              </div>\n              ".concat(navbarTopContent, "\n            </div>\n          "));

        if (navbarVerticalBreakpoint < navbarTopBreakpoint) {
          var navbarNav = document.querySelector(Selector.DATA_MOVE_CONTAINER).querySelector(Selector.NAVBAR_NAV);
          utils.addClass(navbarNav, ClassName.FLEX_COLUMN);
        }
      }
    } else {
      var moveableContainer = document.querySelector(Selector.DATA_MOVE_CONTAINER);

      if (moveableContainer) {
        var _navbarNav = moveableContainer.querySelector(Selector.NAVBAR_NAV);

        utils.hasClass(_navbarNav, ClassName.FLEX_COLUMN) && _navbarNav.classList.remove(ClassName.FLEX_COLUMN);
        moveableContainer.querySelector(Selector.NAVBAR_VERTICAL_DIVIDER).remove();
        navbarTopCombo.querySelector(Selector.COLLAPSE).innerHTML = moveableContainer.innerHTML;
        moveableContainer.remove();
      }
    }
  };

  moveNavContent(window.innerWidth);
  utils.resize(function () {
    return moveNavContent(window.innerWidth);
  });
};
/* -------------------------------------------------------------------------- */

/*                         Navbar Darken on scroll                        */

/* -------------------------------------------------------------------------- */


var navbarDarkenOnScroll = function navbarDarkenOnScroll() {
  var Selector = {
    NAVBAR: '[data-navbar-darken-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  var ClassNames = {
    COLLAPSED: 'collapsed'
  };
  var Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var DataKey = {
    NAVBAR_DARKEN_ON_SCROLL: 'navbar-darken-on-scroll'
  };
  var navbar = document.querySelector(Selector.NAVBAR);

  if (navbar) {
    var windowHeight = window.innerHeight;
    var html = document.documentElement;
    var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);

    var allColors = _objectSpread(_objectSpread({}, utils.colors), utils.grays);

    var name = utils.getData(navbar, DataKey.NAVBAR_DARKEN_ON_SCROLL);
    var colorName = Object.keys(allColors).includes(name) ? name : 'dark';
    var color = allColors[colorName];
    var bgClassName = "bg-".concat(colorName);
    var colorRgb = utils.hexToRgb(color);

    var _window$getComputedSt2 = window.getComputedStyle(navbar),
        backgroundImage = _window$getComputedSt2.backgroundImage;

    var transition = 'background-color 0.35s ease';
    navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, function () {
      var scrollTop = html.scrollTop;
      var alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
    }); // Toggle bg class on window resize

    utils.resize(function () {
      var breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        navbar.classList.remove(bgClassName);
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
        navbar.style.transition = 'none';
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.classList.add(bgClassName);
        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      navbar.classList.add(bgClassName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
      navbar.classList.remove(bgClassName);
      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      navbar.style.transition = 'none';
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                 Navbar Top                                 */

/* -------------------------------------------------------------------------- */


var navbarTopDropShadow = function navbarTopDropShadow() {
  var Selector = {
    NAVBAR: '.navbar:not(.navbar-vertical)',
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_VERTICAL_CONTENT: '.navbar-vertical-content',
    NAVBAR_VERTICAL_COLLAPSE: 'navbarVerticalCollapse'
  };
  var ClassNames = {
    NAVBAR_GLASS_SHADOW: 'navbar-glass-shadow',
    SHOW: 'show'
  };
  var Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var navDropShadowFlag = true;
  var $navbar = document.querySelector(Selector.NAVBAR);
  var $navbarVertical = document.querySelector(Selector.NAVBAR_VERTICAL);
  var $navbarVerticalContent = document.querySelector(Selector.NAVBAR_VERTICAL_CONTENT);
  var $navbarVerticalCollapse = document.getElementById(Selector.NAVBAR_VERTICAL_COLLAPSE);
  var html = document.documentElement;
  var breakPoint = utils.getBreakpoint($navbarVertical);

  var setDropShadow = function setDropShadow($elem) {
    if ($elem.scrollTop > 0 && navDropShadowFlag) {
      $navbar && $navbar.classList.add(ClassNames.NAVBAR_GLASS_SHADOW);
    } else {
      $navbar && $navbar.classList.remove(ClassNames.NAVBAR_GLASS_SHADOW);
    }
  };

  window.addEventListener(Events.SCROLL, function () {
    setDropShadow(html);
  });

  if ($navbarVerticalContent) {
    $navbarVerticalContent.addEventListener(Events.SCROLL, function () {
      if (window.outerWidth < breakPoint) {
        navDropShadowFlag = true;
        setDropShadow($navbarVerticalContent);
      }
    });
  }

  if ($navbarVerticalCollapse) {
    $navbarVerticalCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      if (window.outerWidth < breakPoint) {
        navDropShadowFlag = false;
        setDropShadow(html);
      }
    });
  }

  if ($navbarVerticalCollapse) {
    $navbarVerticalCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      if (utils.hasClass($navbarVerticalCollapse, ClassNames.SHOW) && window.outerWidth < breakPoint) {
        navDropShadowFlag = false;
      } else {
        navDropShadowFlag = true;
      }

      setDropShadow(html);
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                               Navbar Vertical                              */

/* -------------------------------------------------------------------------- */


var handleNavbarVerticalCollapsed = function handleNavbarVerticalCollapsed() {
  var Selector = {
    HTML: 'html',
    NAVBAR_VERTICAL_TOGGLE: '.navbar-vertical-toggle',
    NAVBAR_VERTICAL_COLLAPSE: '.navbar-vertical .navbar-collapse',
    ECHART_RESPONSIVE: '[data-echart-responsive]'
  };
  var Events = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_LEAVE: 'mouseleave',
    NAVBAR_VERTICAL_TOGGLE: 'navbar.vertical.toggle'
  };
  var ClassNames = {
    NAVBAR_VERTICAL_COLLAPSED: 'navbar-vertical-collapsed',
    NAVBAR_VERTICAL_COLLAPSED_HOVER: 'navbar-vertical-collapsed-hover'
  };
  var navbarVerticalToggle = document.querySelector(Selector.NAVBAR_VERTICAL_TOGGLE);
  var html = document.querySelector(Selector.HTML);
  var navbarVerticalCollapse = document.querySelector(Selector.NAVBAR_VERTICAL_COLLAPSE);

  if (navbarVerticalToggle) {
    navbarVerticalToggle.addEventListener(Events.CLICK, function (e) {
      html.classList.toggle(ClassNames.NAVBAR_VERTICAL_COLLAPSED); // Set collapse state on localStorage

      var isNavbarVerticalCollapsed = utils.getItemFromStore('isNavbarVerticalCollapsed');
      utils.setItemToStore('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);
      var event = new CustomEvent(Events.NAVBAR_VERTICAL_TOGGLE);
      e.currentTarget.dispatchEvent(event);
    });
  }

  if (navbarVerticalCollapse) {
    navbarVerticalCollapse.addEventListener(Events.MOUSE_OVER, function () {
      if (utils.hasClass(html, ClassNames.NAVBAR_VERTICAL_COLLAPSED)) {
        html.classList.add(ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER);
      }
    });
    navbarVerticalCollapse.addEventListener(Events.MOUSE_LEAVE, function () {
      if (utils.hasClass(html, ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER)) {
        html.classList.remove(ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER);
      }
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                   Popover                                  */

/* -------------------------------------------------------------------------- */


var popoverInit = function popoverInit() {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new window.bootstrap.Popover(popoverTriggerEl, {
      trigger: 'focus'
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                         Bootstrap Animated Progress                        */

/* -------------------------------------------------------------------------- */


var progressAnimationToggle = function progressAnimationToggle() {
  var animatedProgress = document.querySelectorAll('[data-progress-animation]');
  animatedProgress.forEach(function (progress) {
    progress.addEventListener('click', function (e) {
      var progressID = utils.getData(e.currentTarget, 'progressAnimation');
      var $progress = document.getElementById(progressID);
      $progress.classList.toggle('progress-bar-animated');
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                Scroll To Top                               */

/* -------------------------------------------------------------------------- */


var scrollToTop = function scrollToTop() {
  document.querySelectorAll('[data-anchor] > a, [data-scroll-to]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var _utils$getData;

      e.preventDefault();
      var el = e.target;
      var id = utils.getData(el, 'scroll-to') || el.getAttribute('href');
      window.scroll({
        top: (_utils$getData = utils.getData(el, 'offset-top')) !== null && _utils$getData !== void 0 ? _utils$getData : utils.getOffset(document.querySelector(id)).top - 100,
        left: 0,
        behavior: 'smooth'
      });
      window.location.hash = id;
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                   Tooltip                                  */

/* -------------------------------------------------------------------------- */


var tooltipInit = function tooltipInit() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new window.bootstrap.Tooltip(tooltipTriggerEl);
  });
};

var wizardInit = function wizardInit() {
  var tabEl = document.querySelectorAll('.theme-wizard a[data-toggle="tab"]');

  if (tabEl.length) {
    var nextButton = document.querySelector('.next');
    var prevButton = document.querySelector('.previous button');
    var cardFooter = document.querySelector('.theme-wizard .card-footer');
    var count = 0;
    prevButton.classList.add('d-none'); // on button click tab change

    nextButton.addEventListener('click', function () {
      count += 1;
      var tab = new window.bootstrap.Tab(tabEl[count]);
      tab.show();
    });
    prevButton.addEventListener('click', function () {
      count -= 1;
      var tab = new window.bootstrap.Tab(tabEl[count]);
      tab.show();
    });
    tabEl.forEach(function (item, index) {
      item.addEventListener('show.bs.tab', function () {
        count = index; // cant go back tab

        if (count === tabEl.length - 1) {
          tabEl.forEach(function (tab) {
            tab.setAttribute('data-toggle', 'modal');
            tab.setAttribute('data-target', '#error-modal');
          });
        } //add done class


        for (var i = 0; i < count; i += 1) {
          tabEl[i].classList.add('done');
        } //remove done class


        for (var j = count; j < tabEl.length; j += 1) {
          tabEl[j].classList.remove('done');
        }

        if (count > tabEl.length - 2) {
          item.classList.add('done');
          cardFooter.classList.add('d-none');
        } else {
          cardFooter.classList.remove('d-none');
        }

        if (count > 0) {
          prevButton.classList.remove('d-none');
        } else {
          prevButton.classList.add('d-none');
        }
      });
    });
  }
}; // import echartsInit from './charts/echarts';
// import progressBar from './progressbar';
// import progressBar from './progressbar';
// import tooltipInit from './tooltip';
// import popoverInit from './popover';
// import navbarTopDropShadow from './navbar-top';
// import toastInit from './toast';
// import progressAnimationToggle from './progress';
// import glightboxInit from './glightbox';
// import plyrInit from './plyr';
// import initMap from './googleMap';
// import dropzoneInit from './dropzone';
// import choicesInit from './choices';
// import chartLinePaymentInit from './charts/chart-line-payment';
// import settingsPanelInit from './settings-panel';
// import chartRealTimeUserInit from './charts/chart-real-time-user';
// import leafletActiveUserInit from './leaflet-active-user';
// import countupInit from './countup';
// import copyLink from './copy-link';
// import typedTextInit from './typed';
// import navbarDarkenOnScroll from './navbar-darken-on-scroll';
// import scrollToTop from './scroll-to-top';
// import tinymceInit from './tinymce';
// import bulkSelectInit from './bulk-select';
// import quantityInit from './quantity';
// import navbarComboInit from './navbar-combo';
// import listInit from './list';
// import chatInit from './chat';
// import draggableInit from './draggable';
// import kanbanInit from './kanban';
// import { fullCalendarInit } from './fullcalendar';
// import appCalendarInit from './calendar/index';
// import lottieInit from './lottie';
// import wizardInit from './wizard';
// import swiperInit from './swiper';
// import ratingInit from './rater';
// import searchInit from './search';
// import cookieNoticeInit from './cookie-notice';
// /* -------------------------------------------------------------------------- */
// /*                            Theme Initialization                            */
// /* -------------------------------------------------------------------------- */


docReady(detectorInit);
docReady(navbarInit); // docReady(handleNavbarVerticalCollapsed);
// docReady(echartsInit.totalOrder);
// docReady(echartsInit.weeklySales);
// docReady(echartsInit.marketShare);
// docReady(echartsInit.totalSales);
// docReady(echartsInit.topProducts);
// docReady(progressBar);
// docReady(navbarTopDropShadow);
// docReady(tooltipInit);
// docReady(popoverInit);
// docReady(toastInit);
// docReady(progressAnimationToggle);
// docReady(glightboxInit);
// docReady(plyrInit);
// docReady(initMap);
// docReady(dropzoneInit);
// docReady(choicesInit);
// docReady(settingsPanelInit);
// docReady(chartLinePaymentInit);
// docReady(chartRealTimeUserInit);
// docReady(leafletActiveUserInit);
// docReady(countupInit);
// docReady(copyLink);
// docReady(navbarDarkenOnScroll);
// docReady(typedTextInit);
// docReady(scrollToTop);
// docReady(tinymceInit);
// docReady(bulkSelectInit);
// docReady(chatInit);
// docReady(quantityInit);
// docReady(navbarComboInit);
// docReady(listInit);
// docReady(swiperInit);
// docReady(ratingInit);
// docReady(draggableInit);
// docReady(kanbanInit);
// docReady(fullCalendarInit);
// docReady(appCalendarInit);
// docReady(lottieInit);
// docReady(wizardInit);
// docReady(searchInit);
// docReady(cookieNoticeInit);
//# sourceMappingURL=theme.js.map
