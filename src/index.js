"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/**
 * Custom Event Register Manager (singleton)
 */
var CustomEventRegisterManager = /** @class */ (function () {
    function CustomEventRegisterManager(debug) {
        if (debug === void 0) { debug = false; }
        this.debug = debug;
        this._listeners = new Map();
        this._eventListenerCounter = 0;
    }
    /**
     * Set the debug mode
     * @param use - A Boolean indicating that the debug should be enable or not
     */
    CustomEventRegisterManager.prototype.setDebugMode = function (use) {
        if (use === void 0) { use = false; }
        this.debug = true;
    };
    /**
     * Get all listeners to which the user has subscribed
     * @returns {Map}
     */
    CustomEventRegisterManager.prototype.listAll = function () {
        return new Map(this._listeners);
    };
    /**
     * Get associated listeners for the type provided in args
     * @param {string} type - A case-sensitive string representing the event type to use for getting the associated listeners
     * @return {Object}
     */
    CustomEventRegisterManager.prototype.getListenerDetailsByType = function (type) {
        return this._listeners.get(type);
    };
    /**
     * Get associated listeners for the id provided in args
     * @param id {string|number} - A related id used to identify the event
     * @returns {Object|undefined}
     */
    CustomEventRegisterManager.prototype.getListenerDetailsById = function (id) {
        for (var _i = 0, _a = this._listeners.values(); _i < _a.length; _i++) {
            var listenersDetails = _a[_i];
            for (var _b = 0, listenersDetails_1 = listenersDetails; _b < listenersDetails_1.length; _b++) {
                var detail = listenersDetails_1[_b];
                if (detail._id === id) {
                    return detail;
                }
            }
        }
        console.warn("No associated listener for the id: " + id);
    };
    /**
     * Add event listener on specific target
     * @param {Window|Document|Element} target - An element to attach the listener
     * @param {string} type                    - A case-sensitive string representing the event type to listen for
     * @param listener                         - An event listener callback
     * @param {Object} options                 - An options object specifies characteristics about the event listener
     * @param {string} customId                - A custom id used to set the _id of the event
     */
    CustomEventRegisterManager.prototype.addEventListener = function (target, type, listener, options, customId) {
        if (target === void 0) { target = window; }
        if (options === void 0) { options = {}; }
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
                details = __spreadArrays(details, currentListenerDetailsForType);
            }
        }
        this._listeners.set(type, details);
        this._eventListenerCounter = ++this._eventListenerCounter;
        target.addEventListener(type, listener, options);
        if (this.debug)
            console.debug("The event listener for the type: " + type + " has been added for the target:", target);
    };
    /**
     * Remove all the event listeners by the type provided in args
     * @param {string} type               - A case-sensitive string representing the event type to use for remove the
     *                                      associated listeners
     * @param {boolean} basicCheckProcess - A boolean that determines if we need to execute the basic check up process
     */
    CustomEventRegisterManager.prototype.removeEventListenersByType = function (type, basicCheckProcess) {
        if (basicCheckProcess === void 0) { basicCheckProcess = true; }
        if (basicCheckProcess && !this._listeners.size) {
            console.warn("No listener saved");
            return;
        }
        var currentListenerDetailsForType = this.getListenerDetailsByType(type);
        if (!Array.isArray(currentListenerDetailsForType) || !currentListenerDetailsForType.length) {
            console.warn("No listener saved for the type " + type);
            return;
        }
        for (var _i = 0, currentListenerDetailsForType_1 = currentListenerDetailsForType; _i < currentListenerDetailsForType_1.length; _i++) {
            var _a = currentListenerDetailsForType_1[_i], target = _a.target, listener = _a.listener, options = _a.options;
            target.removeEventListener(type, listener, options);
        }
        this._listeners["delete"](type);
        if (this.debug)
            console.debug("All listeners for the type " + type + " has been removed");
    };
    /**
     * Remove all the event listeners for each type provided in args
     * @param {Array} types - An array of case-sensitive strings representing the event type to use for
     *                                      remove the associated listeners
     */
    CustomEventRegisterManager.prototype.removeEventListenersByTypes = function (types) {
        if (types === void 0) { types = []; }
        if (!this._listeners.size) {
            console.warn("No listener saved");
            return;
        }
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            this.removeEventListenersByType(type, false);
        }
        if (this.debug)
            console.debug("All listeners for the following types: " + JSON.stringify(types) + " has been removed");
    };
    /**
     * Remove all the event listeners by the target provided in args
     * @param target            - A reference to the target to which the event will be dispatched
     * @param basicCheckProcess - A boolean that determines if we need to execute the basic check up process
     */
    CustomEventRegisterManager.prototype.removeEventListenersByTarget = function (target, basicCheckProcess) {
        if (basicCheckProcess === void 0) { basicCheckProcess = true; }
        if (basicCheckProcess && !this._listeners.size) {
            console.warn("No listener saved");
            return;
        }
        var _loop_1 = function (type) {
            var details = this_1.getListenerDetailsByType(type);
            var updatedDetails = []; // Immutability
            details.forEach(function (value) {
                if (value.target === target) {
                    value.target.removeEventListener(type, value.listener, value.options);
                }
                else {
                    updatedDetails.push(value);
                }
            });
            if (updatedDetails.length)
                this_1._listeners.set(type, updatedDetails);
        };
        var this_1 = this;
        for (var _i = 0, _a = this._listeners.keys(); _i < _a.length; _i++) {
            var type = _a[_i];
            _loop_1(type);
        }
    };
    /**
     * Remove all the event listeners for each type provided in args
     * @param {Array} targets - An array of references to the targets - to which the events was previously dispatched -
     *                          for remove the associated listeners
     */
    CustomEventRegisterManager.prototype.removeEventListenersByTargets = function (targets) {
        if (targets === void 0) { targets = []; }
        if (!this._listeners.size) {
            console.warn("No listener saved");
            return;
        }
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            this.removeEventListenersByTarget(target, false);
        }
        if (this.debug)
            console.debug("All listeners for the following targets: " + JSON.stringify(targets) + " has been removed");
    };
    /**
     * Remove an event listener by his id provided in args
     * @param id {string|number} - A related id used that identify the event listener
     * @param basicCheckProcess  - A boolean that determines if we need to execute the basic check up process
     * @return {boolean}         - True if the process has been successfulled. Otherwise, false.
     */
    CustomEventRegisterManager.prototype.removeEventListenerById = function (id, basicCheckProcess) {
        if (basicCheckProcess === void 0) { basicCheckProcess = true; }
        if (basicCheckProcess && !this._listeners.size) {
            console.warn("No listener saved");
            return;
        }
        for (var _i = 0, _a = this._listeners.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b[0], listenersDetails = _b[1];
            for (var _c = 0, _d = listenersDetails.entries(); _c < _d.length; _c++) {
                var _e = _d[_c], index = _e[0], details = _e[1];
                if (details._id === id) {
                    // remove finded element from the list
                    var updatedDetails = __spreadArrays(listenersDetails);
                    updatedDetails.splice(index, 1);
                    this._listeners.set(type, updatedDetails); // update
                    details.target.removeEventListener(details.type, details.listener, details.options);
                    if (this.debug)
                        console.debug("The associated listener for the id: " + id + " has been removed");
                    return true;
                }
            }
        }
        console.warn("No associated listener found for the id: " + id);
        return false;
    };
    /**
     * Remove all the event listeners for each id provided in args
     * @param {Array} ids - An array of the ids of each event listeners to remove
     */
    CustomEventRegisterManager.prototype.removeEventListenersByIds = function (ids) {
        if (ids === void 0) { ids = []; }
        if (!this._listeners.size) {
            console.warn("No listener saved");
            return;
        }
        var removedIds = []; // list all removed ids
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            var isRemoved = this.removeEventListenerById(id, false);
            if (isRemoved)
                removedIds.push(id);
        }
        if (this.debug)
            console.debug("All listeners for the following targets: " + JSON.stringify(removedIds) + " has been removed");
    };
    return CustomEventRegisterManager;
}());
exports["default"] = new CustomEventRegisterManager();
