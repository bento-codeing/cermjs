/**
 * Custom Event Register Manager (singleton)
 */
class CustomEventRegisterManager {
  constructor(debug = false) {
    this._listeners = new Map();
    this.debug      = debug;
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
   * @param {Element|Window|Document} target - An element to attach the listener
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

    for (const {target, listener, options} of currentListenerDetailsForType) {
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
      const details        = this.getListenerDetailsByType(type);
      const updatedDetails = []; // Immutability
      details.forEach(value => {
        if (value.target === target) {
          value.target.removeEventListener(type, value.listener, value.options);
        }
        else {
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

export default new CustomEventRegisterManager();