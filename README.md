![](landing.png) 
## General information
Small software library to manage event listeners.

## Changelog 	
###### A detailed changelog, intended for programmers

## News
###### No news

## Get started
Learn how to include CERMJS in your project

#### Installation
The best way to consume CERMJS is via the npm package which you can install with npm.
> npm install cermjs

#### Design pattern
CERM is a module based on a design pattern: the singleton. The objective is to restrict the instance of its class to a single call. In this way, no matter where you call it from, it will always be the same instance.

#### Usage 
To call this module, nothing could be easier. Simply import the module as soon as you need it like this: 
```js
import cerm from "cermjs"; // ES6
const cerm = require("cermjs"); // ES5
```

## API
- The `setDebugMode` method allows you to set the debug mode
    - Parameter:
        - `use`: A boolean indicating that the debug should be enable or not. Default to ```false```
        
    - Example:
        > cerm.setDebugMode(true) // to enable it
        
- The `listAll` method allows you to get the entire list of listeners that you suscribed 
    - Example:
        > cerm.listAll();
                   
- The `getListenerDetailsByType` method allows you to get the details of an event listener you suscribed by his type
    - Parameter:
        - `type`: A case-sensitive string representing the event type to use for getting the details
        
    - Example:
        > cerm.getListenerDetailsByType("click"); // get all suscribed event with "click" type
        
- The `getListenerDetailsById` method allows you to get the details of an event listener you suscribed by his id _(note: each saved event has an uniq id)_
    - Parameter:
        - `id`: A case-sensitive string or a number indicating that used for getting the details
    
    - Example:
        > cerm.getListenerDetailsById(0) // get the saved event with the id 0

## License
[GNU General Public License v3.0](https://github.com/ARKHN3B/cermjs/blob/main/LICENSE)

## Credits
[@ARKHN3B](https://github.com/ARKHN3B) (Ben Lmsc)

## Known bugs
No bugs found for the moment. Please do not hesitate to report the issue here : []()

## Contributing
Become the first contributor ! 