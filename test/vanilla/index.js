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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJDdXN0b21FdmVudFJlZ2lzdGVyTWFuYWdlciIsImRlYnVnIiwiX2xpc3RlbmVycyIsIk1hcCIsIl9ldmVudExpc3RlbmVyQ291bnRlciIsInVzZSIsInR5cGUiLCJnZXQiLCJpZCIsInZhbHVlcyIsImxpc3RlbmVyc0RldGFpbHMiLCJkZXRhaWwiLCJfaWQiLCJjb25zb2xlIiwid2FybiIsInRhcmdldCIsIndpbmRvdyIsImxpc3RlbmVyIiwib3B0aW9ucyIsImN1c3RvbUlkIiwiZGV0YWlscyIsInNpemUiLCJjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZSIsImdldExpc3RlbmVyRGV0YWlsc0J5VHlwZSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsInNldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJiYXNpY0NoZWNrUHJvY2VzcyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0eXBlcyIsInJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUeXBlIiwiSlNPTiIsInN0cmluZ2lmeSIsImtleXMiLCJ1cGRhdGVkRGV0YWlscyIsImZvckVhY2giLCJ2YWx1ZSIsInB1c2giLCJ0YXJnZXRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVRhcmdldCIsImVudHJpZXMiLCJpbmRleCIsInNwbGljZSIsImlkcyIsInJlbW92ZWRJZHMiLCJpc1JlbW92ZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyQnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBO0FBQ0E7QUFDQTtJQUNNQSwwQjtBQUtKLHdDQUFvQztBQUFBLFFBQXhCQyxLQUF3Qix1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUNsQyxTQUFLQSxLQUFMLEdBQTZCQSxLQUE3QjtBQUNBLFNBQUtDLFVBQUwsR0FBNkIsSUFBSUMsR0FBSixFQUE3QjtBQUNBLFNBQUtDLHFCQUFMLEdBQTZCLENB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ckRldGFpbHMge1xuICBjYXB0dXJlPzogYm9vbGVhbixcbiAgb25jZT86IGJvb2xlYW4sXG4gIHBhc3NpdmU/OiBib29sZWFuLFxuICBtb3pTeXN0ZW1Hcm91cD86IGJvb2xlYW4sXG59XG5cbmludGVyZmFjZSBMaXN0ZW5lckRldGFpbHMge1xuICBfaWQ6IHN0cmluZ3xudW1iZXIsXG4gIHRhcmdldDogV2luZG93fERvY3VtZW50fEVsZW1lbnQsXG4gIHR5cGU6IHN0cmluZyxcbiAgbGlzdGVuZXIoKTogYW55LFxuICBvcHRpb25zOiBFdmVudExpc3RlbmVyRGV0YWlscyxcbn1cblxuLyoqXG4gKiBDdXN0b20gRXZlbnQgUmVnaXN0ZXIgTWFuYWdlciAoc2luZ2xldG9uKVxuICovXG5jbGFzcyBDdXN0b21FdmVudFJlZ2lzdGVyTWFuYWdlciB7XG4gIHB1YmxpYyBkZWJ1ZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBNYXA8c3RyaW5nLCBBcnJheTxMaXN0ZW5lckRldGFpbHM+PjtcbiAgcHJpdmF0ZSBfZXZlbnRMaXN0ZW5lckNvdW50ZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihkZWJ1ZzogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5kZWJ1ZyAgICAgICAgICAgICAgICAgPSBkZWJ1ZztcbiAgICB0aGlzLl9saXN0ZW5lcnMgICAgICAgICAgICA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLl9ldmVudExpc3RlbmVyQ291bnRlciA9IDA7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWJ1ZyBtb2RlXG4gICAqIEBwYXJhbSB1c2UgLSBBIEJvb2xlYW4gaW5kaWNhdGluZyB0aGF0IHRoZSBkZWJ1ZyBzaG91bGQgYmUgZW5hYmxlIG9yIG5vdFxuICAgKi9cbiAgc2V0RGVidWdNb2RlKHVzZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5kZWJ1ZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBsaXN0ZW5lcnMgdG8gd2hpY2ggdGhlIHVzZXIgaGFzIHN1YnNjcmliZWRcbiAgICogQHJldHVybnMge01hcH1cbiAgICovXG4gIGxpc3RBbGwoKTogTWFwPHN0cmluZywgQXJyYXk8TGlzdGVuZXJEZXRhaWxzPj4ge1xuICAgIHJldHVybiBuZXcgTWFwKHRoaXMuX2xpc3RlbmVycyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFzc29jaWF0ZWQgbGlzdGVuZXJzIGZvciB0aGUgdHlwZSBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gQSBjYXNlLXNlbnNpdGl2ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIHVzZSBmb3IgZ2V0dGluZyB0aGUgYXNzb2NpYXRlZCBsaXN0ZW5lcnNcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0TGlzdGVuZXJEZXRhaWxzQnlUeXBlKHR5cGU6IHN0cmluZyk6IEFycmF5PExpc3RlbmVyRGV0YWlscz4ge1xuICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnMuZ2V0KHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhc3NvY2lhdGVkIGxpc3RlbmVycyBmb3IgdGhlIGlkIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIGlkIHtzdHJpbmd8bnVtYmVyfSAtIEEgcmVsYXRlZCBpZCB1c2VkIHRvIGlkZW50aWZ5IHRoZSBldmVudFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGdldExpc3RlbmVyRGV0YWlsc0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyc0RldGFpbHMgb2YgdGhpcy5fbGlzdGVuZXJzLnZhbHVlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IGRldGFpbCBvZiBsaXN0ZW5lcnNEZXRhaWxzKSB7XG4gICAgICAgIGlmIChkZXRhaWwuX2lkID09PSBpZCkge1xuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS53YXJuKGBObyBhc3NvY2lhdGVkIGxpc3RlbmVyIGZvciB0aGUgaWQ6ICR7aWR9YCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGV2ZW50IGxpc3RlbmVyIG9uIHNwZWNpZmljIHRhcmdldFxuICAgKiBAcGFyYW0ge1dpbmRvd3xEb2N1bWVudHxFbGVtZW50fSB0YXJnZXQgLSBBbiBlbGVtZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgICAgICAgICAgICAgICAgICAgIC0gQSBjYXNlLXNlbnNpdGl2ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3JcbiAgICogQHBhcmFtIGxpc3RlbmVyICAgICAgICAgICAgICAgICAgICAgICAgIC0gQW4gZXZlbnQgbGlzdGVuZXIgY2FsbGJhY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICAgICAgIC0gQW4gb3B0aW9ucyBvYmplY3Qgc3BlY2lmaWVzIGNoYXJhY3RlcmlzdGljcyBhYm91dCB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1c3RvbUlkICAgICAgICAgICAgICAgIC0gQSBjdXN0b20gaWQgdXNlZCB0byBzZXQgdGhlIF9pZCBvZiB0aGUgZXZlbnRcbiAgICovXG4gIGFkZEV2ZW50TGlzdGVuZXIodGFyZ2V0OiBXaW5kb3d8RG9jdW1lbnR8RWxlbWVudCA9IHdpbmRvdywgdHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogYW55LCBvcHRpb25zOiBFdmVudExpc3RlbmVyRGV0YWlscyA9IHt9LCBjdXN0b21JZD86IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBkZXRhaWxzOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+ID0gW3tcbiAgICAgIF9pZDogY3VzdG9tSWQgfHwgdGhpcy5fZXZlbnRMaXN0ZW5lckNvdW50ZXIsXG4gICAgICB0YXJnZXQsXG4gICAgICB0eXBlLFxuICAgICAgbGlzdGVuZXIsXG4gICAgICBvcHRpb25zLFxuICAgIH1dO1xuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc3QgY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGU6IEFycmF5PExpc3RlbmVyRGV0YWlscz4gPSB0aGlzLmdldExpc3RlbmVyRGV0YWlsc0J5VHlwZSh0eXBlKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlKSAmJiBjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZS5sZW5ndGgpIHtcbiAgICAgICAgZGV0YWlscyA9IFsuLi5kZXRhaWxzLCAuLi5jdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZV07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2xpc3RlbmVycy5zZXQodHlwZSwgZGV0YWlscyk7XG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lckNvdW50ZXIgPSArK3RoaXMuX2V2ZW50TGlzdGVuZXJDb3VudGVyO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmRlYnVnKGBUaGUgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSB0eXBlOiAke3R5cGV9IGhhcyBiZWVuIGFkZGVkIGZvciB0aGUgdGFyZ2V0OmAsIHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJ5IHRoZSB0eXBlIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgICAgICAgICAgICAgICAtIEEgY2FzZS1zZW5zaXRpdmUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byB1c2UgZm9yIHJlbW92ZSB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc29jaWF0ZWQgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYmFzaWNDaGVja1Byb2Nlc3MgLSBBIGJvb2xlYW4gdGhhdCBkZXRlcm1pbmVzIGlmIHdlIG5lZWQgdG8gZXhlY3V0ZSB0aGUgYmFzaWMgY2hlY2sgdXAgcHJvY2Vzc1xuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVR5cGUodHlwZTogc3RyaW5nLCBiYXNpY0NoZWNrUHJvY2VzczogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoYmFzaWNDaGVja1Byb2Nlc3MgJiYgIXRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyBsaXN0ZW5lciBzYXZlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZTogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiA9IHRoaXMuZ2V0TGlzdGVuZXJEZXRhaWxzQnlUeXBlKHR5cGUpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlKSB8fCAhY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGUubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLndhcm4oYE5vIGxpc3RlbmVyIHNhdmVkIGZvciB0aGUgdHlwZSAke3R5cGV9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB7dGFyZ2V0LCBsaXN0ZW5lciwgb3B0aW9uc30gb2YgY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGUpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLl9saXN0ZW5lcnMuZGVsZXRlKHR5cGUpO1xuXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUuZGVidWcoYEFsbCBsaXN0ZW5lcnMgZm9yIHRoZSB0eXBlICR7dHlwZX0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCB0eXBlIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIHtBcnJheX0gdHlwZXMgLSBBbiBhcnJheSBvZiBjYXNlLXNlbnNpdGl2ZSBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byB1c2UgZm9yXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgdGhlIGFzc29jaWF0ZWQgbGlzdGVuZXJzXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyc0J5VHlwZXModHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGxpc3RlbmVyIHNhdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdHlwZSBvZiB0eXBlcykge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyc0J5VHlwZSh0eXBlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUuZGVidWcoYEFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBmb2xsb3dpbmcgdHlwZXM6ICR7SlNPTi5zdHJpbmdpZnkodHlwZXMpfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJ5IHRoZSB0YXJnZXQgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0gdGFyZ2V0ICAgICAgICAgICAgLSBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRoZSBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWRcbiAgICogQHBhcmFtIGJhc2ljQ2hlY2tQcm9jZXNzIC0gQSBib29sZWFuIHRoYXQgZGV0ZXJtaW5lcyBpZiB3ZSBuZWVkIHRvIGV4ZWN1dGUgdGhlIGJhc2ljIGNoZWNrIHVwIHByb2Nlc3NcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUYXJnZXQodGFyZ2V0OiBXaW5kb3d8RG9jdW1lbnR8RWxlbWVudCwgYmFzaWNDaGVja1Byb2Nlc3M6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKGJhc2ljQ2hlY2tQcm9jZXNzICYmICF0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiTm8gbGlzdGVuZXIgc2F2ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB0eXBlIG9mIHRoaXMuX2xpc3RlbmVycy5rZXlzKCkpIHtcbiAgICAgIGNvbnN0IGRldGFpbHM6IEFycmF5PExpc3RlbmVyRGV0YWlscz4gICAgICAgID0gdGhpcy5nZXRMaXN0ZW5lckRldGFpbHNCeVR5cGUodHlwZSk7XG4gICAgICBjb25zdCB1cGRhdGVkRGV0YWlsczogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiA9IFtdOyAvLyBJbW11dGFiaWxpdHlcbiAgICAgIGRldGFpbHMuZm9yRWFjaCgodmFsdWU6IExpc3RlbmVyRGV0YWlscykgPT4ge1xuICAgICAgICBpZiAodmFsdWUudGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICB2YWx1ZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCB2YWx1ZS5saXN0ZW5lciwgdmFsdWUub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZERldGFpbHMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHVwZGF0ZWREZXRhaWxzLmxlbmd0aCkgdGhpcy5fbGlzdGVuZXJzLnNldCh0eXBlLCB1cGRhdGVkRGV0YWlscyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCB0eXBlIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIHtBcnJheX0gdGFyZ2V0cyAtIEFuIGFycmF5IG9mIHJlZmVyZW5jZXMgdG8gdGhlIHRhcmdldHMgLSB0byB3aGljaCB0aGUgZXZlbnRzIHdhcyBwcmV2aW91c2x5IGRpc3BhdGNoZWQgLVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHJlbW92ZSB0aGUgYXNzb2NpYXRlZCBsaXN0ZW5lcnNcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUYXJnZXRzKHRhcmdldHM6IEFycmF5PFdpbmRvd3xEb2N1bWVudHxFbGVtZW50PiA9IFtdKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiTm8gbGlzdGVuZXIgc2F2ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyc0J5VGFyZ2V0KHRhcmdldCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmRlYnVnKGBBbGwgbGlzdGVuZXJzIGZvciB0aGUgZm9sbG93aW5nIHRhcmdldHM6ICR7SlNPTi5zdHJpbmdpZnkodGFyZ2V0cyl9IGhhcyBiZWVuIHJlbW92ZWRgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgYnkgaGlzIGlkIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIGlkIHtzdHJpbmd8bnVtYmVyfSAtIEEgcmVsYXRlZCBpZCB1c2VkIHRoYXQgaWRlbnRpZnkgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAqIEBwYXJhbSBiYXNpY0NoZWNrUHJvY2VzcyAgLSBBIGJvb2xlYW4gdGhhdCBkZXRlcm1pbmVzIGlmIHdlIG5lZWQgdG8gZXhlY3V0ZSB0aGUgYmFzaWMgY2hlY2sgdXAgcHJvY2Vzc1xuICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgIC0gVHJ1ZSBpZiB0aGUgcHJvY2VzcyBoYXMgYmVlbiBzdWNjZXNzZnVsbGVkLiBPdGhlcndpc2UsIGZhbHNlLlxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lckJ5SWQoaWQ6IHN0cmluZ3xudW1iZXIsIGJhc2ljQ2hlY2tQcm9jZXNzOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xuICAgIGlmIChiYXNpY0NoZWNrUHJvY2VzcyAmJiAhdGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGxpc3RlbmVyIHNhdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgW3R5cGUsIGxpc3RlbmVyc0RldGFpbHNdIG9mIHRoaXMuX2xpc3RlbmVycy5lbnRyaWVzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgW2luZGV4LCBkZXRhaWxzXSBvZiBsaXN0ZW5lcnNEZXRhaWxzLmVudHJpZXMoKSkge1xuICAgICAgICBpZiAoZGV0YWlscy5faWQgPT09IGlkKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZpbmRlZCBlbGVtZW50IGZyb20gdGhlIGxpc3RcbiAgICAgICAgICBjb25zdCB1cGRhdGVkRGV0YWlsczogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiA9IFsuLi5saXN0ZW5lcnNEZXRhaWxzXTtcbiAgICAgICAgICB1cGRhdGVkRGV0YWlscy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNldCh0eXBlLCB1cGRhdGVkRGV0YWlscyk7IC8vIHVwZGF0ZVxuXG4gICAgICAgICAgZGV0YWlscy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXRhaWxzLnR5cGUsIGRldGFpbHMubGlzdGVuZXIsIGRldGFpbHMub3B0aW9ucyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5kZWJ1ZyhgVGhlIGFzc29jaWF0ZWQgbGlzdGVuZXIgZm9yIHRoZSBpZDogJHtpZH0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihgTm8gYXNzb2NpYXRlZCBsaXN0ZW5lciBmb3VuZCBmb3IgdGhlIGlkOiAke2lkfWApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIGVhY2ggaWQgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0ge0FycmF5fSBpZHMgLSBBbiBhcnJheSBvZiB0aGUgaWRzIG9mIGVhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeUlkcyhpZHM6IEFycmF5PHN0cmluZ3xudW1iZXI+ID0gW10pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyBsaXN0ZW5lciBzYXZlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVkSWRzOiBBcnJheTxzdHJpbmd8bnVtYmVyPiA9IFtdOyAvLyBsaXN0IGFsbCByZW1vdmVkIGlkc1xuXG4gICAgZm9yIChjb25zdCBpZCBvZiBpZHMpIHtcbiAgICAgIGNvbnN0IGlzUmVtb3ZlZDogYm9vbGVhbiA9IHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lckJ5SWQoaWQsIGZhbHNlKTtcbiAgICAgIGlmIChpc1JlbW92ZWQpIHJlbW92ZWRJZHMucHVzaChpZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUuZGVidWcoYEFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBmb2xsb3dpbmcgdGFyZ2V0czogJHtKU09OLnN0cmluZ2lmeShyZW1vdmVkSWRzKX0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBDdXN0b21FdmVudFJlZ2lzdGVyTWFuYWdlcigpOyJdfQ==