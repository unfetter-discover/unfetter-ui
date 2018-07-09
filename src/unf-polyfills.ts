// UNFETTER polyfills

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
