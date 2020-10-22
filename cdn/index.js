function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Custom Event Register Manager (singleton)
 */
class CustomEventRegisterManager {
  constructor(debug = false) {
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


  setDebugMode(use = false) {
    this.debug = true;
  }
  /**
   * Get all listeners to which the user has subscribed
   * @returns {Map}
   */


  listAll() {
    return new Map(this._listeners);
  }
  /**
   * Get associated listeners for the type provided in args
   * @param {string} type - A case-sensitive string representing the event type to use for getting the associated listeners
   * @return {Object}
   */


  getListenerDetailsByType(type) {
    return this._listeners.get(type);
  }
  /**
   * Get associated listeners for the id provided in args
   * @param id {string|number} - A related id used to identify the event
   * @returns {Object|undefined}
   */


  getListenerDetailsById(id) {
    for (const listenersDetails of this._listeners.values()) {
      for (const detail of listenersDetails) {
        if (detail._id === id) {
          return detail;
        }
      }
    }

    console.warn(`No associated listener for the id: ${id}`);
  }
  /**
   * Add event listener on specific target
   * @param {Window|Document|Element} target - An element to attach the listener
   * @param {string} type                    - A case-sensitive string representing the event type to listen for
   * @param listener                         - An event listener callback
   * @param {Object} options                 - An options object specifies characteristics about the event listener
   * @param {string} customId                - A custom id used to set the _id of the event
   */


  addEventListener(target = window, type, listener, options = {}, customId) {
    let details = [{
      _id: customId || this._eventListenerCounter,
      target,
      type,
      listener,
      options
    }];

    if (this._listeners.size) {
      const currentListenerDetailsForType = this.getListenerDetailsByType(type);

      if (Array.isArray(currentListenerDetailsForType) && currentListenerDetailsForType.length) {
        details = [...details, ...currentListenerDetailsForType];
      }
    }

    this._listeners.set(type, details);

    this._eventListenerCounter = ++this._eventListenerCounter;
    target.addEventListener(type, listener, options);
    if (this.debug) console.debug(`The event listener for the type: ${type} has been added for the target:`, target);
  }
  /**
   * Remove all the event listeners by the type provided in args
   * @param {string} type               - A case-sensitive string representing the event type to use for remove the
   *                                      associated listeners
   * @param {boolean} basicCheckProcess - A boolean that determines if we need to execute the basic check up process
   */


  removeEventListenersByType(type, basicCheckProcess = true) {
    if (basicCheckProcess && !this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    const currentListenerDetailsForType = this.getListenerDetailsByType(type);

    if (!Array.isArray(currentListenerDetailsForType) || !currentListenerDetailsForType.length) {
      console.warn(`No listener saved for the type ${type}`);
      return;
    }

    for (const {
      target,
      listener,
      options
    } of currentListenerDetailsForType) {
      target.removeEventListener(type, listener, options);
    }

    this._listeners.delete(type);

    if (this.debug) console.debug(`All listeners for the type ${type} has been removed`);
  }
  /**
   * Remove all the event listeners for each type provided in args
   * @param {Array} types - An array of case-sensitive strings representing the event type to use for
   *                                      remove the associated listeners
   */


  removeEventListenersByTypes(types = []) {
    if (!this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const type of types) {
      this.removeEventListenersByType(type, false);
    }

    if (this.debug) console.debug(`All listeners for the following types: ${JSON.stringify(types)} has been removed`);
  }
  /**
   * Remove all the event listeners by the target provided in args
   * @param target            - A reference to the target to which the event will be dispatched
   * @param basicCheckProcess - A boolean that determines if we need to execute the basic check up process
   */


  removeEventListenersByTarget(target, basicCheckProcess = true) {
    if (basicCheckProcess && !this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const type of this._listeners.keys()) {
      const details = this.getListenerDetailsByType(type);
      const updatedDetails = []; // Immutability

      details.forEach(value => {
        if (value.target === target) {
          value.target.removeEventListener(type, value.listener, value.options);
        } else {
          updatedDetails.push(value);
        }
      });
      if (updatedDetails.length) this._listeners.set(type, updatedDetails);
    }
  }
  /**
   * Remove all the event listeners for each type provided in args
   * @param {Array} targets - An array of references to the targets - to which the events was previously dispatched -
   *                          for remove the associated listeners
   */


  removeEventListenersByTargets(targets = []) {
    if (!this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const target of targets) {
      this.removeEventListenersByTarget(target, false);
    }

    if (this.debug) console.debug(`All listeners for the following targets: ${JSON.stringify(targets)} has been removed`);
  }
  /**
   * Remove an event listener by his id provided in args
   * @param id {string|number} - A related id used that identify the event listener
   * @param basicCheckProcess  - A boolean that determines if we need to execute the basic check up process
   * @return {boolean}         - True if the process has been successfulled. Otherwise, false.
   */


  removeEventListenerById(id, basicCheckProcess = true) {
    if (basicCheckProcess && !this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const [type, listenersDetails] of this._listeners.entries()) {
      for (const [index, details] of listenersDetails.entries()) {
        if (details._id === id) {
          // remove finded element from the list
          const updatedDetails = [...listenersDetails];
          updatedDetails.splice(index, 1);

          this._listeners.set(type, updatedDetails); // update


          details.target.removeEventListener(details.type, details.listener, details.options);
          if (this.debug) console.debug(`The associated listener for the id: ${id} has been removed`);
          return true;
        }
      }
    }

    console.warn(`No associated listener found for the id: ${id}`);
    return false;
  }
  /**
   * Remove all the event listeners for each id provided in args
   * @param {Array} ids - An array of the ids of each event listeners to remove
   */


  removeEventListenersByIds(ids = []) {
    if (!this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    const removedIds = []; // list all removed ids

    for (const id of ids) {
      const isRemoved = this.removeEventListenerById(id, false);
      if (isRemoved) removedIds.push(id);
    }

    if (this.debug) console.debug(`All listeners for the following targets: ${JSON.stringify(removedIds)} has been removed`);
  }

}

const cerm = new CustomEventRegisterManager();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jZG4vaW5kZXgudHMiXSwibmFtZXMiOlsiQ3VzdG9tRXZlbnRSZWdpc3Rlck1hbmFnZXIiLCJjb25zdHJ1Y3RvciIsImRlYnVnIiwiX2xpc3RlbmVycyIsIk1hcCIsIl9ldmVudExpc3RlbmVyQ291bnRlciIsInNldERlYnVnTW9kZSIsInVzZSIsImxpc3RBbGwiLCJnZXRMaXN0ZW5lckRldGFpbHNCeVR5cGUiLCJ0eXBlIiwiZ2V0IiwiZ2V0TGlzdGVuZXJEZXRhaWxzQnlJZCIsImlkIiwibGlzdGVuZXJzRGV0YWlscyIsInZhbHVlcyIsImRldGFpbCIsIl9pZCIsImNvbnNvbGUiLCJ3YXJuIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsIndpbmRvdyIsImxpc3RlbmVyIiwib3B0aW9ucyIsImN1c3RvbUlkIiwiZGV0YWlscyIsInNpemUiLCJjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsInNldCIsInJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUeXBlIiwiYmFzaWNDaGVja1Byb2Nlc3MiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGVsZXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVR5cGVzIiwidHlwZXMiLCJKU09OIiwic3RyaW5naWZ5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVRhcmdldCIsImtleXMiLCJ1cGRhdGVkRGV0YWlscyIsImZvckVhY2giLCJ2YWx1ZSIsInB1c2giLCJyZW1vdmVFdmVudExpc3RlbmVyc0J5VGFyZ2V0cyIsInRhcmdldHMiLCJyZW1vdmVFdmVudExpc3RlbmVyQnlJZCIsImVudHJpZXMiLCJpbmRleCIsInNwbGljZSIsInJlbW92ZUV2ZW50TGlzdGVuZXJzQnlJZHMiLCJpZHMiLCJyZW1vdmVkSWRzIiwiaXNSZW1vdmVkIiwiY2VybSJdLCJtYXBwaW5ncyI6Ijs7QUFlQTtBQUNBO0FBQ0E7QUFDQSxNQUFNQSwwQkFBTixDQUFpQztBQUsvQkMs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LENBQUNGLE9BQTNFO0FBRUEsY0FBSSxLQUFLdEIsS0FBVCxFQUFnQmdCLE9BQU8sQ0FBQ2hCLEtBQVIsQ0FBZSx1Q0FBc0NXLEVBQUcsbUJBQXhEO0FBQ2hCLGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0RLLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLDRDQUEyQ04sRUFBRyxFQUE1RDtBQUNBLFdBQU8sS0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUNFd0MsRUFBQUEseUJBQXlCLENBQUNDLEdBQXlCLEdBQUcsRUFBN0IsRUFBdUM7QUFDOUQsUUFBSSxDQUFDLEtBQUtuRCxVQUFMLENBQWdCd0IsSUFBckIsRUFBMkI7QUFDekJULE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLG1CQUFiO0FBQ0E7QUFDRDs7QUFFRCxVQUFNb0MsVUFBZ0MsR0FBRyxFQUF6QyxDQU44RCxDQU1qQjs7QUFFN0MsU0FBSyxNQUFNMUMsRUFBWCxJQUFpQnlDLEdBQWpCLEVBQXNCO0FBQ3BCLFlBQU1FLFNBQWtCLEdBQUcsS0FBS1AsdUJBQUwsQ0FBNkJwQyxFQUE3QixFQUFpQyxLQUFqQyxDQUEzQjtBQUNBLFVBQUkyQyxTQUFKLEVBQWVELFVBQVUsQ0FBQ1QsSUFBWCxDQUFnQmpDLEVBQWhCO0FBQ2hCOztBQUVELFFBQUksS0FBS1gsS0FBVCxFQUFnQmdCLE9BQU8sQ0FBQ2hCLEtBQVIsQ0FBZSw0Q0FBMkNxQyxJQUFJLENBQUNDLFNBQUwsQ0FBZWUsVUFBZixDQUEyQixtQkFBckY7QUFDakI7O0FBN044Qjs7QUErTmpDLE1BQU1FLElBQUksR0FBRyxJQUFJekQsMEJBQUosRUFBYiIsInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBFdmVudExpc3RlbmVyRGV0YWlscyB7XG4gIGNhcHR1cmU/OiBib29sZWFuLFxuICBvbmNlPzogYm9vbGVhbixcbiAgcGFzc2l2ZT86IGJvb2xlYW4sXG4gIG1velN5c3RlbUdyb3VwPzogYm9vbGVhbixcbn1cblxuaW50ZXJmYWNlIExpc3RlbmVyRGV0YWlscyB7XG4gIF9pZDogc3RyaW5nfG51bWJlcixcbiAgdGFyZ2V0OiBXaW5kb3d8RG9jdW1lbnR8RWxlbWVudCxcbiAgdHlwZTogc3RyaW5nLFxuICBsaXN0ZW5lcigpOiBhbnksXG4gIG9wdGlvbnM6IEV2ZW50TGlzdGVuZXJEZXRhaWxzLFxufVxuXG4vKipcbiAqIEN1c3RvbSBFdmVudCBSZWdpc3RlciBNYW5hZ2VyIChzaW5nbGV0b24pXG4gKi9cbmNsYXNzIEN1c3RvbUV2ZW50UmVnaXN0ZXJNYW5hZ2VyIHtcbiAgcHVibGljIGRlYnVnOiBib29sZWFuO1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IE1hcDxzdHJpbmcsIEFycmF5PExpc3RlbmVyRGV0YWlscz4+O1xuICBwcml2YXRlIF9ldmVudExpc3RlbmVyQ291bnRlcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGRlYnVnOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmRlYnVnICAgICAgICAgICAgICAgICA9IGRlYnVnO1xuICAgIHRoaXMuX2xpc3RlbmVycyAgICAgICAgICAgID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJDb3VudGVyID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlYnVnIG1vZGVcbiAgICogQHBhcmFtIHVzZSAtIEEgQm9vbGVhbiBpbmRpY2F0aW5nIHRoYXQgdGhlIGRlYnVnIHNob3VsZCBiZSBlbmFibGUgb3Igbm90XG4gICAqL1xuICBzZXREZWJ1Z01vZGUodXNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmRlYnVnID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIGxpc3RlbmVycyB0byB3aGljaCB0aGUgdXNlciBoYXMgc3Vic2NyaWJlZFxuICAgKiBAcmV0dXJucyB7TWFwfVxuICAgKi9cbiAgbGlzdEFsbCgpOiBNYXA8c3RyaW5nLCBBcnJheTxMaXN0ZW5lckRldGFpbHM+PiB7XG4gICAgcmV0dXJuIG5ldyBNYXAodGhpcy5fbGlzdGVuZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYXNzb2NpYXRlZCBsaXN0ZW5lcnMgZm9yIHRoZSB0eXBlIHByb3ZpZGVkIGluIGFyZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBBIGNhc2Utc2Vuc2l0aXZlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gdXNlIGZvciBnZXR0aW5nIHRoZSBhc3NvY2lhdGVkIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRMaXN0ZW5lckRldGFpbHNCeVR5cGUodHlwZTogc3RyaW5nKTogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVycy5nZXQodHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFzc29jaWF0ZWQgbGlzdGVuZXJzIGZvciB0aGUgaWQgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0gaWQge3N0cmluZ3xudW1iZXJ9IC0gQSByZWxhdGVkIGlkIHVzZWQgdG8gaWRlbnRpZnkgdGhlIGV2ZW50XG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgZ2V0TGlzdGVuZXJEZXRhaWxzQnlJZChpZCkge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXJzRGV0YWlscyBvZiB0aGlzLl9saXN0ZW5lcnMudmFsdWVzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgZGV0YWlsIG9mIGxpc3RlbmVyc0RldGFpbHMpIHtcbiAgICAgICAgaWYgKGRldGFpbC5faWQgPT09IGlkKSB7XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLndhcm4oYE5vIGFzc29jaWF0ZWQgbGlzdGVuZXIgZm9yIHRoZSBpZDogJHtpZH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZXZlbnQgbGlzdGVuZXIgb24gc3BlY2lmaWMgdGFyZ2V0XG4gICAqIEBwYXJhbSB7V2luZG93fERvY3VtZW50fEVsZW1lbnR9IHRhcmdldCAtIEFuIGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAgICAgICAgICAgICAgICAgICAgLSBBIGNhc2Utc2Vuc2l0aXZlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvclxuICAgKiBAcGFyYW0gbGlzdGVuZXIgICAgICAgICAgICAgICAgICAgICAgICAgLSBBbiBldmVudCBsaXN0ZW5lciBjYWxsYmFja1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgICAgICAgICAgLSBBbiBvcHRpb25zIG9iamVjdCBzcGVjaWZpZXMgY2hhcmFjdGVyaXN0aWNzIGFib3V0IHRoZSBldmVudCBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VzdG9tSWQgICAgICAgICAgICAgICAgLSBBIGN1c3RvbSBpZCB1c2VkIHRvIHNldCB0aGUgX2lkIG9mIHRoZSBldmVudFxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IFdpbmRvd3xEb2N1bWVudHxFbGVtZW50ID0gd2luZG93LCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBhbnksIG9wdGlvbnM6IEV2ZW50TGlzdGVuZXJEZXRhaWxzID0ge30sIGN1c3RvbUlkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGRldGFpbHM6IEFycmF5PExpc3RlbmVyRGV0YWlscz4gPSBbe1xuICAgICAgX2lkOiBjdXN0b21JZCB8fCB0aGlzLl9ldmVudExpc3RlbmVyQ291bnRlcixcbiAgICAgIHRhcmdldCxcbiAgICAgIHR5cGUsXG4gICAgICBsaXN0ZW5lcixcbiAgICAgIG9wdGlvbnMsXG4gICAgfV07XG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zdCBjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZTogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiA9IHRoaXMuZ2V0TGlzdGVuZXJEZXRhaWxzQnlUeXBlKHR5cGUpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGUpICYmIGN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlLmxlbmd0aCkge1xuICAgICAgICBkZXRhaWxzID0gWy4uLmRldGFpbHMsIC4uLmN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlXTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbGlzdGVuZXJzLnNldCh0eXBlLCBkZXRhaWxzKTtcbiAgICB0aGlzLl9ldmVudExpc3RlbmVyQ291bnRlciA9ICsrdGhpcy5fZXZlbnRMaXN0ZW5lckNvdW50ZXI7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUuZGVidWcoYFRoZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHR5cGU6ICR7dHlwZX0gaGFzIGJlZW4gYWRkZWQgZm9yIHRoZSB0YXJnZXQ6YCwgdGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgYnkgdGhlIHR5cGUgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAgICAgICAgICAgICAgIC0gQSBjYXNlLXNlbnNpdGl2ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIHVzZSBmb3IgcmVtb3ZlIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRlZCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHtib29sZWFufSBiYXNpY0NoZWNrUHJvY2VzcyAtIEEgYm9vbGVhbiB0aGF0IGRldGVybWluZXMgaWYgd2UgbmVlZCB0byBleGVjdXRlIHRoZSBiYXNpYyBjaGVjayB1cCBwcm9jZXNzXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyc0J5VHlwZSh0eXBlOiBzdHJpbmcsIGJhc2ljQ2hlY2tQcm9jZXNzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGlmIChiYXNpY0NoZWNrUHJvY2VzcyAmJiAhdGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGxpc3RlbmVyIHNhdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRMaXN0ZW5lckRldGFpbHNGb3JUeXBlOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+ID0gdGhpcy5nZXRMaXN0ZW5lckRldGFpbHNCeVR5cGUodHlwZSk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudExpc3RlbmVyRGV0YWlsc0ZvclR5cGUpIHx8ICFjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZS5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2FybihgTm8gbGlzdGVuZXIgc2F2ZWQgZm9yIHRoZSB0eXBlICR7dHlwZX1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHt0YXJnZXQsIGxpc3RlbmVyLCBvcHRpb25zfSBvZiBjdXJyZW50TGlzdGVuZXJEZXRhaWxzRm9yVHlwZSkge1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMuX2xpc3RlbmVycy5kZWxldGUodHlwZSk7XG5cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5kZWJ1ZyhgQWxsIGxpc3RlbmVycyBmb3IgdGhlIHR5cGUgJHt0eXBlfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoIHR5cGUgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0ge0FycmF5fSB0eXBlcyAtIEFuIGFycmF5IG9mIGNhc2Utc2Vuc2l0aXZlIHN0cmluZ3MgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIHVzZSBmb3JcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSB0aGUgYXNzb2NpYXRlZCBsaXN0ZW5lcnNcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUeXBlcyh0eXBlczogQXJyYXk8c3RyaW5nPiA9IFtdKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiTm8gbGlzdGVuZXIgc2F2ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB0eXBlIG9mIHR5cGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUeXBlKHR5cGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5kZWJ1ZyhgQWxsIGxpc3RlbmVycyBmb3IgdGhlIGZvbGxvd2luZyB0eXBlczogJHtKU09OLnN0cmluZ2lmeSh0eXBlcyl9IGhhcyBiZWVuIHJlbW92ZWRgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgYnkgdGhlIHRhcmdldCBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSB0YXJnZXQgICAgICAgICAgICAtIEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZFxuICAgKiBAcGFyYW0gYmFzaWNDaGVja1Byb2Nlc3MgLSBBIGJvb2xlYW4gdGhhdCBkZXRlcm1pbmVzIGlmIHdlIG5lZWQgdG8gZXhlY3V0ZSB0aGUgYmFzaWMgY2hlY2sgdXAgcHJvY2Vzc1xuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVRhcmdldCh0YXJnZXQ6IFdpbmRvd3xEb2N1bWVudHxFbGVtZW50LCBiYXNpY0NoZWNrUHJvY2VzczogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoYmFzaWNDaGVja1Byb2Nlc3MgJiYgIXRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyBsaXN0ZW5lciBzYXZlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHR5cGUgb2YgdGhpcy5fbGlzdGVuZXJzLmtleXMoKSkge1xuICAgICAgY29uc3QgZGV0YWlsczogQXJyYXk8TGlzdGVuZXJEZXRhaWxzPiAgICAgICAgPSB0aGlzLmdldExpc3RlbmVyRGV0YWlsc0J5VHlwZSh0eXBlKTtcbiAgICAgIGNvbnN0IHVwZGF0ZWREZXRhaWxzOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+ID0gW107IC8vIEltbXV0YWJpbGl0eVxuICAgICAgZGV0YWlscy5mb3JFYWNoKCh2YWx1ZTogTGlzdGVuZXJEZXRhaWxzKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS50YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgIHZhbHVlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIHZhbHVlLmxpc3RlbmVyLCB2YWx1ZS5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVkRGV0YWlscy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAodXBkYXRlZERldGFpbHMubGVuZ3RoKSB0aGlzLl9saXN0ZW5lcnMuc2V0KHR5cGUsIHVwZGF0ZWREZXRhaWxzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoIHR5cGUgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0ge0FycmF5fSB0YXJnZXRzIC0gQW4gYXJyYXkgb2YgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0cyAtIHRvIHdoaWNoIHRoZSBldmVudHMgd2FzIHByZXZpb3VzbHkgZGlzcGF0Y2hlZCAtXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgcmVtb3ZlIHRoZSBhc3NvY2lhdGVkIGxpc3RlbmVyc1xuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnNCeVRhcmdldHModGFyZ2V0czogQXJyYXk8V2luZG93fERvY3VtZW50fEVsZW1lbnQ+ID0gW10pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyBsaXN0ZW5lciBzYXZlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiB0YXJnZXRzKSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzQnlUYXJnZXQodGFyZ2V0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUuZGVidWcoYEFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBmb2xsb3dpbmcgdGFyZ2V0czogJHtKU09OLnN0cmluZ2lmeSh0YXJnZXRzKX0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciBieSBoaXMgaWQgcHJvdmlkZWQgaW4gYXJnc1xuICAgKiBAcGFyYW0gaWQge3N0cmluZ3xudW1iZXJ9IC0gQSByZWxhdGVkIGlkIHVzZWQgdGhhdCBpZGVudGlmeSB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICogQHBhcmFtIGJhc2ljQ2hlY2tQcm9jZXNzICAtIEEgYm9vbGVhbiB0aGF0IGRldGVybWluZXMgaWYgd2UgbmVlZCB0byBleGVjdXRlIHRoZSBiYXNpYyBjaGVjayB1cCBwcm9jZXNzXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgLSBUcnVlIGlmIHRoZSBwcm9jZXNzIGhhcyBiZWVuIHN1Y2Nlc3NmdWxsZWQuIE90aGVyd2lzZSwgZmFsc2UuXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyQnlJZChpZDogc3RyaW5nfG51bWJlciwgYmFzaWNDaGVja1Byb2Nlc3M6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgaWYgKGJhc2ljQ2hlY2tQcm9jZXNzICYmICF0aGlzLl9saXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiTm8gbGlzdGVuZXIgc2F2ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBbdHlwZSwgbGlzdGVuZXJzRGV0YWlsc10gb2YgdGhpcy5fbGlzdGVuZXJzLmVudHJpZXMoKSkge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIGRldGFpbHNdIG9mIGxpc3RlbmVyc0RldGFpbHMuZW50cmllcygpKSB7XG4gICAgICAgIGlmIChkZXRhaWxzLl9pZCA9PT0gaWQpIHtcbiAgICAgICAgICAvLyByZW1vdmUgZmluZGVkIGVsZW1lbnQgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgIGNvbnN0IHVwZGF0ZWREZXRhaWxzOiBBcnJheTxMaXN0ZW5lckRldGFpbHM+ID0gWy4uLmxpc3RlbmVyc0RldGFpbHNdO1xuICAgICAgICAgIHVwZGF0ZWREZXRhaWxzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc2V0KHR5cGUsIHVwZGF0ZWREZXRhaWxzKTsgLy8gdXBkYXRlXG5cbiAgICAgICAgICBkZXRhaWxzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGRldGFpbHMudHlwZSwgZGV0YWlscy5saXN0ZW5lciwgZGV0YWlscy5vcHRpb25zKTtcblxuICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmRlYnVnKGBUaGUgYXNzb2NpYXRlZCBsaXN0ZW5lciBmb3IgdGhlIGlkOiAke2lkfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS53YXJuKGBObyBhc3NvY2lhdGVkIGxpc3RlbmVyIGZvdW5kIGZvciB0aGUgaWQ6ICR7aWR9YCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCBpZCBwcm92aWRlZCBpbiBhcmdzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGlkcyAtIEFuIGFycmF5IG9mIHRoZSBpZHMgb2YgZWFjaCBldmVudCBsaXN0ZW5lcnMgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyc0J5SWRzKGlkczogQXJyYXk8c3RyaW5nfG51bWJlcj4gPSBbXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGxpc3RlbmVyIHNhdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZWRJZHM6IEFycmF5PHN0cmluZ3xudW1iZXI+ID0gW107IC8vIGxpc3QgYWxsIHJlbW92ZWQgaWRzXG5cbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgaXNSZW1vdmVkOiBib29sZWFuID0gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyQnlJZChpZCwgZmFsc2UpO1xuICAgICAgaWYgKGlzUmVtb3ZlZCkgcmVtb3ZlZElkcy5wdXNoKGlkKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5kZWJ1ZyhgQWxsIGxpc3RlbmVycyBmb3IgdGhlIGZvbGxvd2luZyB0YXJnZXRzOiAke0pTT04uc3RyaW5naWZ5KHJlbW92ZWRJZHMpfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gIH1cbn1cbmNvbnN0IGNlcm0gPSBuZXcgQ3VzdG9tRXZlbnRSZWdpc3Rlck1hbmFnZXIoKTsiXX0=