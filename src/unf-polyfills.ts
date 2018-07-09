// UNFETTER polyfills

Object.keys = Object.keys || (obj => {
    const keys = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
});
Object.values = Object.values || (obj => Object.keys(obj).map(key => obj[key]));
if (!Object.entries) {
    Object.entries = function(obj) {
        const ownProps = Object.keys(obj);
        let i = ownProps.length, resArray = new Array(i); // preallocate the Array
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
    }
};

if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            const to = Object(target);
            for (let index = 1; index < arguments.length; index++) {
                const nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    for (const nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

(window as any).global = window;

// TODO find a better polyfill - This is to fix a problem with Angular 6 menus
/**
 * "ERROR" Error: The animation trigger "transform" has failed to build due to the following errors:
 * - The provided animation property "box-shadow" is not a supported CSS property for animations
 */
if (!document.body.style['box-shadow']) {
    Object.defineProperty(document.body.style, 'box-shadow', {
        value: () => {
            return {
                enumerable: true,
                configurable: true
            };
        },
    });
}
