"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var _default = new CustomEventRegisterManager();

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ucG0vaW5kZXgudHMiXSwibmFtZXMiOlsiQ3VzdG9tRXZlbnRSZWdpc3Rlck1hbmFnZXIiLCJkZWJ1ZyIsIl9saXN0ZW5lcnMiLCJNYXAiLCJfZXZlbnRMaXN0ZW5lckNvdW50ZXIiLCJ1c2UiLCJ0eXBlIiwiZ2V0IiwiaWQiLCJ2YWx1ZXMiLCJsaXN0ZW5lcnNEZXRhaWxzIiwiZGV0YWlsIiwiX2lkIiwiY29uc29sZSIsIndhcm4iLCJ0YXJnZXQiLCJ3aW5kb3ciLCJsaXN0ZW5lciIsIm9wdGlvbnMiLCJjdXN0b21JZCIsImRldGFpbHMiLCJzaXplIiwiY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGUiLCJnZXRMaXN0ZW5lckRldGFpbHNCeVR5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJzZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmFzaWNDaGVja1Byb2Nlc3MiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidHlwZXMiLCJyZW1vdmVFdmVudExpc3RlbmVyc0J5VHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJrZXlzIiwidXBkYXRlZERldGFpbHMiLCJmb3JFYWNoIiwidmFsdWUiLCJwdXNoIiwidGFyZ2V0cyIsInJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUYXJnZXQiLCJlbnRyaWVzIiwiaW5kZXgiLCJzcGxpY2UiLCJpZHMiLCJyZW1vdmVkSWRzIiwiaXNSZW1vdmVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lckJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTtBQUNBO0FBQ0E7SUFDTUEsMEI7QUFLSix3Q0FBb0M7QUFBQSxRQUF4QkMsS0FBd0IsdUVBQVAsS0FBTzs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDbEMsU0FBS0EsS0FBTCxHQUE2QkEsS0FBN0I7QUFDQSxTQUFLQyxVQUFMLEdBQTZCLElBQUlDLEdBQUosRUFBN0I7QUFDQSxTQUFLQyxxQkFBTCxHQUE2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dGVuZXJEZXRhaWxzIHtcbiAgY2FwdHVyZT86IGJvb2xlYW4sXG4gIG9uY2U/OiBib29sZWFuLFxuICBwYXNzaXZlPzogYm9vbGVhbixcbiAgbW96U3lzdGVtR3JvdXA/OiBib29sZWFuLFxufVxuXG5pbnRlcmZhY2UgTGlzdGVuZXJEZXRhaWxzIHtcbiAgX2lkOiBzdHJpbmd8bnVtYmVyLFxuICB0YXJnZXQ6IFdpbmRvd3xEb2N1bWVudHxFbGVtZW50LFxuICB0eXBlOiBzdHJpbmcsXG4gIGxpc3RlbmVyKCk6IGFueSxcbiAgb3B0aW9uczogRXZlbnRMaXN0ZW5lckRldGFpbHMsXG59XG5cbi8qKlxuICogQ3VzdG9tIEV2ZW50IFJlZ2lzdGVyIE1hbmFnZXIgKHNpbmdsZXRvbilcbiAqL1xuY2xhc3MgQ3VzdG9tRXZlbnRSZWdpc3Rlck1hbmFnZXIge1xuICBwdWJsaWMgZGVidWc6IGJvb2xlYW47XG4gIHByaXZhdGUgX2xpc3RlbmVyczogTWFwPHN0cmluZywgQXJyYXk8TGlzdGVuZXJEZXRhaWxzPj47XG4gIHByaXZhdGUgX2V2ZW50TGlzdGVuZXJDb3VudGVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZGVidWc6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuZGVidWcgICAgICAgICAgICAgICAgID0gZGVidWc7XG4gICAgdGhpcy5fbGlzdGVuZXJzICAgICAgICAgICAgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lckNvdW50ZXIgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVidWcgbW9kZVxuICAgKiBAcGFyYW0gdXNlIC0gQSBCb29sZWFuIGluZGljYXRpbmcgdGhhdCB0aGUgZGVidWcgc2hvdWxkIGJlIGVuYWJsZSBvciBub3RcbiAgICovXG4gIHNldERlYnVnTW9kZSh1c2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMuZGVidWcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgbGlzdGVuZXJzIHRvIHdoaWNoIHRoZSB1c2VyIGhhcyBzdWJzY3JpYmVkXG4gICAqIEByZXR1cm5zIHtNYXB9XG4gICAqL1xuICBsaXN0QWxsKCk6IE1hcDxzdHJpbmcsIEFycmF5PExpc3RlbmVyRGV0YWlscz4+IHtcbiAgICByZXR1cm4gbmV3IE1hcCh0aGlzLl9saXN0ZW5lcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhc3NvY2lhdGVkIGxpc3RlbmVycyBmb3IgdGhlIHR5cGUgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIEEgY2FzZS1zZW5zaXRpdmUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byB1c2UgZm9yIGdldHRpbmcgdGhlIGFzc29jaWF0ZWQgbGlzdGVuZXJzXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldExpc3RlbmVyRGV0YWlsc0J5VHlwZSh0eXBlOiBzdHJpbmcpOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+IHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzLmdldCh0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYXNzb2NpYXRlZCBsaXN0ZW5lcnMgZm9yIHRoZSBpZCBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSBpZCB7c3RyaW5nfG51bWJlcn0gLSBBIHJlbGF0ZWQgaWQgdXNlZCB0byBpZGVudGlmeSB0aGUgZXZlbnRcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICBnZXRMaXN0ZW5lckRldGFpbHNCeUlkKGlkKSB7XG4gICAgZm9yIChjb25zdCBsaXN0ZW5lcnNEZXRhaWxzIG9mIHRoaXMuX2xpc3RlbmVycy52YWx1ZXMoKSkge1xuICAgICAgZm9yIChjb25zdCBkZXRhaWwgb2YgbGlzdGVuZXJzRGV0YWlscykge1xuICAgICAgICBpZiAoZGV0YWlsLl9pZCA9PT0gaWQpIHtcbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihgTm8gYXNzb2NpYXRlZCBsaXN0ZW5lciBmb3IgdGhlIGlkOiAke2lkfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBldmVudCBsaXN0ZW5lciBvbiBzcGVjaWZpYyB0YXJnZXRcbiAgICogQHBhcmFtIHtXaW5kb3d8RG9jdW1lbnR8RWxlbWVudH0gdGFyZ2V0IC0gQW4gZWxlbWVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICAgICAgICAgICAgICAgICAgICAtIEEgY2FzZS1zZW5zaXRpdmUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yXG4gICAqIEBwYXJhbSBsaXN0ZW5lciAgICAgICAgICAgICAgICAgICAgICAgICAtIEFuIGV2ZW50IGxpc3RlbmVyIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zICAgICAgICAgICAgICAgICAtIEFuIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllcyBjaGFyYWN0ZXJpc3RpY3MgYWJvdXQgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXN0b21JZCAgICAgICAgICAgICAgICAtIEEgY3VzdG9tIGlkIHVzZWQgdG8gc2V0IHRoZSBfaWQgb2YgdGhlIGV2ZW50XG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHRhcmdldDogV2luZG93fERvY3VtZW50fEVsZW1lbnQgPSB3aW5kb3csIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IGFueSwgb3B0aW9uczogRXZlbnRMaXN0ZW5lckRldGFpbHMgPSB7fSwgY3VzdG9tSWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgZGV0YWlsczogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiA9IFt7XG4gICAgICBfaWQ6IGN1c3RvbUlkIHx8IHRoaXMuX2V2ZW50TGlzdGVuZXJDb3VudGVyLFxuICAgICAgdGFyZ2V0LFxuICAgICAgdHlwZSxcbiAgICAgIGxpc3RlbmVyLFxuICAgICAgb3B0aW9ucyxcbiAgICB9XTtcbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+ID0gdGhpcy5nZXRMaXN0ZW5lckRldGFpbHNCeVR5cGUodHlwZSk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZSkgJiYgY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGUubGVuZ3RoKSB7XG4gICAgICAgIGRldGFpbHMgPSBbLi4uZGV0YWlscywgLi4uY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGVdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9saXN0ZW5lcnMuc2V0KHR5cGUsIGRldGFpbHMpO1xuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJDb3VudGVyID0gKyt0aGlzLl9ldmVudExpc3RlbmVyQ291bnRlcjtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5kZWJ1ZyhgVGhlIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgdHlwZTogJHt0eXBlfSBoYXMgYmVlbiBhZGRlZCBmb3IgdGhlIHRhcmdldDpgLCB0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBieSB0aGUgdHlwZSBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICAgICAgICAgICAgICAgLSBBIGNhc2Utc2Vuc2l0aXZlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gdXNlIGZvciByZW1vdmUgdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NvY2lhdGVkIGxpc3RlbmVyc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJhc2ljQ2hlY2tQcm9jZXNzIC0gQSBib29sZWFuIHRoYXQgZGV0ZXJtaW5lcyBpZiB3ZSBuZWVkIHRvIGV4ZWN1dGUgdGhlIGJhc2ljIGNoZWNrIHVwIHByb2Nlc3NcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUeXBlKHR5cGU6IHN0cmluZywgYmFzaWNDaGVja1Byb2Nlc3M6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKGJhc2ljQ2hlY2tQcm9jZXNzICYmICF0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiTm8gbGlzdGVuZXIgc2F2ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGU6IEFycmF5PExpc3RlbmVyRGV0YWlscz4gPSB0aGlzLmdldExpc3RlbmVyRGV0YWlsc0J5VHlwZSh0eXBlKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZSkgfHwgIWN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS53YXJuKGBObyBsaXN0ZW5lciBzYXZlZCBmb3IgdGhlIHR5cGUgJHt0eXBlfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qge3RhcmdldCwgbGlzdGVuZXIsIG9wdGlvbnN9IG9mIGN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbGlzdGVuZXJzLmRlbGV0ZSh0eXBlKTtcblxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmRlYnVnKGBBbGwgbGlzdGVuZXJzIGZvciB0aGUgdHlwZSAke3R5cGV9IGhhcyBiZWVuIHJlbW92ZWRgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIGVhY2ggdHlwZSBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHR5cGVzIC0gQW4gYXJyYXkgb2YgY2FzZS1zZW5zaXRpdmUgc3RyaW5ncyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gdXNlIGZvclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlIHRoZSBhc3NvY2lhdGVkIGxpc3RlbmVyc1xuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVR5cGVzKHR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyBsaXN0ZW5lciBzYXZlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHR5cGUgb2YgdHlwZXMpIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVR5cGUodHlwZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmRlYnVnKGBBbGwgbGlzdGVuZXJzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOiAke0pTT04uc3RyaW5naWZ5KHR5cGVzKX0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBieSB0aGUgdGFyZ2V0IHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIHRhcmdldCAgICAgICAgICAgIC0gQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkXG4gICAqIEBwYXJhbSBiYXNpY0NoZWNrUHJvY2VzcyAtIEEgYm9vbGVhbiB0aGF0IGRldGVybWluZXMgaWYgd2UgbmVlZCB0byBleGVjdXRlIHRoZSBiYXNpYyBjaGVjayB1cCBwcm9jZXNzXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyc0J5VGFyZ2V0KHRhcmdldDogV2luZG93fERvY3VtZW50fEVsZW1lbnQsIGJhc2ljQ2hlY2tQcm9jZXNzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGlmIChiYXNpY0NoZWNrUHJvY2VzcyAmJiAhdGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGxpc3RlbmVyIHNhdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdHlwZSBvZiB0aGlzLl9saXN0ZW5lcnMua2V5cygpKSB7XG4gICAgICBjb25zdCBkZXRhaWxzOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+ICAgICAgICA9IHRoaXMuZ2V0TGlzdGVuZXJEZXRhaWxzQnlUeXBlKHR5cGUpO1xuICAgICAgY29uc3QgdXBkYXRlZERldGFpbHM6IEFycmF5PExpc3RlbmVyRGV0YWlscz4gPSBbXTsgLy8gSW1tdXRhYmlsaXR5XG4gICAgICBkZXRhaWxzLmZvckVhY2goKHZhbHVlOiBMaXN0ZW5lckRldGFpbHMpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLnRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgdmFsdWUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgdmFsdWUubGlzdGVuZXIsIHZhbHVlLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZWREZXRhaWxzLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh1cGRhdGVkRGV0YWlscy5sZW5ndGgpIHRoaXMuX2xpc3RlbmVycy5zZXQodHlwZSwgdXBkYXRlZERldGFpbHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIGVhY2ggdHlwZSBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHRhcmdldHMgLSBBbiBhcnJheSBvZiByZWZlcmVuY2VzIHRvIHRoZSB0YXJnZXRzIC0gdG8gd2hpY2ggdGhlIGV2ZW50cyB3YXMgcHJldmlvdXNseSBkaXNwYXRjaGVkIC1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGZvciByZW1vdmUgdGhlIGFzc29jaWF0ZWQgbGlzdGVuZXJzXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyc0J5VGFyZ2V0cyh0YXJnZXRzOiBBcnJheTxXaW5kb3d8RG9jdW1lbnR8RWxlbWVudD4gPSBbXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGxpc3RlbmVyIHNhdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVRhcmdldCh0YXJnZXQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5kZWJ1ZyhgQWxsIGxpc3RlbmVycyBmb3IgdGhlIGZvbGxvd2luZyB0YXJnZXRzOiAke0pTT04uc3RyaW5naWZ5KHRhcmdldHMpfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIGJ5IGhpcyBpZCBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSBpZCB7c3RyaW5nfG51bWJlcn0gLSBBIHJlbGF0ZWQgaWQgdXNlZCB0aGF0IGlkZW50aWZ5IHRoZSBldmVudCBsaXN0ZW5lclxuICAgKiBAcGFyYW0gYmFzaWNDaGVja1Byb2Nlc3MgIC0gQSBib29sZWFuIHRoYXQgZGV0ZXJtaW5lcyBpZiB3ZSBuZWVkIHRvIGV4ZWN1dGUgdGhlIGJhc2ljIGNoZWNrIHVwIHByb2Nlc3NcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAtIFRydWUgaWYgdGhlIHByb2Nlc3MgaGFzIGJlZW4gc3VjY2Vzc2Z1bGxlZC4gT3RoZXJ3aXNlLCBmYWxzZS5cbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJCeUlkKGlkOiBzdHJpbmd8bnVtYmVyLCBiYXNpY0NoZWNrUHJvY2VzczogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcbiAgICBpZiAoYmFzaWNDaGVja1Byb2Nlc3MgJiYgIXRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyBsaXN0ZW5lciBzYXZlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFt0eXBlLCBsaXN0ZW5lcnNEZXRhaWxzXSBvZiB0aGlzLl9saXN0ZW5lcnMuZW50cmllcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpbmRleCwgZGV0YWlsc10gb2YgbGlzdGVuZXJzRGV0YWlscy5lbnRyaWVzKCkpIHtcbiAgICAgICAgaWYgKGRldGFpbHMuX2lkID09PSBpZCkge1xuICAgICAgICAgIC8vIHJlbW92ZSBmaW5kZWQgZWxlbWVudCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgY29uc3QgdXBkYXRlZERldGFpbHM6IEFycmF5PExpc3RlbmVyRGV0YWlscz4gPSBbLi4ubGlzdGVuZXJzRGV0YWlsc107XG4gICAgICAgICAgdXBkYXRlZERldGFpbHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zZXQodHlwZSwgdXBkYXRlZERldGFpbHMpOyAvLyB1cGRhdGVcblxuICAgICAgICAgIGRldGFpbHMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV0YWlscy50eXBlLCBkZXRhaWxzLmxpc3RlbmVyLCBkZXRhaWxzLm9wdGlvbnMpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUuZGVidWcoYFRoZSBhc3NvY2lhdGVkIGxpc3RlbmVyIGZvciB0aGUgaWQ6ICR7aWR9IGhhcyBiZWVuIHJlbW92ZWRgKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLndhcm4oYE5vIGFzc29jaWF0ZWQgbGlzdGVuZXIgZm91bmQgZm9yIHRoZSBpZDogJHtpZH1gKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoIGlkIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIHtBcnJheX0gaWRzIC0gQW4gYXJyYXkgb2YgdGhlIGlkcyBvZiBlYWNoIGV2ZW50IGxpc3RlbmVycyB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzQnlJZHMoaWRzOiBBcnJheTxzdHJpbmd8bnVtYmVyPiA9IFtdKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiTm8gbGlzdGVuZXIgc2F2ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlZElkczogQXJyYXk8c3RyaW5nfG51bWJlcj4gPSBbXTsgLy8gbGlzdCBhbGwgcmVtb3ZlZCBpZHNcblxuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XG4gICAgICBjb25zdCBpc1JlbW92ZWQ6IGJvb2xlYW4gPSB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJCeUlkKGlkLCBmYWxzZSk7XG4gICAgICBpZiAoaXNSZW1vdmVkKSByZW1vdmVkSWRzLnB1c2goaWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmRlYnVnKGBBbGwgbGlzdGVuZXJzIGZvciB0aGUgZm9sbG93aW5nIHRhcmdldHM6ICR7SlNPTi5zdHJpbmdpZnkocmVtb3ZlZElkcyl9IGhhcyBiZWVuIHJlbW92ZWRgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ3VzdG9tRXZlbnRSZWdpc3Rlck1hbmFnZXIoKTsiXX0=