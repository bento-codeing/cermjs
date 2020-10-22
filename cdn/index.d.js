function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Custom Event Register Manager (singleton)
 */
var CustomEventRegisterManager = function CustomEventRegisterManager() {
  _classCallCheck(this, CustomEventRegisterManager);

  _defineProperty(this, "debug", void 0);

  _defineProperty(this, "_listeners", void 0);

  _defineProperty(this, "_eventListenerCounter", void 0);
};