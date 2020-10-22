function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Custom Event Register Manager (singleton)
 */
var CustomEventRegisterManager = /*#__PURE__*/function () {
  function CustomEventRegisterManager() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, CustomEventRegisterManager);

    _defineProperty(this, "debug", void 0);

    _defineProperty(this, "_listeners", void 0);

    _defineProperty(this, "_eventListenerCounter", void 0);

    this.debug = debug;
    this._listeners = new Map();
    this._eventListenerCounter = 0;
  }
  /**
   * Set the debug mode
   * @param use - A Boolean indicating that the debug should be enable or not
   */


  _createClass(CustomEventRegisterManager, [{
    key: "setDebugMode",
    value: function setDebugMode() {
      var use = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.debug = true;
    }
    /**
     * Get all listeners to which the user has subscribed
     * @returns {Map}
     */

  }, {
    key: "listAll",
    value: function listAll() {
      return new Map(this._listeners);
    }
    /**
     * Get associated listeners for the type provided in args
     * @param {string} type - A case-sensitive string representing the event type to use for getting the associated listeners
     * @return {Object}
     */

  }, {
    key: "getListenerDetailsByType",
    value: function getListenerDetailsByType(type) {
      return this._listeners.get(type);
    }
    /**
     * Get associated listeners for the id provided in args
     * @param id {string|number} - A related id used to identify the event
     * @returns {Object|undefined}
     */

  }, {
    key: "getListenerDetailsById",
    value: function getListenerDetailsById(id) {
      var _iterator = _createForOfIteratorHelper(this._listeners.values()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listenersDetails = _step.value;

          var _iterator2 = _createForOfIteratorHelper(listenersDetails),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var detail = _step2.value;

              if (detail._id === id) {
                return detail;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      console.warn("No associated listener for the id: ".concat(id));
    }
    /**
     * Add event listener on specific target
     * @param {Window|Document|Element} target - An element to attach the listener
     * @param {string} type                    - A case-sensitive string representing the event type to listen for
     * @param listener                         - An event listener callback
     * @param {Object} options                 - An options object specifies characteristics about the event listener
     * @param {string} customId                - A custom id used to set the _id of the event
     */

  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var type = arguments.length > 1 ? arguments[1] : undefined;
      var listener = arguments.length > 2 ? arguments[2] : undefined;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var customId = arguments.length > 4 ? arguments[4] : undefined;
      var details = [{
        _id: customId || this._eventListenerCounter,
        target: target,
        type: type,
        listener: listener,
        options: options
      }];

      if (this._listeners.size) {
        var currentListenerDetailsForType = this.getListenerDetailsByType(type);

        if (Array.isArray(currentListenerDetailsForType) && currentListenerDetailsForType.length) {
          details = [].concat(_toConsumableArray(details), _toConsumableArray(currentListenerDetailsForType));
        }
      }

      this._listeners.set(type, details);

      this._eventListenerCounter = ++this._eventListenerCounter;
      target.addEventListener(type, listener, options);
      if (this.debug) console.debug("The event listener for the type: ".concat(type, " has been added for the target:"), target);
    }
    /**
     * Remove all the event listeners by the type provided in args
     * @param {string} type               - A case-sensitive string representing the event type to use for remove the
     *                                      associated listeners
     * @param {boolean} basicCheckProcess - A boolean that determines if we need to execute the basic check up process
     */

  }, {
    key: "removeEventListenersByType",
    value: function removeEventListenersByType(type) {
      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var currentListenerDetailsForType = this.getListenerDetailsByType(type);

      if (!Array.isArray(currentListenerDetailsForType) || !currentListenerDetailsForType.length) {
        console.warn("No listener saved for the type ".concat(type));
        return;
      }

      var _iterator3 = _createForOfIteratorHelper(currentListenerDetailsForType),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _step3.value,
              target = _step3$value.target,
              _listener = _step3$value.listener,
              options = _step3$value.options;
          target.removeEventListener(type, _listener, options);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this._listeners["delete"](type);

      if (this.debug) console.debug("All listeners for the type ".concat(type, " has been removed"));
    }
    /**
     * Remove all the event listeners for each type provided in args
     * @param {Array} types - An array of case-sensitive strings representing the event type to use for
     *                                      remove the associated listeners
     */

  }, {
    key: "removeEventListenersByTypes",
    value: function removeEventListenersByTypes() {
      var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iterator4 = _createForOfIteratorHelper(types),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var type = _step4.value;
          this.removeEventListenersByType(type, false);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (this.debug) console.debug("All listeners for the following types: ".concat(JSON.stringify(types), " has been removed"));
    }
    /**
     * Remove all the event listeners by the target provided in args
     * @param target            - A reference to the target to which the event will be dispatched
     * @param basicCheckProcess - A boolean that determines if we need to execute the basic check up process
     */

  }, {
    key: "removeEventListenersByTarget",
    value: function removeEventListenersByTarget(target) {
      var _this = this;

      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iterator5 = _createForOfIteratorHelper(this._listeners.keys()),
          _step5;

      try {
        var _loop = function _loop() {
          var type = _step5.value;

          var details = _this.getListenerDetailsByType(type);

          var updatedDetails = []; // Immutability

          details.forEach(function (value) {
            if (value.target === target) {
              value.target.removeEventListener(type, value.listener, value.options);
            } else {
              updatedDetails.push(value);
            }
          });
          if (updatedDetails.length) _this._listeners.set(type, updatedDetails);
        };

        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
    /**
     * Remove all the event listeners for each type provided in args
     * @param {Array} targets - An array of references to the targets - to which the events was previously dispatched -
     *                          for remove the associated listeners
     */

  }, {
    key: "removeEventListenersByTargets",
    value: function removeEventListenersByTargets() {
      var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iterator6 = _createForOfIteratorHelper(targets),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var target = _step6.value;
          this.removeEventListenersByTarget(target, false);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      if (this.debug) console.debug("All listeners for the following targets: ".concat(JSON.stringify(targets), " has been removed"));
    }
    /**
     * Remove an event listener by his id provided in args
     * @param id {string|number} - A related id used that identify the event listener
     * @param basicCheckProcess  - A boolean that determines if we need to execute the basic check up process
     * @return {boolean}         - True if the process has been successfulled. Otherwise, false.
     */

  }, {
    key: "removeEventListenerById",
    value: function removeEventListenerById(id) {
      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iterator7 = _createForOfIteratorHelper(this._listeners.entries()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              type = _step7$value[0],
              listenersDetails = _step7$value[1];

          var _iterator8 = _createForOfIteratorHelper(listenersDetails.entries()),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _step8$value = _slicedToArray(_step8.value, 2),
                  index = _step8$value[0],
                  details = _step8$value[1];

              if (details._id === id) {
                // remove finded element from the list
                var updatedDetails = _toConsumableArray(listenersDetails);

                updatedDetails.splice(index, 1);

                this._listeners.set(type, updatedDetails); // update


                details.target.removeEventListener(details.type, details.listener, details.options);
                if (this.debug) console.debug("The associated listener for the id: ".concat(id, " has been removed"));
                return true;
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      console.warn("No associated listener found for the id: ".concat(id));
      return false;
    }
    /**
     * Remove all the event listeners for each id provided in args
     * @param {Array} ids - An array of the ids of each event listeners to remove
     */

  }, {
    key: "removeEventListenersByIds",
    value: function removeEventListenersByIds() {
      var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var removedIds = []; // list all removed ids

      var _iterator9 = _createForOfIteratorHelper(ids),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var id = _step9.value;
          var isRemoved = this.removeEventListenerById(id, false);
          if (isRemoved) removedIds.push(id);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      if (this.debug) console.debug("All listeners for the following targets: ".concat(JSON.stringify(removedIds), " has been removed"));
    }
  }]);

  return CustomEventRegisterManager;
}();

var cerm = new CustomEventRegisterManager();