"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomEventRegisterManager = function () {
  function CustomEventRegisterManager() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, CustomEventRegisterManager);

    this._listeners = new Map();
    this.debug = debug;
    this._eventListenerCounter = 0;
  }

  _createClass(CustomEventRegisterManager, [{
    key: "setDebugMode",
    value: function setDebugMode() {
      var use = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.debug = true;
    }
  }, {
    key: "listAll",
    value: function listAll() {
      return new Map(this._listeners);
    }
  }, {
    key: "getListenerDetailsByType",
    value: function getListenerDetailsByType(type) {
      return this._listeners.get(type);
    }
  }, {
    key: "getListenerDetailsById",
    value: function getListenerDetailsById(id) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._listeners.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listenersDetails = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = listenersDetails[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var detail = _step2.value;

              if (detail._id === id) {
                return detail;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      console.warn("No associated listener for the id: " + id);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var type = arguments[1];
      var listener = arguments[2];
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var customId = arguments[4];

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

      if (this.debug) console.debug("The event listener for the type: " + type + " has been added for the target:", target);
    }
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
        console.warn("No listener saved for the type " + type);
        return;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = currentListenerDetailsForType[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref = _step3.value;
          var target = _ref.target;
          var listener = _ref.listener;
          var options = _ref.options;

          target.removeEventListener(type, listener, options);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this._listeners.delete(type);

      if (this.debug) console.debug("All listeners for the type " + type + " has been removed");
    }
  }, {
    key: "removeEventListenersByTypes",
    value: function removeEventListenersByTypes() {
      var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = types[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var type = _step4.value;

          this.removeEventListenersByType(type, false);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      if (this.debug) console.debug("All listeners for the following types: " + JSON.stringify(types) + " has been removed");
    }
  }, {
    key: "removeEventListenersByTarget",
    value: function removeEventListenersByTarget(target) {
      var _this = this;

      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _loop = function _loop(type) {
        var details = _this.getListenerDetailsByType(type);
        var updatedDetails = [];
        details.forEach(function (value) {
          if (value.target === target) {
            value.target.removeEventListener(type, value.listener, value.options);
          } else {
            updatedDetails.push(value);
          }
        });
        if (updatedDetails.length) _this._listeners.set(type, updatedDetails);
      };

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._listeners.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var type = _step5.value;

          _loop(type);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: "removeEventListenersByTargets",
    value: function removeEventListenersByTargets() {
      var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = targets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var target = _step6.value;

          this.removeEventListenersByTarget(target, false);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (this.debug) console.debug("All listeners for the following targets: " + JSON.stringify(targets) + " has been removed");
    }
  }, {
    key: "removeEventListenerById",
    value: function removeEventListenerById(id) {
      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this._listeners.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _ref2 = _step7.value;

          var _ref3 = _slicedToArray(_ref2, 2);

          var type = _ref3[0];
          var listenersDetails = _ref3[1];
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = listenersDetails.entries()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var _ref4 = _step8.value;

              var _ref5 = _slicedToArray(_ref4, 2);

              var index = _ref5[0];
              var details = _ref5[1];

              if (details._id === id) {
                var _updatedDetails = [].concat(_toConsumableArray(listenersDetails));
                _updatedDetails.splice(index, 1);

                this._listeners.set(type, _updatedDetails);

                details.target.removeEventListener(details.type, details.listener, details.options);

                if (this.debug) console.debug("The associated listener for the id: " + id + " has been removed");
                return true;
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      console.warn("No associated listener found for the id: " + id);
      return false;
    }
  }, {
    key: "removeEventListenersByIds",
    value: function removeEventListenersByIds() {
      var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var removedIds = [];var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {

        for (var _iterator9 = ids[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var id = _step9.value;

          var isRemoved = this.removeEventListenerById(id, false);
          if (isRemoved) removedIds.push(id);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      if (this.debug) console.debug("All listeners for the following targets: " + JSON.stringify(removedIds) + " has been removed");
    }
  }]);

  return CustomEventRegisterManager;
}();

exports.default = new CustomEventRegisterManager();