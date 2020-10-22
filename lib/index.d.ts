interface EventListenerDetails {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
    mozSystemGroup?: boolean;
}
interface ListenerDetails {
    _id: string | number;
    target: Window | Document | Element;
    type: string;
    listener(): any;
    options: EventListenerDetails;
}
/**
 * Custom Event Register Manager (singleton)
 */
declare class CustomEventRegisterManager {
    debug: boolean;
    private _listeners;
    private _eventListenerCounter;
    constructor(debug?: boolean);
    /**
     * Set the debug mode
     * @param use - A Boolean indicating that the debug should be enable or not
     */
    setDebugMode(use?: boolean): void;
    /**
     * Get all listeners to which the user has subscribed
     * @returns {Map}
     */
    listAll(): Map<string, Array<ListenerDetails>>;
    /**
     * Get associated listeners for the type provided in args
     * @param {string} type - A case-sensitive string representing the event type to use for getting the associated listeners
     * @return {Object}
     */
    getListenerDetailsByType(type: string): Array<ListenerDetails>;
    /**
     * Get associated listeners for the id provided in args
     * @param id {string|number} - A related id used to identify the event
     * @returns {Object|undefined}
     */
    getListenerDetailsById(id: any): ListenerDetails;
    /**
     * Add event listener on specific target
     * @param {Window|Document|Element} target - An element to attach the listener
     * @param {string} type                    - A case-sensitive string representing the event type to listen for
     * @param listener                         - An event listener callback
     * @param {Object} options                 - An options object specifies characteristics about the event listener
     * @param {string} customId                - A custom id used to set the _id of the event
     */
    addEventListener(target: Window | Document | Element, type: string, listener: any, options?: EventListenerDetails, customId?: string): void;
    /**
     * Remove all the event listeners by the type provided in args
     * @param {string} type               - A case-sensitive string representing the event type to use for remove the
     *                                      associated listeners
     * @param {boolean} basicCheckProcess - A boolean that determines if we need to execute the basic check up process
     */
    removeEventListenersByType(type: string, basicCheckProcess?: boolean): void;
    /**
     * Remove all the event listeners for each type provided in args
     * @param {Array} types - An array of case-sensitive strings representing the event type to use for
     *                                      remove the associated listeners
     */
    removeEventListenersByTypes(types?: Array<string>): void;
    /**
     * Remove all the event listeners by the target provided in args
     * @param target            - A reference to the target to which the event will be dispatched
     * @param basicCheckProcess - A boolean that determines if we need to execute the basic check up process
     */
    removeEventListenersByTarget(target: Window | Document | Element, basicCheckProcess?: boolean): void;
    /**
     * Remove all the event listeners for each type provided in args
     * @param {Array} targets - An array of references to the targets - to which the events was previously dispatched -
     *                          for remove the associated listeners
     */
    removeEventListenersByTargets(targets?: Array<Window | Document | Element>): void;
    /**
     * Remove an event listener by his id provided in args
     * @param id {string|number} - A related id used that identify the event listener
     * @param basicCheckProcess  - A boolean that determines if we need to execute the basic check up process
     * @return {boolean}         - True if the process has been successfulled. Otherwise, false.
     */
    removeEventListenerById(id: string | number, basicCheckProcess?: boolean): boolean;
    /**
     * Remove all the event listeners for each id provided in args
     * @param {Array} ids - An array of the ids of each event listeners to remove
     */
    removeEventListenersByIds(ids?: Array<string | number>): void;
}
declare const _default: CustomEventRegisterManager;
export default _default;
