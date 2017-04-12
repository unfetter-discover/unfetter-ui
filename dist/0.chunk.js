webpackJsonpac__name_([0],Array(217).concat([
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attack_patterns_module__ = __webpack_require__(384);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AttackPatternsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__attack_patterns_module__["a"]; });



/***/ }),
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_index__ = __webpack_require__(279);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["j"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["k"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["l"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["m"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["n"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["o"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["p"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["q"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["r"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["s"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["t"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["u"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["v"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["w"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["x"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["y"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["z"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["A"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["B"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["C"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["D"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["E"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["F"]; });

//# sourceMappingURL=core.js.map

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(12);

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = coerceBooleanProperty;
/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}
//# sourceMappingURL=boolean-property.js.map

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return UP_ARROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return DOWN_ARROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RIGHT_ARROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LEFT_ARROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PAGE_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PAGE_DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return HOME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return ESCAPE; });
/* unused harmony export BACKSPACE */
/* unused harmony export DELETE */
// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var PAGE_UP = 33;
var PAGE_DOWN = 34;
var HOME = 36;
var END = 35;
var ENTER = 13;
var SPACE = 32;
var TAB = 9;
var ESCAPE = 27;
var BACKSPACE = 8;
var DELETE = 46;
//# sourceMappingURL=keycodes.js.map

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scroll_scroll_dispatcher__ = __webpack_require__(232);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewportRuler; });
/* unused harmony export VIEWPORT_RULER_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VIEWPORT_RULER_PROVIDER; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
var ViewportRuler = (function () {
    function ViewportRuler(scrollDispatcher) {
        var _this = this;
        // Initially cache the document rectangle.
        this._cacheViewportGeometry();
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled().subscribe(function () { return _this._cacheViewportGeometry(); });
    }
    /** Gets a ClientRect for the viewport's bounds. */
    ViewportRuler.prototype.getViewportRect = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var scrollPosition = this.getViewportScrollPosition(documentRect);
        var height = window.innerHeight;
        var width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        var top = -documentRect.top || document.body.scrollTop || window.scrollY || 0;
        var left = -documentRect.left || document.body.scrollLeft || window.scrollX || 0;
        return { top: top, left: left };
    };
    /** Caches the latest client rectangle of the document element. */
    ViewportRuler.prototype._cacheViewportGeometry = function () {
        this._documentRect = document.documentElement.getBoundingClientRect();
    };
    ViewportRuler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__scroll_scroll_dispatcher__["a" /* ScrollDispatcher */]])
    ], ViewportRuler);
    return ViewportRuler;
}());
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), ViewportRuler], __WEBPACK_IMPORTED_MODULE_1__scroll_scroll_dispatcher__["a" /* ScrollDispatcher */]],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};
//# sourceMappingURL=viewport-ruler.js.map

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_auditTime__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_auditTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_auditTime__);
/* unused harmony export DEFAULT_SCROLL_TIME */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollDispatcher; });
/* unused harmony export SCROLL_DISPATCHER_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SCROLL_DISPATCHER_PROVIDER; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/** Time in ms to throttle the scrolling events by default. */
var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = (function () {
    function ScrollDispatcher() {
        var _this = this;
        /** Subject for notifying that a registered scrollable reference element has been scrolled. */
        this._scrolled = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
        // By default, notify a scroll event when the document is scrolled or the window is resized.
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window.document, 'scroll').subscribe(function () { return _this._notify(); });
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window, 'resize').subscribe(function () { return _this._notify(); });
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     *
     * @param scrollable Scrollable instance to be registered.
     */
    ScrollDispatcher.prototype.register = function (scrollable) {
        var _this = this;
        var scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     *
     * @param scrollable Scrollable instance to be deregistered.
     */
    ScrollDispatcher.prototype.deregister = function (scrollable) {
        this.scrollableReferences.get(scrollable).unsubscribe();
        this.scrollableReferences.delete(scrollable);
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     */
    ScrollDispatcher.prototype.scrolled = function (auditTimeInMs) {
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        // In the case of a 0ms delay, return the observable without auditTime since it does add
        // a perceptible delay in processing overhead.
        if (auditTimeInMs == 0) {
            return this._scrolled.asObservable();
        }
        return this._scrolled.asObservable().auditTime(auditTimeInMs);
    };
    /** Returns all registered Scrollables that contain the provided element. */
    ScrollDispatcher.prototype.getScrollContainers = function (elementRef) {
        var _this = this;
        var scrollingContainers = [];
        this.scrollableReferences.forEach(function (subscription, scrollable) {
            if (_this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /** Returns true if the element is contained within the provided Scrollable. */
    ScrollDispatcher.prototype.scrollableContainsElement = function (scrollable, elementRef) {
        var element = elementRef.nativeElement;
        var scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    };
    /** Sends a notification that a scroll event has been fired. */
    ScrollDispatcher.prototype._notify = function () {
        this._scrolled.next();
    };
    ScrollDispatcher = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ScrollDispatcher);
    return ScrollDispatcher;
}());
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new ScrollDispatcher();
}
var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), ScrollDispatcher]],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};
//# sourceMappingURL=scroll-dispatcher.js.map

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RtlModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
var Dir = (function () {
    function Dir() {
        /** Layout direction of the element. */
        this._dir = 'ltr';
        /** Event emitted when the direction changes. */
        this.dirChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: function () {
            return this._dir;
        },
        set: function (v) {
            var old = this._dir;
            this._dir = v;
            if (old != this._dir) {
                this.dirChange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: function () { return this.dir; },
        set: function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('dir'), 
        __metadata('design:type', String)
    ], Dir.prototype, "_dir", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], Dir.prototype, "dirChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.dir'), 
        __metadata('design:type', String)
    ], Dir.prototype, "dir", null);
    Dir = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[dir]',
            // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
            exportAs: '$implicit'
        }), 
        __metadata('design:paramtypes', [])
    ], Dir);
    return Dir;
}());
var RtlModule = (function () {
    function RtlModule() {
    }
    /** @deprecated */
    RtlModule.forRoot = function () {
        return {
            ngModule: RtlModule,
            providers: []
        };
    };
    RtlModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [Dir],
            declarations: [Dir]
        }), 
        __metadata('design:paramtypes', [])
    ], RtlModule);
    return RtlModule;
}());
//# sourceMappingURL=dir.js.map

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__portal_errors__ = __webpack_require__(355);
/* unused harmony export Portal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentPortal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TemplatePortal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BasePortalHost; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
var Portal = (function () {
    function Portal() {
    }
    /** Attach this portal to a host. */
    Portal.prototype.attach = function (host) {
        if (host == null) {
            throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["a" /* NullPortalHostError */]();
        }
        if (host.hasAttached()) {
            throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["b" /* PortalAlreadyAttachedError */]();
        }
        this._attachedHost = host;
        return host.attach(this);
    };
    /** Detach this portal from its host */
    Portal.prototype.detach = function () {
        var host = this._attachedHost;
        if (host == null) {
            throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["c" /* NoPortalAttachedError */]();
        }
        this._attachedHost = null;
        return host.detach();
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    Portal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = (function (_super) {
    __extends(ComponentPortal, _super);
    function ComponentPortal(component, viewContainerRef, injector) {
        if (viewContainerRef === void 0) { viewContainerRef = null; }
        if (injector === void 0) { injector = null; }
        _super.call(this);
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var TemplatePortal = (function (_super) {
    __extends(TemplatePortal, _super);
    function TemplatePortal(template, viewContainerRef) {
        _super.call(this);
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    TemplatePortal.prototype.attach = function (host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return _super.prototype.attach.call(this, host);
    };
    TemplatePortal.prototype.detach = function () {
        this.locals = new Map();
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 */
var BasePortalHost = (function () {
    function BasePortalHost() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    BasePortalHost.prototype.hasAttached = function () {
        return this._attachedPortal != null;
    };
    BasePortalHost.prototype.attach = function (portal) {
        if (portal == null) {
            throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["d" /* NullPortalError */]();
        }
        if (this.hasAttached()) {
            throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["b" /* PortalAlreadyAttachedError */]();
        }
        if (this._isDisposed) {
            throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["e" /* PortalHostAlreadyDisposedError */]();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throw new __WEBPACK_IMPORTED_MODULE_0__portal_errors__["f" /* UnknownPortalTypeError */]();
    };
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
        }
        this._attachedPortal = null;
        if (this._disposeFn != null) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    BasePortalHost.prototype.dispose = function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._isDisposed = true;
    };
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    return BasePortalHost;
}());
//# sourceMappingURL=portal.js.map

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ripple_renderer__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__compatibility_compatibility__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_position_viewport_ruler__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_scroll_scroll_dispatcher__ = __webpack_require__(232);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdRipple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdRippleModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MdRipple = (function () {
    function MdRipple(elementRef, ngZone, ruler) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new __WEBPACK_IMPORTED_MODULE_1__ripple_renderer__["a" /* RippleRenderer */](elementRef, ngZone, ruler);
    }
    MdRipple.prototype.ngOnChanges = function (changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._rippleRenderer.rippleDisabled = this.disabled;
        this._updateRippleConfig();
    };
    MdRipple.prototype.ngOnDestroy = function () {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    };
    /** Launches a manual ripple at the specified position. */
    MdRipple.prototype.launch = function (pageX, pageY, config) {
        this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    };
    /** Updates the ripple configuration with the input values. */
    MdRipple.prototype._updateRippleConfig = function () {
        this._rippleRenderer.rippleConfig = {
            centered: this.centered,
            speedFactor: this.speedFactor,
            radius: this.radius,
            color: this.color
        };
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleTrigger'), 
        __metadata('design:type', Object)
    ], MdRipple.prototype, "trigger", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleCentered'), 
        __metadata('design:type', Boolean)
    ], MdRipple.prototype, "centered", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleDisabled'), 
        __metadata('design:type', Boolean)
    ], MdRipple.prototype, "disabled", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleRadius'), 
        __metadata('design:type', Number)
    ], MdRipple.prototype, "radius", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleSpeedFactor'), 
        __metadata('design:type', Number)
    ], MdRipple.prototype, "speedFactor", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleColor'), 
        __metadata('design:type', String)
    ], MdRipple.prototype, "color", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdRippleUnbounded'), 
        __metadata('design:type', Boolean)
    ], MdRipple.prototype, "unbounded", void 0);
    MdRipple = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-ripple], [mat-ripple]',
            host: {
                '[class.mat-ripple]': 'true',
                '[class.mat-ripple-unbounded]': 'unbounded'
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_3__overlay_position_viewport_ruler__["a" /* ViewportRuler */]])
    ], MdRipple);
    return MdRipple;
}());
var MdRippleModule = (function () {
    function MdRippleModule() {
    }
    /** @deprecated */
    MdRippleModule.forRoot = function () {
        return {
            ngModule: MdRippleModule,
            providers: []
        };
    };
    MdRippleModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__compatibility_compatibility__["a" /* CompatibilityModule */]],
            exports: [MdRipple, __WEBPACK_IMPORTED_MODULE_2__compatibility_compatibility__["a" /* CompatibilityModule */]],
            declarations: [MdRipple],
            providers: [__WEBPACK_IMPORTED_MODULE_3__overlay_position_viewport_ruler__["b" /* VIEWPORT_RULER_PROVIDER */], __WEBPACK_IMPORTED_MODULE_4__overlay_scroll_scroll_dispatcher__["b" /* SCROLL_DISPATCHER_PROVIDER */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdRippleModule);
    return MdRippleModule;
}());
//# sourceMappingURL=ripple.js.map

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* unused harmony export MATERIAL_COMPATIBILITY_MODE */
/* unused harmony export MAT_ELEMENTS_SELECTOR */
/* unused harmony export MD_ELEMENTS_SELECTOR */
/* unused harmony export MatPrefixRejector */
/* unused harmony export MdPrefixRejector */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompatibilityModule; });
/* unused harmony export NoConflictStyleCompatibilityMode */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var MATERIAL_COMPATIBILITY_MODE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('md-compatibility-mode');
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-dialog-actions],\n  [mat-dialog-close],\n  [mat-dialog-content],\n  [mat-dialog-title],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-menu-trigger-for],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [mat-tab-label],\n  [mat-tab-link],\n  [mat-tab-nav-bar],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-button-toggle,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-ink-bar,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-progress-circle,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-body,\n  mat-tab-header,\n  mat-tab-group,\n  mat-toolbar";
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
var MD_ELEMENTS_SELECTOR = "  \n  [md-button],\n  [md-dialog-actions],\n  [md-dialog-close],\n  [md-dialog-content],\n  [md-dialog-title],\n  [md-fab],\n  [md-icon-button],\n  [md-menu-trigger-for],\n  [md-mini-fab],\n  [md-raised-button],\n  [md-tab-label],\n  [md-tab-link],\n  [md-tab-nav-bar],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-button-toggle,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-ink-bar,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-progress-circle,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-body,\n  md-tab-header,\n  md-tab-group,\n  md-toolbar";
/** Directive that enforces that the `mat-` prefix cannot be used. */
var MatPrefixRejector = (function () {
    function MatPrefixRejector(isCompatibilityMode) {
        if (!isCompatibilityMode) {
            throw Error('The "mat-" prefix cannot be used out of ng-material v1 compatibility mode.');
        }
    }
    MatPrefixRejector = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: MAT_ELEMENTS_SELECTOR }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata('design:paramtypes', [Boolean])
    ], MatPrefixRejector);
    return MatPrefixRejector;
}());
/** Directive that enforces that the `md-` prefix cannot be used. */
var MdPrefixRejector = (function () {
    function MdPrefixRejector(isCompatibilityMode) {
        if (isCompatibilityMode) {
            throw Error('The "md-" prefix cannot be used in ng-material v1 compatibility mode.');
        }
    }
    MdPrefixRejector = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: MD_ELEMENTS_SELECTOR }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata('design:paramtypes', [Boolean])
    ], MdPrefixRejector);
    return MdPrefixRejector;
}());
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
var CompatibilityModule = (function () {
    function CompatibilityModule() {
    }
    CompatibilityModule.forRoot = function () {
        return {
            ngModule: CompatibilityModule,
            providers: [],
        };
    };
    CompatibilityModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [MatPrefixRejector, MdPrefixRejector],
            exports: [MatPrefixRejector, MdPrefixRejector],
        }), 
        __metadata('design:paramtypes', [])
    ], CompatibilityModule);
    return CompatibilityModule;
}());
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    NoConflictStyleCompatibilityMode = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                }],
        }), 
        __metadata('design:paramtypes', [])
    ], NoConflictStyleCompatibilityMode);
    return NoConflictStyleCompatibilityMode;
}());
//# sourceMappingURL=compatibility.js.map

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interactivity_checker__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coercion_boolean_property__ = __webpack_require__(229);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusTrap; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Directive for trapping focus within a region.
 *
 * NOTE: This directive currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
var FocusTrap = (function () {
    function FocusTrap(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._disabled = false;
    }
    Object.defineProperty(FocusTrap.prototype, "disabled", {
        /** Whether the focus trap is active. */
        get: function () { return this._disabled; },
        set: function (val) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__coercion_boolean_property__["a" /* coerceBooleanProperty */])(val); },
        enumerable: true,
        configurable: true
    });
    /**
     * Waits for microtask queue to empty, then focuses the first tabbable element within the focus
     * trap region.
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            _this.focusFirstTabbableElement();
        });
    };
    /**
     * Waits for microtask queue to empty, then focuses the last tabbable element within the focus
     * trap region.
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            _this.focusLastTabbableElement();
        });
    };
    /**
     * Focuses the first tabbable element within the focus trap region.
     */
    FocusTrap.prototype.focusFirstTabbableElement = function () {
        var rootElement = this.trappedContent.nativeElement;
        var redirectToElement = rootElement.querySelector('[cdk-focus-start]') ||
            this._getFirstTabbableElement(rootElement);
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Focuses the last tabbable element within the focus trap region.
     */
    FocusTrap.prototype.focusLastTabbableElement = function () {
        var rootElement = this.trappedContent.nativeElement;
        var focusTargets = rootElement.querySelectorAll('[cdk-focus-end]');
        var redirectToElement = null;
        if (focusTargets.length) {
            redirectToElement = focusTargets[focusTargets.length - 1];
        }
        else {
            redirectToElement = this._getLastTabbableElement(rootElement);
        }
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    FocusTrap.prototype._getFirstTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order.
        var childCount = root.children.length;
        for (var i = 0; i < childCount; i++) {
            var tabbableChild = this._getFirstTabbableElement(root.children[i]);
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    FocusTrap.prototype._getLastTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        for (var i = root.children.length - 1; i >= 0; i--) {
            var tabbableChild = this._getLastTabbableElement(root.children[i]);
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('trappedContent'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FocusTrap.prototype, "trappedContent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FocusTrap.prototype, "disabled", null);
    FocusTrap = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'cdk-focus-trap, focus-trap',
            template: "<div *ngIf=\"!disabled\" tabindex=\"0\" (focus)=\"focusLastTabbableElement()\"></div><div #trappedContent class=\"cdk-focus-trap-content\"><ng-content></ng-content></div><div *ngIf=\"!disabled\" tabindex=\"0\" (focus)=\"focusFirstTabbableElement()\"></div>",
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__interactivity_checker__["a" /* InteractivityChecker */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], FocusTrap);
    return FocusTrap;
}());
//# sourceMappingURL=focus-trap.js.map

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keyboard_keycodes__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coercion_boolean_property__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ripple_ripple__ = __webpack_require__(235);
/* unused harmony export MdOptionSelectEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdOptionModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/** Event object emitted by MdOption when selected. */
var MdOptionSelectEvent = (function () {
    function MdOptionSelectEvent(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MdOptionSelectEvent;
}());
/**
 * Single option inside of a `<md-select>` element.
 */
var MdOption = (function () {
    function MdOption(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        this._active = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md-option-" + _uniqueIdCounter++;
        /** Event emitted when the option is selected. */
        this.onSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(MdOption.prototype, "id", {
        /** The unique ID of the option. */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    MdOption.prototype.select = function () {
        this._selected = true;
        this.onSelect.emit(new MdOptionSelectEvent(this, false));
    };
    /** Deselects the option. */
    MdOption.prototype.deselect = function () {
        this._selected = false;
    };
    /** Sets focus onto this option. */
    MdOption.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    MdOption.prototype.setActiveStyles = function () {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._active = true; });
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    MdOption.prototype.setInactiveStyles = function () {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._active = false; });
    };
    /** Ensures the option is selected when activated from the keyboard. */
    MdOption.prototype._handleKeydown = function (event) {
        if (event.keyCode === __WEBPACK_IMPORTED_MODULE_2__keyboard_keycodes__["a" /* ENTER */] || event.keyCode === __WEBPACK_IMPORTED_MODULE_2__keyboard_keycodes__["b" /* SPACE */]) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    MdOption.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = true;
            this.onSelect.emit(new MdOptionSelectEvent(this, true));
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    MdOption.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    MdOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdOption.prototype, "value", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdOption.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdOption.prototype, "onSelect", void 0);
    MdOption = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-option, mat-option',
            host: {
                'role': 'option',
                '[attr.tabindex]': '_getTabIndex()',
                '[class.mat-selected]': 'selected',
                '[class.mat-active]': 'active',
                '[id]': 'id',
                '[attr.aria-selected]': 'selected.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[class.mat-option-disabled]': 'disabled',
                '(click)': '_selectViaInteraction()',
                '(keydown)': '_handleKeydown($event)',
                '[class.mat-option]': 'true',
            },
            template: "<ng-content></ng-content><div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"></div>",
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdOption);
    return MdOption;
}());
var MdOptionModule = (function () {
    function MdOptionModule() {
    }
    MdOptionModule.forRoot = function () {
        return {
            ngModule: MdOptionModule,
            providers: []
        };
    };
    MdOptionModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__ripple_ripple__["a" /* MdRippleModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            exports: [MdOption],
            declarations: [MdOption]
        }), 
        __metadata('design:paramtypes', [])
    ], MdOptionModule);
    return MdOptionModule;
}());
//# sourceMappingURL=option.js.map

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__portal_portal__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_state__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__position_connected_position__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__portal_portal_directives__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rtl_dir__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scroll_scrollable__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__coercion_boolean_property__ = __webpack_require__(229);
/* unused harmony export OverlayOrigin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConnectedOverlayDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
var defaultPositionList = [
    new __WEBPACK_IMPORTED_MODULE_4__position_connected_position__["b" /* ConnectionPositionPair */]({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new __WEBPACK_IMPORTED_MODULE_4__position_connected_position__["b" /* ConnectionPositionPair */]({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var OverlayOrigin = (function () {
    function OverlayOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    OverlayOrigin = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdk-overlay-origin], [overlay-origin]',
            exportAs: 'cdkOverlayOrigin',
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], OverlayOrigin);
    return OverlayOrigin;
}());
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
var ConnectedOverlayDirective = (function () {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
        this._open = false;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the position has changed. */
        this.positionChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the overlay has been attached. */
        this.attach = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the overlay has been detached. */
        this.detach = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._templatePortal = new __WEBPACK_IMPORTED_MODULE_2__portal_portal__["b" /* TemplatePortal */](templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetX", {
        /** The offset in pixels for the overlay connection point on the x-axis */
        get: function () {
            return this._offsetX;
        },
        set: function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._position.withOffsetX(offsetX);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetY", {
        /** The offset in pixels for the overlay connection point on the y-axis */
        get: function () {
            return this._offsetY;
        },
        set: function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._position.withOffsetY(offsetY);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "hasBackdrop", {
        /** Whether or not the overlay should attach a backdrop. */
        get: function () {
            return this._hasBackdrop;
        },
        set: function (value) {
            this._hasBackdrop = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__coercion_boolean_property__["a" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value ? this._attachOverlay() : this._detachOverlay();
            this._open = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        /** The associated overlay reference. */
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "dir", {
        /** The element's layout direction. */
        get: function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    /** Creates an overlay */
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /** Builds the overlay config based on the directive's inputs */
    ConnectedOverlayDirective.prototype._buildConfig = function () {
        var overlayConfig = new __WEBPACK_IMPORTED_MODULE_3__overlay_state__["a" /* OverlayState */]();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = this._createPositionStrategy();
        overlayConfig.positionStrategy = this._position;
        overlayConfig.direction = this.dir;
        return overlayConfig;
    };
    /** Returns the position strategy of the overlay to be set on the overlay config */
    ConnectedOverlayDirective.prototype._createPositionStrategy = function () {
        var pos = this.positions[0];
        var originPoint = { originX: pos.originX, originY: pos.originY };
        var overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        var strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withDirection(this.dir)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    };
    ConnectedOverlayDirective.prototype._handlePositionChanges = function (strategy) {
        var _this = this;
        for (var i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(function (pos) { return _this.positionChange.emit(pos); });
    };
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    ConnectedOverlayDirective.prototype._attachOverlay = function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay();
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
                _this.backdropClick.emit();
            });
        }
    };
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    ConnectedOverlayDirective.prototype._detachOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
    };
    /** Destroys the overlay created by this directive. */
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', OverlayOrigin)
    ], ConnectedOverlayDirective.prototype, "origin", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], ConnectedOverlayDirective.prototype, "positions", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], ConnectedOverlayDirective.prototype, "offsetX", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "offsetY", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "width", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "height", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minWidth", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minHeight", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ConnectedOverlayDirective.prototype, "backdropClass", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "hasBackdrop", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "open", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "backdropClick", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "positionChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "attach", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "detach", void 0);
    ConnectedOverlayDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdk-connected-overlay], [connected-overlay]',
            exportAs: 'cdkConnectedOverlay'
        }),
        __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__overlay__["a" /* Overlay */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_6__rtl_dir__["a" /* Dir */]])
    ], ConnectedOverlayDirective);
    return ConnectedOverlayDirective;
}());
var OverlayModule = (function () {
    function OverlayModule() {
    }
    /** @deprecated */
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: [],
        };
    };
    OverlayModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_5__portal_portal_directives__["a" /* PortalModule */]],
            exports: [ConnectedOverlayDirective, OverlayOrigin, __WEBPACK_IMPORTED_MODULE_7__scroll_scrollable__["a" /* Scrollable */]],
            declarations: [ConnectedOverlayDirective, OverlayOrigin, __WEBPACK_IMPORTED_MODULE_7__scroll_scrollable__["a" /* Scrollable */]],
            providers: [__WEBPACK_IMPORTED_MODULE_1__overlay__["b" /* OVERLAY_PROVIDERS */]],
        }), 
        __metadata('design:paramtypes', [])
    ], OverlayModule);
    return OverlayModule;
}());
//# sourceMappingURL=overlay-directives.js.map

/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform__ = __webpack_require__(241);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features__ = __webpack_require__(284);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlatformModule = (function () {
    function PlatformModule() {
    }
    /** @deprecated */
    PlatformModule.forRoot = function () {
        return {
            ngModule: PlatformModule,
            providers: [],
        };
    };
    PlatformModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__platform__["a" /* Platform */]]
        }), 
        __metadata('design:paramtypes', [])
    ], PlatformModule);
    return PlatformModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Platform; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
var hasV8BreakIterator = typeof (window) !== 'undefined' ?
    (window.Intl && window.Intl.v8BreakIterator) :
    (typeof (Intl) !== 'undefined' && Intl.v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * @docs-private
 */
var Platform = (function () {
    function Platform() {
        /** Layout Engines */
        this.EDGE = /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to excluded from this check.
        this.BLINK = !!(window.chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT;
        // Webkit is part of the userAgent in EdgeHTML Blink and Trident, so we need to
        // ensure that Webkit runs standalone and is not use as another engines base.
        this.WEBKIT = /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /** Browsers and Platform Types */
        this.IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // It's difficult to detect the plain Gecko engine, because most of the browsers identify
        // them self as Gecko-like browsers and modify the userAgent's according to that.
        // Since we only cover one explicit Firefox case, we can simply check for Firefox
        // instead of having an unstable check for Gecko.
        this.FIREFOX = /(firefox|minefield)/i.test(navigator.userAgent);
        // Trident on mobile adds the android platform to the userAgent to trick detections.
        this.ANDROID = /android/i.test(navigator.userAgent) && !this.TRIDENT;
    }
    Platform = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], Platform);
    return Platform;
}());
//# sourceMappingURL=platform.js.map

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialogRef; });

// TODO(jelbourn): resizing
// TODO(jelbourn): afterOpen and beforeClose
/**
 * Reference to a dialog opened via the MdDialog service.
 */
var MdDialogRef = (function () {
    function MdDialogRef(_overlayRef, config) {
        this._overlayRef = _overlayRef;
        this.config = config;
        /** Subject for notifying the user that the dialog has finished closing. */
        this._afterClosed = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    }
    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    MdDialogRef.prototype.close = function (dialogResult) {
        this._overlayRef.dispose();
        this._afterClosed.next(dialogResult);
        this._afterClosed.complete();
    };
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     */
    MdDialogRef.prototype.afterClosed = function () {
        return this._afterClosed.asObservable();
    };
    return MdDialogRef;
}());
//# sourceMappingURL=dialog-ref.js.map

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdMenuItem; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * This directive is intended to be used inside an md-menu tag.
 * It exists mostly to set the role attribute.
 */
var MdMenuItem = (function () {
    function MdMenuItem(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    MdMenuItem.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus');
    };
    Object.defineProperty(MdMenuItem.prototype, "disabled", {
        // this is necessary to support anchors
        /** Whether the menu item is disabled. */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = (value === false || value === undefined) ? null : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdMenuItem.prototype, "isAriaDisabled", {
        /** Sets the aria-disabled property on the menu item. */
        get: function () { return String(!!this.disabled); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdMenuItem.prototype, "_tabindex", {
        get: function () { return this.disabled ? '-1' : '0'; },
        enumerable: true,
        configurable: true
    });
    MdMenuItem.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    MdMenuItem.prototype._checkDisabled = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.disabled'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdMenuItem.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.aria-disabled'), 
        __metadata('design:type', String)
    ], MdMenuItem.prototype, "isAriaDisabled", null);
    MdMenuItem = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: '[md-menu-item], [mat-menu-item]',
            host: {
                'role': 'menuitem',
                '[class.mat-menu-item]': 'true',
                '(click)': '_checkDisabled($event)',
                '[attr.tabindex]': '_tabindex'
            },
            template: "<ng-content></ng-content><div class=\"mat-menu-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"></div>",
            exportAs: 'mdMenuItem'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdMenuItem);
    return MdMenuItem;
}());
//# sourceMappingURL=menu-item.js.map

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdInkBar; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/** The ink-bar is used to display and animate the line underneath the current active tab label. */
var MdInkBar = (function () {
    function MdInkBar(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param element
     */
    MdInkBar.prototype.alignToElement = function (element) {
        this.show();
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'left', this._getLeftPosition(element));
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', this._getElementWidth(element));
    };
    /** Shows the ink bar. */
    MdInkBar.prototype.show = function () {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'visibility', 'visible');
    };
    /** Hides the ink bar. */
    MdInkBar.prototype.hide = function () {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    };
    /**
     * Generates the pixel distance from the left based on the provided element in string format.
     * @param element
     */
    MdInkBar.prototype._getLeftPosition = function (element) {
        return element ? element.offsetLeft + 'px' : '0';
    };
    /**
     * Generates the pixel width from the provided element in string format.
     * @param element
     */
    MdInkBar.prototype._getElementWidth = function (element) {
        return element ? element.offsetWidth + 'px' : '0';
    };
    MdInkBar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-ink-bar, mat-ink-bar',
            host: {
                '[class.mat-ink-bar]': 'true',
            },
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdInkBar);
    return MdInkBar;
}());
//# sourceMappingURL=ink-bar.js.map

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(469);

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdAutocomplete; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueAutocompleteIdCounter = 0;
var MdAutocomplete = (function () {
    function MdAutocomplete() {
        /** Whether the autocomplete panel displays above or below its trigger. */
        this.positionY = 'below';
        /** Whether the autocomplete panel should be visible, depending on option length. */
        this.showPanel = false;
        /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
        this.id = "md-autocomplete-" + _uniqueAutocompleteIdCounter++;
    }
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display
     * options below the fold, as they are not actually being focused when active.
     */
    MdAutocomplete.prototype._setScrollTop = function (scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    };
    /** Panel should hide itself when the option list is empty. */
    MdAutocomplete.prototype._setVisibility = function () {
        var _this = this;
        Promise.resolve().then(function () { return _this.showPanel = !!_this.options.length; });
    };
    /** Sets a class on the panel based on its position (used to set y-offset). */
    MdAutocomplete.prototype._getClassList = function () {
        return {
            'mat-autocomplete-panel-below': this.positionY === 'below',
            'mat-autocomplete-panel-above': this.positionY === 'above',
            'mat-autocomplete-visible': this.showPanel,
            'mat-autocomplete-hidden': !this.showPanel
        };
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
    ], MdAutocomplete.prototype, "template", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('panel'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdAutocomplete.prototype, "panel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__core__["F" /* MdOption */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdAutocomplete.prototype, "options", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Function)
    ], MdAutocomplete.prototype, "displayWith", void 0);
    MdAutocomplete = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-autocomplete, mat-autocomplete',
            template: "<template><div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_getClassList()\" #panel><ng-content></ng-content></div></template>",
            styles: [".mat-autocomplete-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-height:256px;position:relative}.mat-autocomplete-panel.mat-autocomplete-panel-below{top:6px}.mat-autocomplete-panel.mat-autocomplete-panel-above{top:-24px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            exportAs: 'mdAutocomplete',
            host: {
                '[class.mat-autocomplete]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdAutocomplete);
    return MdAutocomplete;
}());
//# sourceMappingURL=autocomplete.js.map

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_key_manager__ = __webpack_require__(276);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusKeyManager; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var FocusKeyManager = (function (_super) {
    __extends(FocusKeyManager, _super);
    function FocusKeyManager(items) {
        _super.call(this, items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    FocusKeyManager.prototype.setActiveItem = function (index) {
        _super.prototype.setActiveItem.call(this, index);
        this.activeItem.focus();
    };
    return FocusKeyManager;
}(__WEBPACK_IMPORTED_MODULE_0__list_key_manager__["a" /* ListKeyManager */]));
//# sourceMappingURL=focus-key-manager.js.map

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__focus_trap__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__live_announcer__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interactivity_checker__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__platform_index__ = __webpack_require__(240);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return A11yModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var A11yModule = (function () {
    function A11yModule() {
    }
    /** @deprecated */
    A11yModule.forRoot = function () {
        return {
            ngModule: A11yModule,
            providers: [],
        };
    };
    A11yModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_5__platform_index__["a" /* PlatformModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_1__focus_trap__["a" /* FocusTrap */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__focus_trap__["a" /* FocusTrap */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__interactivity_checker__["a" /* InteractivityChecker */], __WEBPACK_IMPORTED_MODULE_2__live_announcer__["a" /* LIVE_ANNOUNCER_PROVIDER */]]
        }), 
        __metadata('design:paramtypes', [])
    ], A11yModule);
    return A11yModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_platform__ = __webpack_require__(241);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InteractivityChecker; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * The InteractivityChecker leans heavily on the ally.js accessibility utilities.
 * Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
 * supported.
 */
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
var InteractivityChecker = (function () {
    function InteractivityChecker(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    InteractivityChecker.prototype.isDisabled = function (element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    };
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    InteractivityChecker.prototype.isVisible = function (element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    };
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    InteractivityChecker.prototype.isTabbable = function (element) {
        var frameElement = getWindow(element).frameElement;
        if (frameElement) {
            var frameType = frameElement && frameElement.nodeName.toLowerCase();
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Webkit and Blink consider anything inside of an <object> element as non-tabbable.
            if ((this._platform.BLINK || this._platform.WEBKIT) && frameType === 'object') {
                return false;
            }
            // Webkit and Blink disable tabbing to an element inside of an invisible frame.
            if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) {
                return false;
            }
        }
        var nodeName = element.nodeName.toLowerCase();
        var tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe') {
            // The frames may be tabbable depending on content, but it's not possibly to reliably
            // investigate the content of the frames.
            return false;
        }
        if (nodeName === 'audio') {
            if (!element.hasAttribute('controls')) {
                // By default an <audio> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK) {
                // In Blink <audio controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'video') {
            if (!element.hasAttribute('controls') && this._platform.TRIDENT) {
                // In Trident a <video> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK || this._platform.FIREFOX) {
                // In Chrome and Firefox <video controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'object' && (this._platform.BLINK || this._platform.WEBKIT)) {
            // In all Blink and WebKit based browsers <object> elements are never tabbable.
            return false;
        }
        // In iOS the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        return element.tabIndex >= 0;
    };
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @returns Whether the element is focusable.
     */
    InteractivityChecker.prototype.isFocusable = function (element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    };
    InteractivityChecker = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__platform_platform__["a" /* Platform */]])
    ], InteractivityChecker);
    return InteractivityChecker;
}());
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
    var nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/** Gets whether an element is an <input type="hidden">. */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
    return element.nodeName == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    var tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    var tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
    var nodeName = element.nodeName.toLowerCase();
    var inputType = nodeName === 'input' && element.type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
    return node.ownerDocument.defaultView || window;
}
//# sourceMappingURL=interactivity-checker.js.map

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* unused harmony export LIVE_ANNOUNCER_ELEMENT_TOKEN */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LiveAnnouncer; });
/* unused harmony export LIVE_ANNOUNCER_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LIVE_ANNOUNCER_PROVIDER; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var LIVE_ANNOUNCER_ELEMENT_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('liveAnnouncerElement');
var LiveAnnouncer = (function () {
    function LiveAnnouncer(elementToken) {
        // We inject the live element as `any` because the constructor signature cannot reference
        // browser globals (HTMLElement) on non-browser environments, since having a class decorator
        // causes TypeScript to preserve the constructor signature types.
        this._liveElement = elementToken || this._createLiveElement();
    }
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     */
    LiveAnnouncer.prototype.announce = function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
    };
    /** Removes the aria-live element from the DOM. */
    LiveAnnouncer.prototype._removeLiveElement = function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    LiveAnnouncer.prototype._createLiveElement = function () {
        var liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(LIVE_ANNOUNCER_ELEMENT_TOKEN)), 
        __metadata('design:paramtypes', [Object])
    ], LiveAnnouncer);
    return LiveAnnouncer;
}());
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement) {
    return parentDispatcher || new LiveAnnouncer(liveElement);
}
;
var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), LiveAnnouncer],
        [new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"](LIVE_ANNOUNCER_ELEMENT_TOKEN)]
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
//# sourceMappingURL=live-announcer.js.map

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdError; });
// TODO(kara): Revisit why error messages are not being properly set.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
var MdError = (function (_super) {
    __extends(MdError, _super);
    function MdError(value) {
        _super.call(this);
        this.message = value;
    }
    return MdError;
}(Error));
//# sourceMappingURL=error.js.map

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* unused harmony export ObserveContent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveContentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = (function () {
    function ObserveContent(_elementRef) {
        this._elementRef = _elementRef;
        /** Event emitted for each change in the element's content. */
        this.event = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ObserveContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._observer = new MutationObserver(function (mutations) { return mutations.forEach(function () { return _this.event.emit(); }); });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    };
    ObserveContent.prototype.ngOnDestroy = function () {
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('cdkObserveContent'), 
        __metadata('design:type', Object)
    ], ObserveContent.prototype, "event", void 0);
    ObserveContent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdkObserveContent]'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ObserveContent);
    return ObserveContent;
}());
var ObserveContentModule = (function () {
    function ObserveContentModule() {
    }
    /** @deprecated */
    ObserveContentModule.forRoot = function () {
        return {
            ngModule: ObserveContentModule,
            providers: []
        };
    };
    ObserveContentModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [ObserveContent],
            declarations: [ObserveContent]
        }), 
        __metadata('design:paramtypes', [])
    ], ObserveContentModule);
    return ObserveContentModule;
}());
//# sourceMappingURL=observe-content.js.map

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayContainer; });
/* unused harmony export OVERLAY_CONTAINER_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OVERLAY_CONTAINER_PROVIDER; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = (function () {
    function OverlayContainer() {
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    OverlayContainer.prototype.getContainerElement = function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    OverlayContainer.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        document.body.appendChild(container);
        this._containerElement = container;
    };
    OverlayContainer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], OverlayContainer);
    return OverlayContainer;
}());
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}
;
var OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};
//# sourceMappingURL=overlay-container.js.map

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayState; });
/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
var OverlayState = (function () {
    function OverlayState() {
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        /** Custom class to add to the backdrop **/
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /** The direction of the text in the overlay panel. */
        this.direction = 'ltr';
    }
    return OverlayState;
}());
//# sourceMappingURL=overlay-state.js.map

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConnectionPositionPair; });
/* unused harmony export ScrollableViewProperties */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectedOverlayPositionChange; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

/** The points of the origin element and the overlay element to connect. */
var ConnectionPositionPair = (function () {
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
var ScrollableViewProperties = (function () {
    function ScrollableViewProperties() {
    }
    return ScrollableViewProperties;
}());
/** The change event emitted by the strategy when a fallback position is used. */
var ConnectedOverlayPositionChange = (function () {
    function ConnectedOverlayPositionChange(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
    ConnectedOverlayPositionChange = __decorate([
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [ConnectionPositionPair, ScrollableViewProperties])
    ], ConnectedOverlayPositionChange);
    return ConnectedOverlayPositionChange;
}());
//# sourceMappingURL=connected-position.js.map

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__portal__ = __webpack_require__(234);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TemplatePortalDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PortalHostDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortalModule; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </template>
 */
var TemplatePortalDirective = (function (_super) {
    __extends(TemplatePortalDirective, _super);
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    TemplatePortalDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdk-portal], [portal]',
            exportAs: 'cdkPortal',
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], TemplatePortalDirective);
    return TemplatePortalDirective;
}(__WEBPACK_IMPORTED_MODULE_1__portal__["b" /* TemplatePortal */]));
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <template [cdkPortalHost]="greeting"></template>
 */
var PortalHostDirective = (function (_super) {
    __extends(PortalHostDirective, _super);
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        _super.call(this);
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    Object.defineProperty(PortalHostDirective.prototype, "_deprecatedPortal", {
        /** @deprecated */
        get: function () { return this.portal; },
        set: function (v) { this.portal = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        /** Portal associated with the Portal host. */
        get: function () {
            return this._portal;
        },
        set: function (p) {
            if (p) {
                this._replaceAttachedPortal(p);
            }
        },
        enumerable: true,
        configurable: true
    });
    PortalHostDirective.prototype.ngOnDestroy = function () {
        this.dispose();
    };
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal host.
     */
    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        var viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        this.setDisposeFn(function () { return ref.destroy(); });
        return ref;
    };
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     */
    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
        // TODO(jelbourn): return locals from view
        return new Map();
    };
    /** Detaches the currently attached Portal (if there is one) and attaches the given Portal. */
    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
        if (this.hasAttached()) {
            this.detach();
        }
        if (p) {
            this.attach(p);
            this._portal = p;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('portalHost'), 
        __metadata('design:type', Object)
    ], PortalHostDirective.prototype, "_deprecatedPortal", null);
    PortalHostDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdkPortalHost], [portalHost]',
            inputs: ['portal: cdkPortalHost']
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], PortalHostDirective);
    return PortalHostDirective;
}(__WEBPACK_IMPORTED_MODULE_1__portal__["c" /* BasePortalHost */]));
var PortalModule = (function () {
    function PortalModule() {
    }
    /** @deprecated */
    PortalModule.forRoot = function () {
        return {
            ngModule: PortalModule,
            providers: []
        };
    };
    PortalModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [TemplatePortalDirective, PortalHostDirective],
            declarations: [TemplatePortalDirective, PortalHostDirective],
        }), 
        __metadata('design:paramtypes', [])
    ], PortalModule);
    return PortalModule;
}());
//# sourceMappingURL=portal-directives.js.map

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_errors__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_trap__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_first__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_first__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialogContainer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Internal component that wraps user-provided dialog content.
 * @docs-private
 */
var MdDialogContainer = (function (_super) {
    __extends(MdDialogContainer, _super);
    function MdDialogContainer(_ngZone, _renderer) {
        _super.call(this);
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        /** Element that was focused before the dialog was opened. Save this to restore upon close. */
        this._elementFocusedBeforeDialogWasOpened = null;
    }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    MdDialogContainer.prototype.attachComponentPortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throw new __WEBPACK_IMPORTED_MODULE_2__dialog_errors__["a" /* MdDialogContentAlreadyAttachedError */]();
        }
        var attachResult = this._portalHost.attachComponentPortal(portal);
        this._trapFocus();
        return attachResult;
    };
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    MdDialogContainer.prototype.attachTemplatePortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throw new __WEBPACK_IMPORTED_MODULE_2__dialog_errors__["a" /* MdDialogContentAlreadyAttachedError */]();
        }
        var attachedResult = this._portalHost.attachTemplatePortal(portal);
        this._trapFocus();
        return attachedResult;
    };
    /**
     * Moves the focus inside the focus trap.
     * @private
     */
    MdDialogContainer.prototype._trapFocus = function () {
        var _this = this;
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            _this._elementFocusedBeforeDialogWasOpened = document.activeElement;
            _this._focusTrap.focusFirstTabbableElement();
        });
    };
    MdDialogContainer.prototype.ngOnDestroy = function () {
        var _this = this;
        // When the dialog is destroyed, return focus to the element that originally had it before
        // the dialog was opened. Wait for the DOM to finish settling before changing the focus so
        // that it doesn't end up back on the <body>. Also note that we need the extra check, because
        // IE can set the `activeElement` to null in some cases.
        if (this._elementFocusedBeforeDialogWasOpened) {
            this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
                _this._renderer.invokeElementMethod(_this._elementFocusedBeforeDialogWasOpened, 'focus');
            });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__core__["l" /* PortalHostDirective */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__core__["l" /* PortalHostDirective */])
    ], MdDialogContainer.prototype, "_portalHost", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_trap__["a" /* FocusTrap */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_trap__["a" /* FocusTrap */])
    ], MdDialogContainer.prototype, "_focusTrap", void 0);
    MdDialogContainer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-dialog-container, mat-dialog-container',
            template: "<cdk-focus-trap><template cdkPortalHost></template></cdk-focus-trap>",
            styles: [".mat-dialog-container{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;padding:24px;border-radius:2px;box-sizing:border-box;overflow:auto;max-width:80vw;width:100%;height:100%}@media screen and (-ms-high-contrast:active){.mat-dialog-container{outline:solid 1px}}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto}.mat-dialog-title{font-size:20px;font-weight:700;margin:0 0 20px;display:block}.mat-dialog-actions{padding:12px 0;display:flex}.mat-dialog-actions:last-child{margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}"],
            host: {
                '[class.mat-dialog-container]': 'true',
                '[attr.role]': 'dialogConfig?.role',
            },
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdDialogContainer);
    return MdDialogContainer;
}(__WEBPACK_IMPORTED_MODULE_1__core__["r" /* BasePortalHost */]));
//# sourceMappingURL=dialog-container.js.map

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdGridListColsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdGridTileTooWideError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdGridListBadRatioError; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Exception thrown when cols property is missing from grid-list
 * @docs-private
 */
var MdGridListColsError = (function (_super) {
    __extends(MdGridListColsError, _super);
    function MdGridListColsError() {
        _super.call(this, "md-grid-list: must pass in number of columns. Example: <md-grid-list cols=\"3\">");
    }
    return MdGridListColsError;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
/**
 * Exception thrown when a tile's colspan is longer than the number of cols in list
 * @docs-private
 */
var MdGridTileTooWideError = (function (_super) {
    __extends(MdGridTileTooWideError, _super);
    function MdGridTileTooWideError(cols, listLength) {
        _super.call(this, "md-grid-list: tile with colspan " + cols + " is wider than grid with cols=\"" + listLength + "\".");
    }
    return MdGridTileTooWideError;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
/**
 * Exception thrown when an invalid ratio is passed in as a rowHeight
 * @docs-private
 */
var MdGridListBadRatioError = (function (_super) {
    __extends(MdGridListBadRatioError, _super);
    function MdGridListBadRatioError(value) {
        _super.call(this, "md-grid-list: invalid ratio given for row-height: \"" + value + "\"");
    }
    return MdGridListBadRatioError;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
//# sourceMappingURL=grid-list-errors.js.map

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_platform_features__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_container_errors__ = __webpack_require__(303);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdPlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdHint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MdInputDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdInputContainer; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





// Invalid input type. Using one of these will throw an MdInputContainerUnsupportedTypeError.
var MD_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
var nextUniqueId = 0;
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
var MdPlaceholder = (function () {
    function MdPlaceholder() {
    }
    MdPlaceholder = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-placeholder, mat-placeholder'
        }), 
        __metadata('design:paramtypes', [])
    ], MdPlaceholder);
    return MdPlaceholder;
}());
/** The hint directive, used to tag content as hint labels (going under the input). */
var MdHint = (function () {
    function MdHint() {
        // Whether to align the hint label at the start or end of the line.
        this.align = 'start';
        // Unique ID for the hint. Used for the aria-describedby on the input.
        this.id = "md-input-hint-" + nextUniqueId++;
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdHint.prototype, "align", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdHint.prototype, "id", void 0);
    MdHint = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-hint, mat-hint',
            host: {
                '[class.mat-hint]': 'true',
                '[class.mat-right]': 'align == "end"',
                '[attr.id]': 'id',
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdHint);
    return MdHint;
}());
/** The input directive, used to mark the input that `MdInputContainer` is wrapping. */
var MdInputDirective = (function () {
    function MdInputDirective(_elementRef, _renderer, _ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngControl = _ngControl;
        /** Variables used as cache for getters and setters. */
        this._type = 'text';
        this._placeholder = '';
        this._disabled = false;
        this._required = false;
        /** Whether the element is focused or not. */
        this.focused = false;
        /**
         * Emits an event when the placeholder changes so that the `md-input-container` can re-validate.
         */
        this._placeholderChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(function (t) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_platform_features__["a" /* getSupportedInputTypes */])().has(t); });
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    Object.defineProperty(MdInputDirective.prototype, "disabled", {
        /** Whether the element is disabled. */
        get: function () {
            return this._ngControl ? this._ngControl.disabled : this._disabled;
        },
        set: function (value) {
            this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core__["n" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "id", {
        /** Unique id of the element. */
        get: function () { return this._id; },
        set: function (value) { this._id = value || this._uid; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdInputDirective.prototype, "placeholder", {
        /** Placeholder attribute of the element. */
        get: function () { return this._placeholder; },
        set: function (value) {
            if (this._placeholder !== value) {
                this._placeholder = value;
                this._placeholderChange.emit(this._placeholder);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "required", {
        /** Whether the element is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "type", {
        /** Input type of the element. */
        get: function () { return this._type; },
        set: function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (!this._isTextarea() && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_platform_features__["a" /* getSupportedInputTypes */])().has(this._type)) {
                this._renderer.setElementProperty(this._elementRef.nativeElement, 'type', this._type);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "value", {
        /** The input element's value. */
        get: function () { return this._elementRef.nativeElement.value; },
        set: function (value) { this._elementRef.nativeElement.value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "empty", {
        get: function () {
            return !this._isNeverEmpty() &&
                (this.value == null || this.value === '') &&
                // Check if the input contains bad input. If so, we know that it only appears empty because
                // the value failed to parse. From the user's perspective it is not empty.
                // TODO(mmalerba): Add e2e test for bad input case.
                !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "_uid", {
        get: function () { return this._cachedUid = this._cachedUid || "md-input-" + nextUniqueId++; },
        enumerable: true,
        configurable: true
    });
    /** Focuses the input element. */
    MdInputDirective.prototype.focus = function () { this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus'); };
    MdInputDirective.prototype._onFocus = function () { this.focused = true; };
    MdInputDirective.prototype._onBlur = function () { this.focused = false; };
    MdInputDirective.prototype._onInput = function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    /** Make sure the input is a supported type. */
    MdInputDirective.prototype._validateType = function () {
        if (MD_INPUT_INVALID_TYPES.indexOf(this._type) !== -1) {
            throw new __WEBPACK_IMPORTED_MODULE_4__input_container_errors__["a" /* MdInputContainerUnsupportedTypeError */](this._type);
        }
    };
    MdInputDirective.prototype._isNeverEmpty = function () { return this._neverEmptyInputTypes.indexOf(this._type) !== -1; };
    MdInputDirective.prototype._isBadInput = function () {
        return this._elementRef.nativeElement.validity.badInput;
    };
    /** Determines if the component host is a textarea. If not recognizable it returns false. */
    MdInputDirective.prototype._isTextarea = function () {
        var nativeElement = this._elementRef.nativeElement;
        return nativeElement ? nativeElement.nodeName.toLowerCase() === 'textarea' : false;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "id", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "placeholder", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "required", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "type", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "_placeholderChange", void 0);
    MdInputDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: "input[mdInput], textarea[mdInput], input[matInput], textarea[matInput]",
            host: {
                '[class.mat-input-element]': 'true',
                // Native input properties that are overwritten by Angular inputs need to be synced with
                // the native input element. Otherwise property bindings for those don't work.
                '[id]': 'id',
                '[placeholder]': 'placeholder',
                '[disabled]': 'disabled',
                '[required]': 'required',
                '[attr.aria-describedby]': 'ariaDescribedby',
                '(blur)': '_onBlur()',
                '(focus)': '_onFocus()',
                '(input)': '_onInput()',
            }
        }),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgControl"]])
    ], MdInputDirective);
    return MdInputDirective;
}());
/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
var MdInputContainer = (function () {
    function MdInputContainer() {
        /** Alignment of the input container's content. */
        this.align = 'start';
        /** Color of the input divider, based on the theme. */
        this.dividerColor = 'primary';
        this._hintLabel = '';
        // Unique id for the hint label.
        this._hintLabelId = "md-input-hint-" + nextUniqueId++;
        this._floatPlaceholder = 'auto';
    }
    Object.defineProperty(MdInputContainer.prototype, "_shouldAlwaysFloat", {
        /** Whether the floating label should always float or not. */
        get: function () { return this._floatPlaceholder === 'always'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdInputContainer.prototype, "_canPlaceholderFloat", {
        /** Whether the placeholder can float or not. */
        get: function () { return this._floatPlaceholder !== 'never'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "hintLabel", {
        /** Text for the input hint. */
        get: function () { return this._hintLabel; },
        set: function (value) {
            this._hintLabel = value;
            this._processHints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "floatPlaceholder", {
        /** Whether the placeholder should always float, never float or float as the user types. */
        get: function () { return this._floatPlaceholder; },
        set: function (value) {
            this._floatPlaceholder = value || 'auto';
        },
        enumerable: true,
        configurable: true
    });
    MdInputContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this._mdInputChild) {
            throw new __WEBPACK_IMPORTED_MODULE_4__input_container_errors__["b" /* MdInputContainerMissingMdInputError */]();
        }
        this._processHints();
        this._validatePlaceholders();
        // Re-validate when things change.
        this._hintChildren.changes.subscribe(function () { return _this._processHints(); });
        this._mdInputChild._placeholderChange.subscribe(function () { return _this._validatePlaceholders(); });
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    MdInputContainer.prototype._shouldForward = function (prop) {
        var control = this._mdInputChild ? this._mdInputChild._ngControl : null;
        return control && control[prop];
    };
    /** Whether the input has a placeholder. */
    MdInputContainer.prototype._hasPlaceholder = function () { return !!(this._mdInputChild.placeholder || this._placeholderChild); };
    /** Focuses the underlying input. */
    MdInputContainer.prototype._focusInput = function () { this._mdInputChild.focus(); };
    /**
     * Ensure that there is only one placeholder (either `input` attribute or child element with the
     * `md-placeholder` attribute.
     */
    MdInputContainer.prototype._validatePlaceholders = function () {
        if (this._mdInputChild.placeholder && this._placeholderChild) {
            throw new __WEBPACK_IMPORTED_MODULE_4__input_container_errors__["c" /* MdInputContainerPlaceholderConflictError */]();
        }
    };
    /**
     * Does any extra processing that is required when handling the hints.
     */
    MdInputContainer.prototype._processHints = function () {
        this._validateHints();
        this._syncAriaDescribedby();
    };
    /**
     * Ensure that there is a maximum of one of each `<md-hint>` alignment specified, with the
     * attribute being considered as `align="start"`.
     */
    MdInputContainer.prototype._validateHints = function () {
        var _this = this;
        if (this._hintChildren) {
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new __WEBPACK_IMPORTED_MODULE_4__input_container_errors__["d" /* MdInputContainerDuplicatedHintError */]('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new __WEBPACK_IMPORTED_MODULE_4__input_container_errors__["d" /* MdInputContainerDuplicatedHintError */]('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    /**
     * Sets the child input's `aria-describedby` to a space-separated list of the ids
     * of the currently-specified hints, as well as a generated id for the hint label.
     */
    MdInputContainer.prototype._syncAriaDescribedby = function () {
        var ids = [];
        var startHint = this._hintChildren ?
            this._hintChildren.find(function (hint) { return hint.align === 'start'; }) : null;
        var endHint = this._hintChildren ?
            this._hintChildren.find(function (hint) { return hint.align === 'end'; }) : null;
        if (startHint) {
            ids.push(startHint.id);
        }
        else if (this._hintLabel) {
            ids.push(this._hintLabelId);
        }
        if (endHint) {
            ids.push(endHint.id);
        }
        this._mdInputChild.ariaDescribedby = ids.join(' ');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "align", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "dividerColor", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "hintLabel", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "floatPlaceholder", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(MdInputDirective), 
        __metadata('design:type', MdInputDirective)
    ], MdInputContainer.prototype, "_mdInputChild", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(MdPlaceholder), 
        __metadata('design:type', MdPlaceholder)
    ], MdInputContainer.prototype, "_placeholderChild", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(MdHint), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdInputContainer.prototype, "_hintChildren", void 0);
    MdInputContainer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-input-container, mat-input-container',
            template: "<div class=\"mat-input-wrapper\"><div class=\"mat-input-table\"><div class=\"mat-input-prefix\"><ng-content select=\"[mdPrefix], [matPrefix], [md-prefix]\"></ng-content></div><div class=\"mat-input-infix\" [class.mat-end]=\"align == 'end'\"><ng-content selector=\"input, textarea\"></ng-content><span class=\"mat-input-placeholder-wrapper\"><label class=\"mat-input-placeholder\" [attr.for]=\"_mdInputChild.id\" [class.mat-empty]=\"_mdInputChild.empty && !_shouldAlwaysFloat\" [class.mat-focused]=\"_mdInputChild.focused\" [class.mat-float]=\"_canPlaceholderFloat\" [class.mat-accent]=\"dividerColor == 'accent'\" [class.mat-warn]=\"dividerColor == 'warn'\" *ngIf=\"_hasPlaceholder()\"><ng-content select=\"md-placeholder, mat-placeholder\"></ng-content>{{_mdInputChild.placeholder}} <span class=\"mat-placeholder-required\" *ngIf=\"_mdInputChild.required\">*</span></label></span></div><div class=\"mat-input-suffix\"><ng-content select=\"[mdSuffix], [matSuffix], [md-suffix]\"></ng-content></div></div><div class=\"mat-input-underline\" [class.mat-disabled]=\"_mdInputChild.disabled\"><span class=\"mat-input-ripple\" [class.mat-focused]=\"_mdInputChild.focused\" [class.mat-accent]=\"dividerColor == 'accent'\" [class.mat-warn]=\"dividerColor == 'warn'\"></span></div><div *ngIf=\"hintLabel != ''\" [attr.id]=\"_hintLabelId\" class=\"mat-hint\">{{hintLabel}}</div><ng-content select=\"md-hint, mat-hint\"></ng-content></div>",
            styles: [".mat-input-container{display:inline-block;position:relative;font-family:Roboto,\"Helvetica Neue\",sans-serif;line-height:normal;text-align:left}.mat-end .mat-input-element,[dir=rtl] .mat-input-container{text-align:right}.mat-input-wrapper{margin:1em 0;padding-bottom:6px}.mat-input-table{display:inline-table;flex-flow:column;vertical-align:bottom;width:100%}.mat-input-table>*{display:table-cell}.mat-input-infix{position:relative}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%}.mat-input-placeholder,.mat-input-placeholder-wrapper{padding-top:1em;pointer-events:none;position:absolute}[dir=rtl] .mat-end .mat-input-element{text-align:left}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element:-webkit-autofill+.mat-input-placeholder.mat-float{display:block;transform:translateY(-1.35em) scale(.75);width:133.33333%}.mat-input-element::placeholder{color:transparent}.mat-input-element::-moz-placeholder{color:transparent}.mat-input-element::-webkit-input-placeholder{color:transparent}.mat-input-element:-ms-input-placeholder{color:transparent}.mat-input-placeholder{left:0;top:0;font-size:100%;z-index:1;width:100%;display:none;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden;transform:translateY(0);transform-origin:bottom left;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1)}.mat-input-placeholder.mat-empty{display:block;cursor:text}.mat-input-placeholder.mat-float.mat-focused,.mat-input-placeholder.mat-float:not(.mat-empty){display:block;transform:translateY(-1.35em) scale(.75);width:133.33333%}[dir=rtl] .mat-input-placeholder{transform-origin:bottom right;left:auto;right:0}.mat-input-placeholder-wrapper{left:0;top:-1em;width:100%;overflow:hidden}.mat-input-placeholder-wrapper::after{content:'';display:inline-table}.mat-input-underline{position:absolute;height:1px;width:100%;margin-top:4px;border-top-width:1px;border-top-style:solid}.mat-input-underline.mat-disabled{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-top:0;background-position:0}.mat-input-underline .mat-input-ripple{position:absolute;height:2px;z-index:1;top:-1px;width:100%;transform-origin:top;opacity:0;transform:scaleY(0);transition:transform .4s cubic-bezier(.25,.8,.25,1),opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-input-underline .mat-input-ripple.mat-focused{opacity:1;transform:scaleY(1)}.mat-hint{display:block;position:absolute;font-size:75%;bottom:0}.mat-hint.mat-right{right:0}[dir=rtl] .mat-hint{right:0;left:auto}[dir=rtl] .mat-hint.mat-right{right:auto;left:0}.mat-input-prefix,.mat-input-suffix{width:.1px;white-space:nowrap}"],
            host: {
                '[class.mat-input-container]': 'true',
                // Remove align attribute to prevent it from interfering with layout.
                '[attr.align]': 'null',
                '[class.ng-untouched]': '_shouldForward("untouched")',
                '[class.ng-touched]': '_shouldForward("touched")',
                '[class.ng-pristine]': '_shouldForward("pristine")',
                '[class.ng-dirty]': '_shouldForward("dirty")',
                '[class.ng-valid]': '_shouldForward("valid")',
                '[class.ng-invalid]': '_shouldForward("invalid")',
                '[class.ng-pending]': '_shouldForward("pending")',
                '(click)': '_focusInput()',
            },
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputContainer);
    return MdInputContainer;
}());
//# sourceMappingURL=input-container.js.map

/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_errors__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_item__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_key_manager__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_animations__ = __webpack_require__(306);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdMenu; });
// TODO(kara): prevent-close functionality
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var MdMenu = (function () {
    function MdMenu(posX, posY) {
        /** Config object to be passed into the menu's ngClass */
        this._classList = {};
        /** Position of the menu in the X axis. */
        this.positionX = 'after';
        /** Position of the menu in the Y axis. */
        this.positionY = 'below';
        this.overlapTrigger = true;
        /** Event emitted when the menu is closed. */
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        if (posX) {
            this._setPositionX(posX);
        }
        if (posY) {
            this._setPositionY(posY);
        }
        this.setPositionClasses(this.positionX, this.positionY);
    }
    MdMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new __WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_key_manager__["a" /* FocusKeyManager */](this.items).withWrap();
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () {
            _this._emitCloseEvent();
        });
    };
    MdMenu.prototype.ngOnDestroy = function () {
        this._tabSubscription.unsubscribe();
    };
    Object.defineProperty(MdMenu.prototype, "classList", {
        /**
         * This method takes classes set on the host md-menu element and applies them on the
         * menu template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing menu from outside the component.
         * @param classes list of class names
         */
        set: function (classes) {
            this._classList = classes.split(' ').reduce(function (obj, className) {
                obj[className] = true;
                return obj;
            }, {});
            this.setPositionClasses(this.positionX, this.positionY);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focus the first item in the menu. This method is used by the menu trigger
     * to focus the first item when the menu is opened by the ENTER key.
     */
    MdMenu.prototype.focusFirstItem = function () {
        this._keyManager.setFirstItemActive();
    };
    /**
     * This emits a close event to which the trigger is subscribed. When emitted, the
     * trigger will close the menu.
     */
    MdMenu.prototype._emitCloseEvent = function () {
        this.close.emit();
    };
    MdMenu.prototype._setPositionX = function (pos) {
        if (pos !== 'before' && pos !== 'after') {
            throw new __WEBPACK_IMPORTED_MODULE_1__menu_errors__["a" /* MdMenuInvalidPositionX */]();
        }
        this.positionX = pos;
    };
    MdMenu.prototype._setPositionY = function (pos) {
        if (pos !== 'above' && pos !== 'below') {
            throw new __WEBPACK_IMPORTED_MODULE_1__menu_errors__["b" /* MdMenuInvalidPositionY */]();
        }
        this.positionY = pos;
    };
    /**
     * It's necessary to set position-based classes to ensure the menu panel animation
     * folds out from the correct direction.
     */
    MdMenu.prototype.setPositionClasses = function (posX, posY) {
        this._classList['mat-menu-before'] = posX == 'before';
        this._classList['mat-menu-after'] = posX == 'after';
        this._classList['mat-menu-above'] = posY == 'above';
        this._classList['mat-menu-below'] = posY == 'below';
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
    ], MdMenu.prototype, "templateRef", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_2__menu_item__["a" /* MdMenuItem */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdMenu.prototype, "items", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdMenu.prototype, "overlapTrigger", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('class'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], MdMenu.prototype, "classList", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdMenu.prototype, "close", void 0);
    MdMenu = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-menu, mat-menu',
            host: { 'role': 'menu' },
            template: "<template><div class=\"mat-menu-panel\" [ngClass]=\"_classList\" (keydown)=\"_keyManager.onKeydown($event)\" (click)=\"_emitCloseEvent()\" [@transformMenu]=\"'showing'\"><div class=\"mat-menu-content\" [@fadeInItems]=\"'showing'\"><ng-content></ng-content></div></div></template>",
            styles: [".mat-menu-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;max-height:calc(100vh + 48px)}.mat-menu-panel.mat-menu-after.mat-menu-below{transform-origin:left top}.mat-menu-panel.mat-menu-after.mat-menu-above{transform-origin:left bottom}.mat-menu-panel.mat-menu-before.mat-menu-below{transform-origin:right top}.mat-menu-panel.mat-menu-before.mat-menu-above{transform-origin:right bottom}[dir=rtl] .mat-menu-panel.mat-menu-after.mat-menu-below{transform-origin:right top}[dir=rtl] .mat-menu-panel.mat-menu-after.mat-menu-above{transform-origin:right bottom}[dir=rtl] .mat-menu-panel.mat-menu-before.mat-menu-below{transform-origin:left top}[dir=rtl] .mat-menu-panel.mat-menu-before.mat-menu-above{transform-origin:left bottom}@media screen and (-ms-high-contrast:active){.mat-menu-panel{outline:solid 1px}}.mat-menu-content{padding-top:8px;padding-bottom:8px}.mat-menu-item{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;font-size:16px;font-family:Roboto,\"Helvetica Neue\",sans-serif;text-align:start;text-decoration:none;position:relative}.mat-menu-item[disabled]{cursor:default}.mat-menu-item .mat-icon{margin-right:16px}[dir=rtl] .mat-menu-item .mat-icon{margin-left:16px}button.mat-menu-item{width:100%}.mat-menu-ripple{position:absolute;top:0;left:0;bottom:0;right:0}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            animations: [
                __WEBPACK_IMPORTED_MODULE_4__menu_animations__["a" /* transformMenu */],
                __WEBPACK_IMPORTED_MODULE_4__menu_animations__["b" /* fadeInItems */]
            ],
            exportAs: 'mdMenu'
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Attribute"])('x-position')),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Attribute"])('y-position')), 
        __metadata('design:paramtypes', [String, String])
    ], MdMenu);
    return MdMenu;
}());
//# sourceMappingURL=menu-directive.js.map

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_errors__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdMenuTrigger; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/**
 * This directive is intended to be used in conjunction with an md-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 * TODO(andrewseguin): Remove the kebab versions in favor of camelCased attribute selectors
 */
var MdMenuTrigger = (function () {
    function MdMenuTrigger(_overlay, _element, _viewContainerRef, _renderer, _dir) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._dir = _dir;
        this._menuOpen = false;
        // tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the menu is opened via the keyboard
        this._openedByMouse = false;
        /** Event emitted when the associated menu is opened. */
        this.onMenuOpen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the associated menu is closed. */
        this.onMenuClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(MdMenuTrigger.prototype, "_deprecatedMdMenuTriggerFor", {
        /** @deprecated */
        get: function () { return this.menu; },
        set: function (v) { this.menu = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdMenuTrigger.prototype, "_deprecatedMatMenuTriggerFor", {
        /** @deprecated */
        get: function () { return this.menu; },
        set: function (v) { this.menu = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdMenuTrigger.prototype, "_matMenuTriggerFor", {
        // Trigger input for compatibility mode
        get: function () { return this.menu; },
        set: function (v) { this.menu = v; },
        enumerable: true,
        configurable: true
    });
    MdMenuTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._checkMenu();
        this.menu.close.subscribe(function () { return _this.closeMenu(); });
    };
    MdMenuTrigger.prototype.ngOnDestroy = function () { this.destroyMenu(); };
    Object.defineProperty(MdMenuTrigger.prototype, "menuOpen", {
        /** Whether the menu is open. */
        get: function () { return this._menuOpen; },
        enumerable: true,
        configurable: true
    });
    /** Toggles the menu between the open and closed states. */
    MdMenuTrigger.prototype.toggleMenu = function () {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    };
    /** Opens the menu. */
    MdMenuTrigger.prototype.openMenu = function () {
        if (!this._menuOpen) {
            this._createOverlay();
            this._overlayRef.attach(this._portal);
            this._subscribeToBackdrop();
            this._initMenu();
        }
    };
    /** Closes the menu. */
    MdMenuTrigger.prototype.closeMenu = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
            this._resetMenu();
        }
    };
    /** Removes the menu from the DOM. */
    MdMenuTrigger.prototype.destroyMenu = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    /** Focuses the menu trigger. */
    MdMenuTrigger.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    Object.defineProperty(MdMenuTrigger.prototype, "dir", {
        /** The text direction of the containing app. */
        get: function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method ensures that the menu closes when the overlay backdrop is clicked.
     * We do not use first() here because doing so would not catch clicks from within
     * the menu, and it would fail to unsubscribe properly. Instead, we unsubscribe
     * explicitly when the menu is closed or destroyed.
     */
    MdMenuTrigger.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.closeMenu();
        });
    };
    /**
     * This method sets the menu state to open and focuses the first item if
     * the menu was opened via the keyboard.
     */
    MdMenuTrigger.prototype._initMenu = function () {
        this._setIsMenuOpen(true);
        // Should only set focus if opened via the keyboard, so keyboard users can
        // can easily navigate menu items. According to spec, mouse users should not
        // see the focus style.
        if (!this._openedByMouse) {
            this.menu.focusFirstItem();
        }
    };
    ;
    /**
     * This method resets the menu when it's closed, most importantly restoring
     * focus to the menu trigger if the menu was opened via the keyboard.
     */
    MdMenuTrigger.prototype._resetMenu = function () {
        this._setIsMenuOpen(false);
        // Focus only needs to be reset to the host element if the menu was opened
        // by the keyboard and manually shifted to the first menu item.
        if (!this._openedByMouse) {
            this.focus();
        }
        this._openedByMouse = false;
    };
    // set state rather than toggle to support triggers sharing a menu
    MdMenuTrigger.prototype._setIsMenuOpen = function (isOpen) {
        this._menuOpen = isOpen;
        this._menuOpen ? this.onMenuOpen.emit() : this.onMenuClose.emit();
    };
    /**
     *  This method checks that a valid instance of MdMenu has been passed into
     *  mdMenuTriggerFor. If not, an exception is thrown.
     */
    MdMenuTrigger.prototype._checkMenu = function () {
        if (!this.menu) {
            throw new __WEBPACK_IMPORTED_MODULE_1__menu_errors__["c" /* MdMenuMissingError */]();
        }
    };
    /**
     *  This method creates the overlay from the provided menu's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    MdMenuTrigger.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            this._portal = new __WEBPACK_IMPORTED_MODULE_2__core__["m" /* TemplatePortal */](this.menu.templateRef, this._viewContainerRef);
            var config = this._getOverlayConfig();
            this._subscribeToPositions(config.positionStrategy);
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    MdMenuTrigger.prototype._getOverlayConfig = function () {
        var overlayState = new __WEBPACK_IMPORTED_MODULE_2__core__["b" /* OverlayState */]();
        overlayState.positionStrategy = this._getPosition()
            .withDirection(this.dir);
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        overlayState.direction = this.dir;
        return overlayState;
    };
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the menu based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    MdMenuTrigger.prototype._subscribeToPositions = function (position) {
        var _this = this;
        this._positionSubscription = position.onPositionChange.subscribe(function (change) {
            var posX = change.connectionPair.originX === 'start' ? 'after' : 'before';
            var posY = change.connectionPair.originY === 'top' ? 'below' : 'above';
            if (!_this.menu.overlapTrigger) {
                posY = posY === 'below' ? 'above' : 'below';
            }
            _this.menu.setPositionClasses(posX, posY);
        });
    };
    /**
     * This method builds the position strategy for the overlay, so the menu is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    MdMenuTrigger.prototype._getPosition = function () {
        var _a = this.menu.positionX === 'before' ? ['end', 'start'] : ['start', 'end'], posX = _a[0], fallbackX = _a[1];
        var _b = this.menu.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], fallbackOverlayY = _b[1];
        var originY = overlayY;
        var fallbackOriginY = fallbackOverlayY;
        if (!this.menu.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        return this._overlay.position()
            .connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
            .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
            .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
            .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
    };
    MdMenuTrigger.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    MdMenuTrigger.prototype._handleMousedown = function (event) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["y" /* isFakeMousedownFromScreenReader */])(event)) {
            this._openedByMouse = true;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('md-menu-trigger-for'), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "_deprecatedMdMenuTriggerFor", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mat-menu-trigger-for'), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "_deprecatedMatMenuTriggerFor", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('matMenuTriggerFor'), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "_matMenuTriggerFor", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdMenuTriggerFor'), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "menu", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "onMenuOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "onMenuClose", void 0);
    MdMenuTrigger = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: "[md-menu-trigger-for], [mat-menu-trigger-for], \n             [mdMenuTriggerFor], [matMenuTriggerFor]",
            host: {
                'aria-haspopup': 'true',
                '(mousedown)': '_handleMousedown($event)',
                '(click)': 'toggleMenu()',
            },
            exportAs: 'mdMenuTrigger'
        }),
        __param(4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__core__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_2__core__["k" /* Dir */]])
    ], MdMenuTrigger);
    return MdMenuTrigger;
}());
//# sourceMappingURL=menu-trigger.js.map

/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* unused harmony export MdProgressSpinnerCssMatStyler */
/* unused harmony export MdProgressCircleCssMatStyler */
/* unused harmony export MdProgressSpinner */
/* unused harmony export MdSpinner */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdProgressSpinnerModule; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// TODO(josephperrott): Benchpress tests.
/** A single degree in radians. */
var DEGREE_IN_RADIANS = Math.PI / 180;
/** Duration of the indeterminate animation. */
var DURATION_INDETERMINATE = 667;
/** Duration of the indeterminate animation. */
var DURATION_DETERMINATE = 225;
/** Start animation value of the indeterminate animation */
var startIndeterminate = 3;
/** End animation value of the indeterminate animation */
var endIndeterminate = 80;
/* Maximum angle for the arc. The angle can't be exactly 360, because the arc becomes hidden. */
var MAX_ANGLE = 359.99 / 100;
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdProgressSpinnerCssMatStyler = (function () {
    function MdProgressSpinnerCssMatStyler() {
    }
    MdProgressSpinnerCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-progress-spinner, mat-progress-spinner',
            host: {
                '[class.mat-progress-spinner]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressSpinnerCssMatStyler);
    return MdProgressSpinnerCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdProgressCircleCssMatStyler = (function () {
    function MdProgressCircleCssMatStyler() {
    }
    MdProgressCircleCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-progress-circle, mat-progress-circle',
            host: {
                '[class.mat-progress-circle]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressCircleCssMatStyler);
    return MdProgressCircleCssMatStyler;
}());
/**
 * <md-progress-spinner> component.
 */
var MdProgressSpinner = (function () {
    function MdProgressSpinner(_ngZone, _elementRef, _renderer) {
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** The id of the last requested animation. */
        this._lastAnimationId = 0;
        this._mode = 'determinate';
        this._color = 'primary';
    }
    Object.defineProperty(MdProgressSpinner.prototype, "_ariaValueMin", {
        /**
         * Values for aria max and min are only defined as numbers when in a determinate mode.  We do this
         * because voiceover does not report the progress indicator as indeterminate if the aria min
         * and/or max value are number values.
         */
        get: function () {
            return this.mode == 'determinate' ? 0 : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "_ariaValueMax", {
        get: function () {
            return this.mode == 'determinate' ? 100 : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "interdeterminateInterval", {
        /** @docs-private */
        get: function () {
            return this._interdeterminateInterval;
        },
        /** @docs-private */
        set: function (interval) {
            clearInterval(this._interdeterminateInterval);
            this._interdeterminateInterval = interval;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clean up any animations that were running.
     */
    MdProgressSpinner.prototype.ngOnDestroy = function () {
        this._cleanupIndeterminateAnimation();
    };
    Object.defineProperty(MdProgressSpinner.prototype, "color", {
        /** The color of the progress-spinner. Can be primary, accent, or warn. */
        get: function () { return this._color; },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "value", {
        /** Value of the progress circle. It is bound to the host as the attribute aria-valuenow. */
        get: function () {
            if (this.mode == 'determinate') {
                return this._value;
            }
        },
        set: function (v) {
            if (v != null && this.mode == 'determinate') {
                var newValue = clamp(v);
                this._animateCircle((this.value || 0), newValue, linearEase, DURATION_DETERMINATE, 0);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "mode", {
        /**
         * Mode of the progress circle
         *
         * Input must be one of the values from ProgressMode, defaults to 'determinate'.
         * mode is bound to the host as the attribute host.
         */
        get: function () {
            return this._mode;
        },
        set: function (m) {
            if (m == 'indeterminate') {
                this._startIndeterminateAnimation();
            }
            else {
                this._cleanupIndeterminateAnimation();
            }
            this._mode = m;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Animates the circle from one percentage value to another.
     *
     * @param animateFrom The percentage of the circle filled starting the animation.
     * @param animateTo The percentage of the circle filled ending the animation.
     * @param ease The easing function to manage the pace of change in the animation.
     * @param duration The length of time to show the animation, in milliseconds.
     * @param rotation The starting angle of the circle fill, with 0° represented at the top center
     *    of the circle.
     */
    MdProgressSpinner.prototype._animateCircle = function (animateFrom, animateTo, ease, duration, rotation) {
        var _this = this;
        var id = ++this._lastAnimationId;
        var startTime = Date.now();
        var changeInValue = animateTo - animateFrom;
        // No need to animate it if the values are the same
        if (animateTo === animateFrom) {
            this._renderArc(animateTo, rotation);
        }
        else {
            var animation_1 = function () {
                var elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));
                _this._renderArc(ease(elapsedTime, animateFrom, changeInValue, duration), rotation);
                // Prevent overlapping animations by checking if a new animation has been called for and
                // if the animation has lasted longer than the animation duration.
                if (id === _this._lastAnimationId && elapsedTime < duration) {
                    requestAnimationFrame(animation_1);
                }
            };
            // Run the animation outside of Angular's zone, in order to avoid
            // hitting ZoneJS and change detection on each frame.
            this._ngZone.runOutsideAngular(animation_1);
        }
    };
    /**
     * Starts the indeterminate animation interval, if it is not already running.
     */
    MdProgressSpinner.prototype._startIndeterminateAnimation = function () {
        var _this = this;
        var rotationStartPoint = 0;
        var start = startIndeterminate;
        var end = endIndeterminate;
        var duration = DURATION_INDETERMINATE;
        var animate = function () {
            _this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
            // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
            rotationStartPoint = (rotationStartPoint + end) % 100;
            var temp = start;
            start = -end;
            end = -temp;
        };
        if (!this.interdeterminateInterval) {
            this._ngZone.runOutsideAngular(function () {
                _this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
                animate();
            });
        }
    };
    /**
     * Removes interval, ending the animation.
     */
    MdProgressSpinner.prototype._cleanupIndeterminateAnimation = function () {
        this.interdeterminateInterval = null;
    };
    /**
     * Renders the arc onto the SVG element. Proxies `getArc` while setting the proper
     * DOM attribute on the `<path>`.
     */
    MdProgressSpinner.prototype._renderArc = function (currentValue, rotation) {
        // Caches the path reference so it doesn't have to be looked up every time.
        var path = this._path = this._path || this._elementRef.nativeElement.querySelector('path');
        // Ensure that the path was found. This may not be the case if the
        // animation function fires too early.
        if (path) {
            path.setAttribute('d', getSvgArc(currentValue, rotation));
        }
    };
    /**
     * Updates the color of the progress-spinner by adding the new palette class to the element
     * and removing the old one.
     */
    MdProgressSpinner.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    /** Sets the given palette class on the component element. */
    MdProgressSpinner.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdProgressSpinner.prototype, "color", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.aria-valuenow'), 
        __metadata('design:type', Object)
    ], MdProgressSpinner.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.mode'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdProgressSpinner.prototype, "mode", null);
    MdProgressSpinner = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-progress-spinner, mat-progress-spinner, md-progress-circle, mat-progress-circle',
            host: {
                'role': 'progressbar',
                '[attr.aria-valuemin]': '_ariaValueMin',
                '[attr.aria-valuemax]': '_ariaValueMax'
            },
            template: "<svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"><path></path></svg>",
            styles: [":host{display:block;height:100px;width:100px;overflow:hidden}:host svg{height:100%;width:100%;transform-origin:center}:host path{fill:transparent;stroke-width:10px}:host[mode=indeterminate] svg{animation-duration:5.25s,2.887s;animation-name:mat-progress-spinner-sporadic-rotate,mat-progress-spinner-linear-rotate;animation-timing-function:cubic-bezier(.35,0,.25,1),linear;animation-iteration-count:infinite;transition:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-sporadic-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}"],
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdProgressSpinner);
    return MdProgressSpinner;
}());
/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-spinner> instance.
 */
var MdSpinner = (function (_super) {
    __extends(MdSpinner, _super);
    function MdSpinner(elementRef, ngZone, renderer) {
        _super.call(this, ngZone, elementRef, renderer);
        this.mode = 'indeterminate';
    }
    MdSpinner.prototype.ngOnDestroy = function () {
        // The `ngOnDestroy` from `MdProgressSpinner` should be called explicitly, because
        // in certain cases Angular won't call it (e.g. when using AoT and in unit tests).
        _super.prototype.ngOnDestroy.call(this);
    };
    MdSpinner = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-spinner, mat-spinner',
            host: {
                'role': 'progressbar',
                'mode': 'indeterminate',
                '[class.mat-spinner]': 'true',
            },
            template: "<svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"><path></path></svg>",
            styles: [":host{display:block;height:100px;width:100px;overflow:hidden}:host svg{height:100%;width:100%;transform-origin:center}:host path{fill:transparent;stroke-width:10px}:host[mode=indeterminate] svg{animation-duration:5.25s,2.887s;animation-name:mat-progress-spinner-sporadic-rotate,mat-progress-spinner-linear-rotate;animation-timing-function:cubic-bezier(.35,0,.25,1),linear;animation-iteration-count:infinite;transition:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-sporadic-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}"],
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdSpinner);
    return MdSpinner;
}(MdProgressSpinner));
/**
 * Module functions.
 */
/** Clamps a value to be between 0 and 100. */
function clamp(v) {
    return Math.max(0, Math.min(100, v));
}
/**
 * Converts Polar coordinates to Cartesian.
 */
function polarToCartesian(radius, pathRadius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
    return (radius + (pathRadius * Math.cos(angleInRadians))) +
        ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
}
/**
 * Easing function for linear animation.
 */
function linearEase(currentTime, startValue, changeInValue, duration) {
    return changeInValue * currentTime / duration + startValue;
}
/**
 * Easing function to match material design indeterminate animation.
 */
function materialEase(currentTime, startValue, changeInValue, duration) {
    var time = currentTime / duration;
    var timeCubed = Math.pow(time, 3);
    var timeQuad = Math.pow(time, 4);
    var timeQuint = Math.pow(time, 5);
    return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
}
/**
 * Determines the path value to define the arc.  Converting percentage values to to polar
 * coordinates on the circle, and then to cartesian coordinates in the viewport.
 *
 * @param currentValue The current percentage value of the progress circle, the percentage of the
 *    circle to fill.
 * @param rotation The starting point of the circle with 0 being the 0 degree point.
 * @return A string for an SVG path representing a circle filled from the starting point to the
 *    percentage value provided.
 */
function getSvgArc(currentValue, rotation) {
    var startPoint = rotation || 0;
    var radius = 50;
    var pathRadius = 40;
    var startAngle = startPoint * MAX_ANGLE;
    var endAngle = currentValue * MAX_ANGLE;
    var start = polarToCartesian(radius, pathRadius, startAngle);
    var end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    var arcSweep = endAngle < 0 ? 0 : 1;
    var largeArcFlag;
    if (endAngle < 0) {
        largeArcFlag = endAngle >= -180 ? 0 : 1;
    }
    else {
        largeArcFlag = endAngle <= 180 ? 0 : 1;
    }
    return "M" + start + "A" + pathRadius + "," + pathRadius + " 0 " + largeArcFlag + "," + arcSweep + " " + end;
}
var MdProgressSpinnerModule = (function () {
    function MdProgressSpinnerModule() {
    }
    /** @deprecated */
    MdProgressSpinnerModule.forRoot = function () {
        return {
            ngModule: MdProgressSpinnerModule,
            providers: []
        };
    };
    MdProgressSpinnerModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            exports: [
                MdProgressSpinner,
                MdSpinner,
                __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */],
                MdProgressSpinnerCssMatStyler,
                MdProgressCircleCssMatStyler
            ],
            declarations: [
                MdProgressSpinner,
                MdSpinner,
                MdProgressSpinnerCssMatStyler,
                MdProgressCircleCssMatStyler
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressSpinnerModule);
    return MdProgressSpinnerModule;
}());
//# sourceMappingURL=progress-spinner.js.map

/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimpleSnackBar; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
var SimpleSnackBar = (function () {
    function SimpleSnackBar() {
    }
    /** Dismisses the snack bar. */
    SimpleSnackBar.prototype.dismiss = function () {
        this.snackBarRef._action();
    };
    Object.defineProperty(SimpleSnackBar.prototype, "hasAction", {
        /** If the action button should be shown. */
        get: function () { return !!this.action; },
        enumerable: true,
        configurable: true
    });
    SimpleSnackBar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'simple-snack-bar',
            template: "<span class=\"mat-simple-snackbar-message\">{{message}}</span> <button class=\"mat-simple-snackbar-action\" *ngIf=\"hasAction\" (click)=\"dismiss()\">{{action}}</button>",
            styles: [":host{display:flex;justify-content:space-between;color:#fff;line-height:20px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar-message{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}.mat-simple-snackbar-action{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;background:0 0;margin:-5px 0 0;padding:5px;text-transform:uppercase;color:inherit;line-height:inherit;flex-shrink:0;font-family:inherit;font-size:inherit;font-weight:600}"],
            host: {
                '[class.mat-simple-snackbar]': 'true',
            }
        }), 
        __metadata('design:paramtypes', [])
    ], SimpleSnackBar);
    return SimpleSnackBar;
}());
//# sourceMappingURL=simple-snack-bar.js.map

/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snack_bar_errors__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* unused harmony export SHOW_ANIMATION */
/* unused harmony export HIDE_ANIMATION */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSnackBarContainer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// TODO(jelbourn): we can't use constants from animation.ts here because you can't use
// a text interpolation in anything that is analyzed statically with ngc (for AoT compile).
var SHOW_ANIMATION = '225ms cubic-bezier(0.4,0.0,1,1)';
var HIDE_ANIMATION = '195ms cubic-bezier(0.0,0.0,0.2,1)';
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
var MdSnackBarContainer = (function (_super) {
    __extends(MdSnackBarContainer, _super);
    function MdSnackBarContainer(_ngZone, _renderer, _elementRef) {
        _super.call(this);
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Subject for notifying that the snack bar has exited from view. */
        this.onExit = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        /** Subject for notifying that the snack bar has finished entering the view. */
        this.onEnter = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        /** The state of the snack bar animations. */
        this.animationState = 'initial';
    }
    /** Attach a component portal as content to this snack bar container. */
    MdSnackBarContainer.prototype.attachComponentPortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throw new __WEBPACK_IMPORTED_MODULE_2__snack_bar_errors__["a" /* MdSnackBarContentAlreadyAttached */]();
        }
        if (this.snackBarConfig.extraClasses) {
            // Not the most efficient way of adding classes, but the renderer doesn't allow us
            // to pass in an array or a space-separated list.
            for (var _i = 0, _a = this.snackBarConfig.extraClasses; _i < _a.length; _i++) {
                var cssClass = _a[_i];
                this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, true);
            }
        }
        return this._portalHost.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this snack bar container. */
    MdSnackBarContainer.prototype.attachTemplatePortal = function (portal) {
        throw Error('Not yet implemented');
    };
    /** Handle end of animations, updating the state of the snackbar. */
    MdSnackBarContainer.prototype.onAnimationEnd = function (event) {
        var _this = this;
        if (event.toState === 'void' || event.toState === 'complete') {
            this._completeExit();
        }
        if (event.toState === 'visible') {
            this._ngZone.run(function () {
                _this.onEnter.next();
                _this.onEnter.complete();
            });
        }
    };
    /** Begin animation of snack bar entrance into view. */
    MdSnackBarContainer.prototype.enter = function () {
        this.animationState = 'visible';
    };
    /** Returns an observable resolving when the enter animation completes.  */
    MdSnackBarContainer.prototype._onEnter = function () {
        this.animationState = 'visible';
        return this.onEnter.asObservable();
    };
    /** Begin animation of the snack bar exiting from view. */
    MdSnackBarContainer.prototype.exit = function () {
        this.animationState = 'complete';
        return this._onExit();
    };
    /** Returns an observable that completes after the closing animation is done. */
    MdSnackBarContainer.prototype._onExit = function () {
        return this.onExit.asObservable();
    };
    /**
     * Makes sure the exit callbacks have been invoked when the element is destroyed.
     */
    MdSnackBarContainer.prototype.ngOnDestroy = function () {
        this._completeExit();
    };
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    MdSnackBarContainer.prototype._completeExit = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            _this.onExit.next();
            _this.onExit.complete();
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__core__["l" /* PortalHostDirective */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__core__["l" /* PortalHostDirective */])
    ], MdSnackBarContainer.prototype, "_portalHost", void 0);
    MdSnackBarContainer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'snack-bar-container',
            template: "<template cdkPortalHost></template>",
            styles: [":host{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);background:#323232;border-radius:2px;box-sizing:content-box;display:block;height:20px;max-width:568px;min-width:288px;overflow:hidden;padding:14px 24px;transform:translateY(100%)}@media screen and (-ms-high-contrast:active){:host{border:1px solid}}"],
            host: {
                'role': 'alert',
                '[@state]': 'animationState',
                '(@state.done)': 'onAnimationEnd($event)'
            },
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('state', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('initial', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateY(100%)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateY(0%)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('complete', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateY(100%)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('visible => complete', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])(HIDE_ANIMATION)),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => visible, void => visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])(SHOW_ANIMATION)),
                ])
            ],
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdSnackBarContainer);
    return MdSnackBarContainer;
}(__WEBPACK_IMPORTED_MODULE_1__core__["r" /* BasePortalHost */]));
//# sourceMappingURL=snack-bar-container.js.map

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTabLabelWrapper; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/** Used in the `md-tab-group` view to display tab labels */
var MdTabLabelWrapper = (function () {
    function MdTabLabelWrapper(elementRef, _renderer) {
        this.elementRef = elementRef;
        this._renderer = _renderer;
        /** Whether the tab label is disabled.  */
        this._disabled = false;
    }
    Object.defineProperty(MdTabLabelWrapper.prototype, "disabled", {
        /** Whether the element is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    /** Sets focus on the wrapper element */
    MdTabLabelWrapper.prototype.focus = function () {
        this._renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus');
    };
    MdTabLabelWrapper.prototype.getOffsetLeft = function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    MdTabLabelWrapper.prototype.getOffsetWidth = function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdTabLabelWrapper.prototype, "disabled", null);
    MdTabLabelWrapper = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-tab-label-wrapper], [mat-tab-label-wrapper]',
            host: {
                '[class.mat-tab-disabled]': 'disabled'
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdTabLabelWrapper);
    return MdTabLabelWrapper;
}());
//# sourceMappingURL=tab-label-wrapper.js.map

/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTabLabel; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/** Used to flag tab labels for use with the portal directive */
var MdTabLabel = (function (_super) {
    __extends(MdTabLabel, _super);
    function MdTabLabel(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    MdTabLabel = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-tab-label], [mat-tab-label]',
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], MdTabLabel);
    return MdTabLabel;
}(__WEBPACK_IMPORTED_MODULE_1__core__["g" /* TemplatePortalDirective */]));
//# sourceMappingURL=tab-label.js.map

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(463);

/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__autocomplete__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_a11y_activedescendant_key_manager__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_rtl_dir__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_merge__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_startWith__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__input_input_container__ = __webpack_require__(259);
/* unused harmony export AUTOCOMPLETE_OPTION_HEIGHT */
/* unused harmony export AUTOCOMPLETE_PANEL_HEIGHT */
/* unused harmony export MD_AUTOCOMPLETE_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdAutocompleteTrigger; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
var AUTOCOMPLETE_OPTION_HEIGHT = 48;
/** The total height of the autocomplete panel. */
var AUTOCOMPLETE_PANEL_HEIGHT = 256;
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
var MD_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdAutocompleteTrigger; }),
    multi: true
};
var MdAutocompleteTrigger = (function () {
    function MdAutocompleteTrigger(_element, _overlay, _viewContainerRef, _dir, _zone, _inputContainer) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._dir = _dir;
        this._zone = _zone;
        this._inputContainer = _inputContainer;
        this._panelOpen = false;
        /** Stream of blur events that should close the panel. */
        this._blurStream = new __WEBPACK_IMPORTED_MODULE_8_rxjs_Subject__["Subject"]();
        /** View -> model callback called when value changes */
        this._onChange = function (value) { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = function () { };
    }
    Object.defineProperty(MdAutocompleteTrigger.prototype, "_matAutocomplete", {
        /** Property with mat- prefix for no-conflict mode. */
        get: function () {
            return this.autocomplete;
        },
        set: function (autocomplete) {
            this.autocomplete = autocomplete;
        },
        enumerable: true,
        configurable: true
    });
    MdAutocompleteTrigger.prototype.ngAfterContentInit = function () {
        this._keyManager = new __WEBPACK_IMPORTED_MODULE_5__core_a11y_activedescendant_key_manager__["a" /* ActiveDescendantKeyManager */](this.autocomplete.options).withWrap();
    };
    MdAutocompleteTrigger.prototype.ngOnDestroy = function () {
        if (this._panelPositionSubscription) {
            this._panelPositionSubscription.unsubscribe();
        }
        this._destroyPanel();
    };
    Object.defineProperty(MdAutocompleteTrigger.prototype, "panelOpen", {
        /* Whether or not the autocomplete panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Opens the autocomplete suggestion panel. */
    MdAutocompleteTrigger.prototype.openPanel = function () {
        if (!this._overlayRef) {
            this._createOverlay();
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._subscribeToClosingActions();
        }
        this._panelOpen = true;
        this._floatPlaceholder('always');
    };
    /** Closes the autocomplete suggestion panel. */
    MdAutocompleteTrigger.prototype.closePanel = function () {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._panelOpen = false;
        this._floatPlaceholder('auto');
    };
    Object.defineProperty(MdAutocompleteTrigger.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         */
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"], this.optionSelections.concat([this._blurStream.asObservable(), this._keyManager.tabOut]));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAutocompleteTrigger.prototype, "optionSelections", {
        /** Stream of autocomplete option selections. */
        get: function () {
            return this.autocomplete.options.map(function (option) { return option.onSelect; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAutocompleteTrigger.prototype, "activeOption", {
        /** The currently active option, coerced to MdOption type. */
        get: function () {
            return this._keyManager.activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    MdAutocompleteTrigger.prototype.writeValue = function (value) {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._setTriggerValue(value); });
    };
    /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    MdAutocompleteTrigger.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    MdAutocompleteTrigger.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    MdAutocompleteTrigger.prototype._handleKeydown = function (event) {
        if (this.activeOption && event.keyCode === __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["a" /* ENTER */]) {
            this.activeOption._selectViaInteraction();
        }
        else {
            this._keyManager.onKeydown(event);
            if (event.keyCode === __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["i" /* UP_ARROW */] || event.keyCode === __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["j" /* DOWN_ARROW */]) {
                this.openPanel();
                this._scrollToOption();
            }
        }
    };
    MdAutocompleteTrigger.prototype._handleInput = function (value) {
        this._onChange(value);
        this.openPanel();
    };
    MdAutocompleteTrigger.prototype._handleBlur = function (newlyFocusedTag) {
        this._onTouched();
        // Only emit blur event if the new focus is *not* on an option.
        if (newlyFocusedTag !== 'MD-OPTION') {
            this._blurStream.next(null);
        }
    };
    /**
     * In "auto" mode, the placeholder will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the placeholder until the panel can be closed.
     */
    MdAutocompleteTrigger.prototype._floatPlaceholder = function (state) {
        if (this._inputContainer) {
            this._inputContainer.floatPlaceholder = state;
        }
    };
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. The new scrollTop will be that offset - the panel height + the option
     * height, so the active option will be just visible at the bottom of the panel.
     */
    MdAutocompleteTrigger.prototype._scrollToOption = function () {
        var optionOffset = this._keyManager.activeItemIndex * AUTOCOMPLETE_OPTION_HEIGHT;
        var newScrollTop = Math.max(0, optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT);
        this.autocomplete._setScrollTop(newScrollTop);
    };
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    MdAutocompleteTrigger.prototype._subscribeToClosingActions = function () {
        var _this = this;
        // When the zone is stable initially, and when the option list changes...
        __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].merge(this._zone.onStable.first(), this.autocomplete.options.changes)
            .switchMap(function () {
            _this._resetPanel();
            return _this.panelClosingActions;
        })
            .first()
            .subscribe(function (event) { return _this._setValueAndClose(event); });
    };
    /** Destroys the autocomplete suggestion panel. */
    MdAutocompleteTrigger.prototype._destroyPanel = function () {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    MdAutocompleteTrigger.prototype._setTriggerValue = function (value) {
        this._element.nativeElement.value =
            this.autocomplete.displayWith ? this.autocomplete.displayWith(value) : value;
    };
    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    MdAutocompleteTrigger.prototype._setValueAndClose = function (event) {
        if (event) {
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
        }
        this.closePanel();
    };
    MdAutocompleteTrigger.prototype._createOverlay = function () {
        this._portal = new __WEBPACK_IMPORTED_MODULE_2__core__["m" /* TemplatePortal */](this.autocomplete.template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    };
    MdAutocompleteTrigger.prototype._getOverlayConfig = function () {
        var overlayState = new __WEBPACK_IMPORTED_MODULE_2__core__["b" /* OverlayState */]();
        overlayState.positionStrategy = this._getOverlayPosition();
        overlayState.width = this._getHostWidth();
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        return overlayState;
    };
    MdAutocompleteTrigger.prototype._getOverlayPosition = function () {
        this._positionStrategy = this._overlay.position().connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        this._subscribeToPositionChanges(this._positionStrategy);
        return this._positionStrategy;
    };
    /**
     * This method subscribes to position changes in the autocomplete panel, so the panel's
     * y-offset can be adjusted to match the new position.
     */
    MdAutocompleteTrigger.prototype._subscribeToPositionChanges = function (strategy) {
        var _this = this;
        this._panelPositionSubscription = strategy.onPositionChange.subscribe(function (change) {
            _this.autocomplete.positionY = change.connectionPair.originY === 'top' ? 'above' : 'below';
        });
    };
    /** Returns the width of the input element, so the panel width can match it. */
    MdAutocompleteTrigger.prototype._getHostWidth = function () {
        return this._element.nativeElement.getBoundingClientRect().width;
    };
    /** Reset active item to null so arrow events will activate the correct options.*/
    MdAutocompleteTrigger.prototype._resetActiveItem = function () {
        this._keyManager.setActiveItem(null);
    };
    /**
     * Resets the active item and re-calculates alignment of the panel in case its size
     * has changed due to fewer or greater number of options.
     */
    MdAutocompleteTrigger.prototype._resetPanel = function () {
        this._resetActiveItem();
        this._positionStrategy.recalculateLastPosition();
        this.autocomplete._setVisibility();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdAutocomplete'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_3__autocomplete__["a" /* MdAutocomplete */])
    ], MdAutocompleteTrigger.prototype, "autocomplete", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('matAutocomplete'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_3__autocomplete__["a" /* MdAutocomplete */])
    ], MdAutocompleteTrigger.prototype, "_matAutocomplete", null);
    MdAutocompleteTrigger = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'input[mdAutocomplete], input[matAutocomplete]',
            host: {
                'role': 'combobox',
                'autocomplete': 'off',
                'aria-autocomplete': 'list',
                'aria-multiline': 'false',
                '[attr.aria-activedescendant]': 'activeOption?.id',
                '[attr.aria-expanded]': 'panelOpen.toString()',
                '[attr.aria-owns]': 'autocomplete?.id',
                '(focus)': 'openPanel()',
                '(blur)': '_handleBlur($event.relatedTarget?.tagName)',
                '(input)': '_handleInput($event.target.value)',
                '(keydown)': '_handleKeydown($event)',
            },
            providers: [MD_AUTOCOMPLETE_VALUE_ACCESSOR]
        }),
        __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__core__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_7__core_rtl_dir__["a" /* Dir */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_12__input_input_container__["b" /* MdInputContainer */]])
    ], MdAutocompleteTrigger);
    return MdAutocompleteTrigger;
}());
//# sourceMappingURL=autocomplete-trigger.js.map

/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__autocomplete__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autocomplete_trigger__ = __webpack_require__(268);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdAutocompleteModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MdAutocompleteModule = (function () {
    function MdAutocompleteModule() {
    }
    /** @deprecated */
    MdAutocompleteModule.forRoot = function () {
        return {
            ngModule: MdAutocompleteModule,
            providers: [__WEBPACK_IMPORTED_MODULE_1__core__["D" /* OVERLAY_PROVIDERS */]]
        };
    };
    MdAutocompleteModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["E" /* MdOptionModule */], __WEBPACK_IMPORTED_MODULE_1__core__["d" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__autocomplete__["a" /* MdAutocomplete */], __WEBPACK_IMPORTED_MODULE_1__core__["E" /* MdOptionModule */], __WEBPACK_IMPORTED_MODULE_4__autocomplete_trigger__["a" /* MdAutocompleteTrigger */], __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__autocomplete__["a" /* MdAutocomplete */], __WEBPACK_IMPORTED_MODULE_4__autocomplete_trigger__["a" /* MdAutocompleteTrigger */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdAutocompleteModule);
    return MdAutocompleteModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_toggle__ = __webpack_require__(341);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__button_toggle__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button__ = __webpack_require__(342);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__button__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card__ = __webpack_require__(343);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__card__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox__ = __webpack_require__(344);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__checkbox__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdChip; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Material design styled Chip component. Used inside the MdChipList component.
 */
var MdChip = (function () {
    function MdChip(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Whether or not the chip is disabled. Disabled chips cannot be focused. */
        this._disabled = null;
        /** Whether or not the chip is selected. */
        this._selected = false;
        /** The palette color of selected chips. */
        this._color = 'primary';
        /** Emitted when the chip is focused. */
        this.onFocus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Emitted when the chip is selected. */
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Emitted when the chip is deselected. */
        this.deselect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Emitted when the chip is destroyed. */
        this.destroy = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    MdChip.prototype.ngOnInit = function () {
        this._addDefaultCSSClass();
        this._updateColor(this._color);
    };
    MdChip.prototype.ngOnDestroy = function () {
        this.destroy.emit({ chip: this });
    };
    Object.defineProperty(MdChip.prototype, "disabled", {
        /** Whether or not the chip is disabled. */
        get: function () {
            return this._disabled;
        },
        /** Sets the disabled state of the chip. */
        set: function (value) {
            this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdChip.prototype, "_isAriaDisabled", {
        /** A String representation of the current disabled state. */
        get: function () {
            return String(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(this.disabled));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdChip.prototype, "selected", {
        /** Whether or not this chip is selected. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value);
            if (this._selected) {
                this.select.emit({ chip: this });
            }
            else {
                this.deselect.emit({ chip: this });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggles the current selected state of this chip.
     * @return Whether the chip is selected.
     */
    MdChip.prototype.toggleSelected = function () {
        this.selected = !this.selected;
        return this.selected;
    };
    Object.defineProperty(MdChip.prototype, "color", {
        /** The color of the chip. Can be `primary`, `accent`, or `warn`. */
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Allows for programmatic focusing of the chip. */
    MdChip.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus');
        this.onFocus.emit({ chip: this });
    };
    /** Ensures events fire properly upon click. */
    MdChip.prototype._handleClick = function (event) {
        // Check disabled
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.focus();
        }
    };
    /** Initializes the appropriate CSS classes based on the chip type (basic or standard). */
    MdChip.prototype._addDefaultCSSClass = function () {
        var el = this._elementRef.nativeElement;
        // Always add the `mat-chip` class
        el.classList.add('mat-chip');
        // If we are a basic chip, also add the `mat-basic-chip` class for :not() targeting
        if (el.nodeName.toLowerCase() == 'mat-basic-chip' || el.hasAttribute('mat-basic-chip') ||
            el.nodeName.toLowerCase() == 'md-basic-chip' || el.hasAttribute('md-basic-chip')) {
            el.classList.add('mat-basic-chip');
        }
    };
    /** Updates the private _color variable and the native element. */
    MdChip.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    /** Sets the mat-color on the native element. */
    MdChip.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "select", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "deselect", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "destroy", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdChip.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdChip.prototype, "selected", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdChip.prototype, "color", null);
    MdChip = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "md-basic-chip, [md-basic-chip], md-chip, [md-chip],\n             mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]",
            template: "<ng-content></ng-content>",
            host: {
                '[class.mat-chip]': 'true',
                'tabindex': '-1',
                'role': 'option',
                '[class.mat-chip-selected]': 'selected',
                '[attr.disabled]': 'disabled',
                '[attr.aria-disabled]': '_isAriaDisabled',
                '(click)': '_handleClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdChip);
    return MdChip;
}());
//# sourceMappingURL=chip.js.map

/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chip_list__ = __webpack_require__(345);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chip_list__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chip__ = __webpack_require__(274);
/* unused harmony namespace reexport */


//# sourceMappingURL=index.js.map

/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListKeyManager; });


/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
var ListKeyManager = (function () {
    function ListKeyManager(_items) {
        this._items = _items;
        this._tabOut = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @returns The ListKeyManager that the method was called on.
     */
    ListKeyManager.prototype.withWrap = function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param index The index of the item to be set as active.
     */
    ListKeyManager.prototype.setActiveItem = function (index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    ListKeyManager.prototype.onKeydown = function (event) {
        switch (event.keyCode) {
            case __WEBPACK_IMPORTED_MODULE_0__core__["v" /* DOWN_ARROW */]:
                this.setNextItemActive();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__core__["w" /* UP_ARROW */]:
                this.setPreviousItemActive();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__core__["x" /* HOME */]:
                this.setFirstItemActive();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__core__["y" /* END */]:
                this.setLastItemActive();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__core__["z" /* TAB */]:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    };
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        /** Returns the index of the currently active item. */
        get: function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        /** Returns the currently active item. */
        get: function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the active item to the first enabled item in the list. */
    ListKeyManager.prototype.setFirstItemActive = function () {
        this._setActiveItemByIndex(0, 1);
    };
    /** Sets the active item to the last enabled item in the list. */
    ListKeyManager.prototype.setLastItemActive = function () {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    };
    /** Sets the active item to the next enabled item in the list. */
    ListKeyManager.prototype.setNextItemActive = function () {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    };
    /** Sets the active item to a previous enabled item in the list. */
    ListKeyManager.prototype.setPreviousItemActive = function () {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    };
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param index The new activeItemIndex.
     */
    ListKeyManager.prototype.updateActiveItemIndex = function (index) {
        this._activeItemIndex = index;
    };
    Object.defineProperty(ListKeyManager.prototype, "tabOut", {
        /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        get: function () {
            return this._tabOut.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    ListKeyManager.prototype._setActiveItemByDelta = function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    ListKeyManager.prototype._setActiveInWrapMode = function (delta, items) {
        // when active item would leave menu, wrap to beginning or end
        this._activeItemIndex =
            (this._activeItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an enabled one is reached
        if (items[this._activeItemIndex].disabled) {
            this._setActiveInWrapMode(delta, items);
        }
        else {
            this.setActiveItem(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    ListKeyManager.prototype._setActiveInDefaultMode = function (delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    ListKeyManager.prototype._setActiveItemByIndex = function (index, fallbackDelta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    };
    return ListKeyManager;
}());
//# sourceMappingURL=list-key-manager.js.map

/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UniqueSelectionDispatcher; });
/* unused harmony export UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UNIQUE_SELECTION_DISPATCHER_PROVIDER; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var UniqueSelectionDispatcher = (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    UniqueSelectionDispatcher.prototype.notify = function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /** Listen for future changes to item selection. */
    UniqueSelectionDispatcher.prototype.listen = function (listener) {
        this._listeners.push(listener);
    };
    UniqueSelectionDispatcher = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], UniqueSelectionDispatcher);
    return UniqueSelectionDispatcher;
}());
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
var UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};
//# sourceMappingURL=unique-selection-dispatcher.js.map

/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_line__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rtl_dir__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observe_content_observe_content__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__option_option__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ripple_ripple__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__portal_portal_directives__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__overlay_overlay_directives__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__a11y_index__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__selection_index__ = __webpack_require__(286);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_2__rtl_dir__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_2__rtl_dir__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return __WEBPACK_IMPORTED_MODULE_3__observe_content_observe_content__["a"]; });
/* unused harmony reexport ObserveContent */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_4__option_option__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_4__option_option__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__portal_portal__ = __webpack_require__(234);
/* unused harmony reexport Portal */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_10__portal_portal__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_10__portal_portal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_10__portal_portal__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_6__portal_portal_directives__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__portal_portal_directives__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_6__portal_portal_directives__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__portal_dom_portal_host__ = __webpack_require__(285);
/* unused harmony reexport DomPortalHost */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__projection_projection__ = __webpack_require__(356);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __WEBPACK_IMPORTED_MODULE_12__projection_projection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__platform_index__ = __webpack_require__(240);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__platform_platform__ = __webpack_require__(241);
/* unused harmony reexport MdPlatform */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__overlay_overlay__ = __webpack_require__(282);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_15__overlay_overlay__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_15__overlay_overlay__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__overlay_overlay_container__ = __webpack_require__(253);
/* unused harmony reexport OverlayContainer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__overlay_fullscreen_overlay_container__ = __webpack_require__(351);
/* unused harmony reexport FullscreenOverlayContainer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__overlay_overlay_ref__ = __webpack_require__(281);
/* unused harmony reexport OverlayRef */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__overlay_overlay_state__ = __webpack_require__(254);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_19__overlay_overlay_state__["a"]; });
/* unused harmony reexport ConnectedOverlayDirective */
/* unused harmony reexport OverlayOrigin */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__overlay_overlay_directives__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__overlay_position_connected_position_strategy__ = __webpack_require__(283);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__overlay_position_connected_position__ = __webpack_require__(255);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__overlay_scroll_scroll_dispatcher__ = __webpack_require__(232);
/* unused harmony reexport ScrollDispatcher */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__gestures_gesture_config__ = __webpack_require__(350);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_23__gestures_gesture_config__["a"]; });
/* unused harmony reexport MdRipple */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_5__ripple_ripple__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__a11y_live_announcer__ = __webpack_require__(250);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_24__a11y_live_announcer__["b"]; });
/* unused harmony reexport LIVE_ANNOUNCER_ELEMENT_TOKEN */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_24__a11y_live_announcer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__selection_selection__ = __webpack_require__(358);
/* unused harmony namespace reexport */
/* unused harmony reexport MdLiveAnnouncer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__a11y_focus_trap__ = __webpack_require__(237);
/* unused harmony reexport FocusTrap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__a11y_interactivity_checker__ = __webpack_require__(249);
/* unused harmony reexport InteractivityChecker */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__a11y_fake_mousedown__ = __webpack_require__(347);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_28__a11y_fake_mousedown__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_8__a11y_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__coordination_unique_selection_dispatcher__ = __webpack_require__(277);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_29__coordination_unique_selection_dispatcher__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_29__coordination_unique_selection_dispatcher__["b"]; });
/* unused harmony reexport MdUniqueSelectionDispatcher */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_1__line_line__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_1__line_line__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_1__line_line__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__style_index__ = __webpack_require__(290);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_30__style_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__errors_error__ = __webpack_require__(251);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_31__errors_error__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__ = __webpack_require__(230);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["j"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_32__keyboard_keycodes__["l"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__compatibility_compatibility__ = __webpack_require__(236);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__animation_animation__ = __webpack_require__(348);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__coercion_boolean_property__ = __webpack_require__(229);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_35__coercion_boolean_property__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__coercion_number_property__ = __webpack_require__(349);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_36__coercion_number_property__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_33__compatibility_compatibility__["a"]; });
/* unused harmony reexport NoConflictStyleCompatibilityMode */
/* unused harmony export MdCoreModule */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// RTL

// Mutation Observer


// Portals



// Projection

// Platform

/** @deprecated */

// Overlay









// Gestures

// Explicitly specify the interfaces which should be re-exported, because if everything
// is re-exported, module bundlers may run into issues with treeshaking.
// Ripple

// a11y

// Selection

/** @deprecated */






/** @deprecated */


// Style

// Error

// Misc
// Keybindings


// Animation

// Selection

// Coercion


// Compatibility

var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    /** @deprecated */
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: [],
        };
    };
    MdCoreModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__line_line__["a" /* MdLineModule */],
                __WEBPACK_IMPORTED_MODULE_2__rtl_dir__["b" /* RtlModule */],
                __WEBPACK_IMPORTED_MODULE_5__ripple_ripple__["a" /* MdRippleModule */],
                __WEBPACK_IMPORTED_MODULE_3__observe_content_observe_content__["a" /* ObserveContentModule */],
                __WEBPACK_IMPORTED_MODULE_6__portal_portal_directives__["a" /* PortalModule */],
                __WEBPACK_IMPORTED_MODULE_7__overlay_overlay_directives__["a" /* OverlayModule */],
                __WEBPACK_IMPORTED_MODULE_8__a11y_index__["a" /* A11yModule */],
                __WEBPACK_IMPORTED_MODULE_4__option_option__["a" /* MdOptionModule */],
                __WEBPACK_IMPORTED_MODULE_9__selection_index__["a" /* MdSelectionModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__line_line__["a" /* MdLineModule */],
                __WEBPACK_IMPORTED_MODULE_2__rtl_dir__["b" /* RtlModule */],
                __WEBPACK_IMPORTED_MODULE_5__ripple_ripple__["a" /* MdRippleModule */],
                __WEBPACK_IMPORTED_MODULE_3__observe_content_observe_content__["a" /* ObserveContentModule */],
                __WEBPACK_IMPORTED_MODULE_6__portal_portal_directives__["a" /* PortalModule */],
                __WEBPACK_IMPORTED_MODULE_7__overlay_overlay_directives__["a" /* OverlayModule */],
                __WEBPACK_IMPORTED_MODULE_8__a11y_index__["a" /* A11yModule */],
                __WEBPACK_IMPORTED_MODULE_4__option_option__["a" /* MdOptionModule */],
                __WEBPACK_IMPORTED_MODULE_9__selection_index__["a" /* MdSelectionModule */],
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCoreModule);
    return MdCoreModule;
}());
//# sourceMappingURL=core.js.map

/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(278);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["j"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["k"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["l"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["m"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["n"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["o"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["p"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["q"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["r"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["s"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["t"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["u"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["A"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["B"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["C"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["D"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["E"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["F"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["G"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["H"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["I"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["J"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["K"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["L"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["M"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["N"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 280 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compatibility_compatibility__ = __webpack_require__(236);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdLineSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdLineModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
var MdLine = (function () {
    function MdLine() {
    }
    MdLine = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-line], [mat-line]',
            host: {
                '[class.mat-line]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdLine);
    return MdLine;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
var MdLineSetter = (function () {
    function MdLineSetter(_lines, _renderer, _element) {
        var _this = this;
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    MdLineSetter.prototype._setLineClass = function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    MdLineSetter.prototype._resetClasses = function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    MdLineSetter.prototype._setClass = function (className, bool) {
        this._renderer.setElementClass(this._element.nativeElement, className, bool);
    };
    return MdLineSetter;
}());
var MdLineModule = (function () {
    function MdLineModule() {
    }
    MdLineModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__compatibility_compatibility__["a" /* CompatibilityModule */]],
            exports: [MdLine, __WEBPACK_IMPORTED_MODULE_1__compatibility_compatibility__["a" /* CompatibilityModule */]],
            declarations: [MdLine],
        }), 
        __metadata('design:paramtypes', [])
    ], MdLineModule);
    return MdLineModule;
}());
//# sourceMappingURL=line.js.map

/***/ }),
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayRef; });

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var OverlayRef = (function () {
    function OverlayRef(_portalHost, _pane, _state, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        /** The overlay's HTML element */
        get: function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    OverlayRef.prototype.attach = function (portal) {
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        var attachResult = this._portalHost.attach(portal);
        // Update the pane element with the given state configuration.
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        return attachResult;
    };
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = function () {
        this._detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        return this._portalHost.detach();
    };
    /**
     * Cleans up the overlay from the DOM.
     */
    OverlayRef.prototype.dispose = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        this._detachBackdrop();
        this._portalHost.dispose();
    };
    /**
     * Checks whether the overlay has been attached.
     */
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     */
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    /**
     * Gets the current state config of the overlay.
     */
    OverlayRef.prototype.getState = function () {
        return this._state;
    };
    /** Updates the position of the overlay based on the position strategy. */
    OverlayRef.prototype.updatePosition = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    /** Updates the text direction of the overlay panel. **/
    OverlayRef.prototype.updateDirection = function () {
        this._pane.setAttribute('dir', this._state.direction);
    };
    /** Updates the size of the overlay based on the overlay config. */
    OverlayRef.prototype.updateSize = function () {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }
    };
    /** Toggles the pointer events for the overlay pane element. */
    OverlayRef.prototype._togglePointerEvents = function (enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    };
    /** Attaches a backdrop for this overlay. */
    OverlayRef.prototype._attachBackdrop = function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function () { return _this._backdropClick.next(null); });
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(function () {
            if (_this._backdropElement) {
                _this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    };
    /** Detaches the backdrop (if any) associated with the overlay. */
    OverlayRef.prototype._detachBackdrop = function () {
        var _this = this;
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            var finishDetach_1 = function () {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach_1);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(function () {
                setTimeout(finishDetach_1, 500);
            });
        }
    };
    return OverlayRef;
}());
function formatCssUnit(value) {
    return typeof value === 'string' ? value : value + "px";
}
//# sourceMappingURL=overlay-ref.js.map

/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_state__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__portal_dom_portal_host__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_ref__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__position_overlay_position_builder__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__position_viewport_ruler__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__overlay_container__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scroll_scroll_dispatcher__ = __webpack_require__(232);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Overlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OVERLAY_PROVIDERS; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/** Next overlay unique ID. */
var nextUniqueId = 0;
/** The default state for newly created overlays. */
var defaultState = new __WEBPACK_IMPORTED_MODULE_1__overlay_state__["a" /* OverlayState */]();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns Reference to the created overlay.
     */
    Overlay.prototype.create = function (state) {
        if (state === void 0) { state = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state);
    };
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    Overlay.prototype.position = function () {
        return this._positionBuilder;
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    Overlay.prototype._createPaneElement = function () {
        var pane = document.createElement('div');
        pane.id = "cdk-overlay-" + nextUniqueId++;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = function (pane) {
        return new __WEBPACK_IMPORTED_MODULE_2__portal_dom_portal_host__["a" /* DomPortalHost */](pane, this._componentFactoryResolver, this._appRef, this._injector);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @param state
     */
    Overlay.prototype._createOverlayRef = function (pane, state) {
        return new __WEBPACK_IMPORTED_MODULE_3__overlay_ref__["a" /* OverlayRef */](this._createPortalHost(pane), pane, state, this._ngZone);
    };
    Overlay = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_6__overlay_container__["a" /* OverlayContainer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_4__position_overlay_position_builder__["a" /* OverlayPositionBuilder */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], Overlay);
    return Overlay;
}());
/** Providers for Overlay and its related injectables. */
var OVERLAY_PROVIDERS = [
    Overlay,
    __WEBPACK_IMPORTED_MODULE_4__position_overlay_position_builder__["a" /* OverlayPositionBuilder */],
    __WEBPACK_IMPORTED_MODULE_5__position_viewport_ruler__["b" /* VIEWPORT_RULER_PROVIDER */],
    __WEBPACK_IMPORTED_MODULE_7__scroll_scroll_dispatcher__["b" /* SCROLL_DISPATCHER_PROVIDER */],
    __WEBPACK_IMPORTED_MODULE_6__overlay_container__["b" /* OVERLAY_CONTAINER_PROVIDER */],
];
//# sourceMappingURL=overlay.js.map

/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__connected_position__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectedPositionStrategy; });


/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
var ConnectedPositionStrategy = (function () {
    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        this._dir = 'ltr';
        /** The offset in pixels for the overlay connection point on the x-axis */
        this._offsetX = 0;
        /** The offset in pixels for the overlay connection point on the y-axis */
        this._offsetY = 0;
        /** The Scrollable containers used to check scrollable view properties on position change. */
        this.scrollables = [];
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        this._onPositionChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
        /** Whether the we're dealing with an RTL context */
        get: function () {
            return this._dir === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
        /** Emits an event when the connection point changes. */
        get: function () {
            return this._onPositionChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        /** Ordered list of preferred positions, from most to least desirable. */
        get: function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be used to for any cleanup after the element gets destroyed.
     */
    ConnectedPositionStrategy.prototype.dispose = function () { };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     *
     * @param element Element to which to apply the CSS styles.
     * @returns Resolves when the styles have been applied.
     */
    ConnectedPositionStrategy.prototype.apply = function (element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        var originRect = this._origin.getBoundingClientRect();
        var overlayRect = element.getBoundingClientRect();
        // We use the viewport rect to determine whether a position would go off-screen.
        var viewportRect = this._viewportRuler.getViewportRect();
        // Fallback point if none of the fallbacks fit into the viewport.
        var fallbackPoint = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            var originPoint = this._getOriginConnectionPoint(originRect, pos);
            var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayPoint);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                // Notify that the position has been changed along with its change properties.
                var scrollableViewProperties = this.getScrollableViewProperties(element);
                var positionChange = new __WEBPACK_IMPORTED_MODULE_0__connected_position__["a" /* ConnectedOverlayPositionChange */](pos, scrollableViewProperties);
                this._onPositionChange.next(positionChange);
                return Promise.resolve(null);
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, fallbackPoint);
        return Promise.resolve(null);
    };
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    ConnectedPositionStrategy.prototype.recalculateLastPosition = function () {
        var originRect = this._origin.getBoundingClientRect();
        var overlayRect = this._pane.getBoundingClientRect();
        var viewportRect = this._viewportRuler.getViewportRect();
        var originPoint = this._getOriginConnectionPoint(originRect, this._lastConnectedPosition);
        var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, this._lastConnectedPosition);
        this._setElementPosition(this._pane, overlayPoint);
    };
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    ConnectedPositionStrategy.prototype.withScrollableContainers = function (scrollables) {
        this.scrollables = scrollables;
    };
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
        this._preferredPositions.push(new __WEBPACK_IMPORTED_MODULE_0__connected_position__["b" /* ConnectionPositionPair */](originPos, overlayPos));
        return this;
    };
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    ConnectedPositionStrategy.prototype.withDirection = function (dir) {
        this._dir = dir;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    ConnectedPositionStrategy.prototype.withOffsetX = function (offset) {
        this._offsetX = offset;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    ConnectedPositionStrategy.prototype.withOffsetY = function (offset) {
        this._offsetY = offset;
        return this;
    };
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
        return this._isRtl ? rect.right : rect.left;
    };
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
        return this._isRtl ? rect.left : rect.right;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param originRect
     * @param pos
     */
    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
        var originStartX = this._getStartX(originRect);
        var originEndX = this._getEndX(originRect);
        var x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        var y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     */
    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, viewportRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        var overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        var overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        var x = originPoint.x + overlayStartX + this._offsetX;
        var y = originPoint.y + overlayStartY + this._offsetY;
        // How much the overlay would overflow at this position, on each side.
        var leftOverflow = 0 - x;
        var rightOverflow = (x + overlayRect.width) - viewportRect.width;
        var topOverflow = 0 - y;
        var bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        // Visible parts of the element on each axis.
        var visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        var visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        var visibleArea = visibleWidth * visibleHeight;
        var fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x: x, y: y, fitsInViewport: fitsInViewport, visibleArea: visibleArea };
    };
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     */
    ConnectedPositionStrategy.prototype.getScrollableViewProperties = function (overlay) {
        var _this = this;
        var originBounds = this._getElementBounds(this._origin);
        var overlayBounds = this._getElementBounds(overlay);
        var scrollContainerBounds = this.scrollables.map(function (scrollable) {
            return _this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    };
    /** Whether the element is completely out of the view of any of the containers. */
    ConnectedPositionStrategy.prototype.isElementOutsideView = function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            var outsideAbove = elementBounds.bottom < containerBounds.top;
            var outsideBelow = elementBounds.top > containerBounds.bottom;
            var outsideLeft = elementBounds.right < containerBounds.left;
            var outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    };
    /** Whether the element is clipped by any of the containers. */
    ConnectedPositionStrategy.prototype.isElementClipped = function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            var clippedAbove = elementBounds.top < containerBounds.top;
            var clippedBelow = elementBounds.bottom > containerBounds.bottom;
            var clippedLeft = elementBounds.left < containerBounds.left;
            var clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    };
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param element
     * @param overlayPoint
     */
    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayPoint) {
        element.style.left = overlayPoint.x + 'px';
        element.style.top = overlayPoint.y + 'px';
    };
    /** Returns the bounding positions of the provided element with respect to the viewport. */
    ConnectedPositionStrategy.prototype._getElementBounds = function (element) {
        var boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    };
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     */
    ConnectedPositionStrategy.prototype._subtractOverflows = function (length) {
        var overflows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            overflows[_i - 1] = arguments[_i];
        }
        return overflows.reduce(function (currentValue, currentOverflow) {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    };
    return ConnectedPositionStrategy;
}());
//# sourceMappingURL=connected-position-strategy.js.map

/***/ }),
/* 284 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getSupportedInputTypes;
var supportedInputTypes;
/** @returns The input types supported by this browser. */
function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        var featureTestInput_1 = document.createElement('input');
        supportedInputTypes = new Set([
            // `color` must come first. Chrome 56 shows a warning if we change the type to `color` after
            // first changing it to something else:
            // The specified value "" does not conform to the required format.
            // The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.
            'color',
            'button',
            'checkbox',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ].filter(function (value) {
            featureTestInput_1.setAttribute('type', value);
            return featureTestInput_1.type === value;
        }));
    }
    return supportedInputTypes;
}
//# sourceMappingURL=features.js.map

/***/ }),
/* 285 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__portal__ = __webpack_require__(234);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomPortalHost; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var DomPortalHost = (function (_super) {
    __extends(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        _super.call(this);
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    DomPortalHost.prototype.attachComponentPortal = function (portal) {
        var _this = this;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     */
    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var viewContainer = portal.viewContainerRef;
        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
    /**
     * Clears out a portal from the DOM.
     */
    DomPortalHost.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    };
    /** Gets the root HTMLElement for an instantiated component. */
    DomPortalHost.prototype._getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    return DomPortalHost;
}(__WEBPACK_IMPORTED_MODULE_0__portal__["c" /* BasePortalHost */]));
//# sourceMappingURL=dom-portal-host.js.map

/***/ }),
/* 286 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pseudo_checkbox_pseudo_checkbox__ = __webpack_require__(287);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSelectionModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MdSelectionModule = (function () {
    function MdSelectionModule() {
    }
    MdSelectionModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [__WEBPACK_IMPORTED_MODULE_1__pseudo_checkbox_pseudo_checkbox__["a" /* MdPseudoCheckbox */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pseudo_checkbox_pseudo_checkbox__["a" /* MdPseudoCheckbox */]]
        }), 
        __metadata('design:paramtypes', [])
    ], MdSelectionModule);
    return MdSelectionModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdPseudoCheckbox; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
var MdPseudoCheckbox = (function () {
    function MdPseudoCheckbox(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
        this.color = 'accent';
    }
    Object.defineProperty(MdPseudoCheckbox.prototype, "color", {
        /** Color of the checkbox. */
        get: function () { return this._color; },
        set: function (value) {
            if (value) {
                var nativeElement = this._elementRef.nativeElement;
                this._renderer.setElementClass(nativeElement, "mat-" + this.color, false);
                this._renderer.setElementClass(nativeElement, "mat-" + value, true);
                this._color = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdPseudoCheckbox.prototype, "state", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdPseudoCheckbox.prototype, "disabled", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdPseudoCheckbox.prototype, "color", null);
    MdPseudoCheckbox = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
            styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1}"],
            template: '',
            host: {
                '[class.mat-pseudo-checkbox]': 'true',
                '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                '[class.mat-pseudo-checkbox-disabled]': 'disabled',
            },
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdPseudoCheckbox);
    return MdPseudoCheckbox;
}());
//# sourceMappingURL=pseudo-checkbox.js.map

/***/ }),
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyCssTransform;
/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param element
 * @param transformValue
 */
function applyCssTransform(element, transformValue) {
    // It's important to trim the result, because the browser will ignore the set operation
    // if the string contains only whitespace.
    var value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}
//# sourceMappingURL=apply-transform.js.map

/***/ }),
/* 289 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* unused harmony export TOUCH_BUFFER_MS */
/* unused harmony export FocusOriginMonitor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CdkFocusClasses; });
/* unused harmony export FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FOCUS_ORIGIN_MONITOR_PROVIDER; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
var TOUCH_BUFFER_MS = 650;
/** Monitors mouse and keyboard events to determine the cause of focus events. */
var FocusOriginMonitor = (function () {
    function FocusOriginMonitor() {
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        var _this = this;
        /** The focus origin that the next focus event is a result of. */
        this._origin = null;
        /** Whether the window has just been focused. */
        this._windowFocused = false;
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', function () {
            _this._lastTouchTarget = null;
            _this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', function () {
            if (!_this._lastTouchTarget) {
                _this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means we
        // can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to see if
        // a focus happens.
        document.addEventListener('touchstart', function (event) {
            if (_this._touchTimeout != null) {
                clearTimeout(_this._touchTimeout);
            }
            _this._lastTouchTarget = event.target;
            _this._touchTimeout = setTimeout(function () { return _this._lastTouchTarget = null; }, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', function () {
            _this._windowFocused = true;
            setTimeout(function () { return _this._windowFocused = false; }, 0);
        });
    }
    /** Register an element to receive focus classes. */
    FocusOriginMonitor.prototype.registerElementForFocusClasses = function (element, renderer) {
        var _this = this;
        var subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        renderer.listen(element, 'focus', function (event) { return _this._onFocus(event, element, renderer, subject); });
        renderer.listen(element, 'blur', function () { return _this._onBlur(element, renderer, subject); });
        return subject.asObservable();
    };
    /** Focuses the element via the specified focus origin. */
    FocusOriginMonitor.prototype.focusVia = function (element, renderer, origin) {
        this._setOriginForCurrentEventQueue(origin);
        renderer.invokeElementMethod(element, 'focus');
    };
    /** Sets the origin and schedules an async function to clear it at the end of the event queue. */
    FocusOriginMonitor.prototype._setOriginForCurrentEventQueue = function (origin) {
        var _this = this;
        this._origin = origin;
        setTimeout(function () { return _this._origin = null; }, 0);
    };
    /** Checks whether the given focus event was caused by a touchstart event. */
    FocusOriginMonitor.prototype._wasCausedByTouch = function (event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, renderer,  'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        var focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget == this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    };
    /** Handles focus events on a registered element. */
    FocusOriginMonitor.prototype._onFocus = function (event, element, renderer, subject) {
        // If we couldn't detect a cause for the focus event, it's due to one of two reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (!this._origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                this._origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                this._origin = 'touch';
            }
            else {
                this._origin = 'program';
            }
        }
        renderer.setElementClass(element, 'cdk-focused', true);
        renderer.setElementClass(element, 'cdk-touch-focused', this._origin == 'touch');
        renderer.setElementClass(element, 'cdk-keyboard-focused', this._origin == 'keyboard');
        renderer.setElementClass(element, 'cdk-mouse-focused', this._origin == 'mouse');
        renderer.setElementClass(element, 'cdk-program-focused', this._origin == 'program');
        subject.next(this._origin);
        this._lastFocusOrigin = this._origin;
        this._origin = null;
    };
    /** Handles blur events on a registered element. */
    FocusOriginMonitor.prototype._onBlur = function (element, renderer, subject) {
        renderer.setElementClass(element, 'cdk-focused', false);
        renderer.setElementClass(element, 'cdk-touch-focused', false);
        renderer.setElementClass(element, 'cdk-keyboard-focused', false);
        renderer.setElementClass(element, 'cdk-mouse-focused', false);
        renderer.setElementClass(element, 'cdk-program-focused', false);
        subject.next(null);
    };
    FocusOriginMonitor = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], FocusOriginMonitor);
    return FocusOriginMonitor;
}());
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, or
 * programmatically) and adds corresponding classes to the element.
 */
var CdkFocusClasses = (function () {
    function CdkFocusClasses(elementRef, focusOriginMonitor, renderer) {
        this.changes =
            focusOriginMonitor.registerElementForFocusClasses(elementRef.nativeElement, renderer);
    }
    CdkFocusClasses = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdkFocusClasses]',
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], FocusOriginMonitor, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], CdkFocusClasses);
    return CdkFocusClasses;
}());
function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new FocusOriginMonitor();
}
var FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), FocusOriginMonitor]],
    useFactory: FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY
};
//# sourceMappingURL=focus-classes.js.map

/***/ }),
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__focus_classes__ = __webpack_require__(289);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apply_transform__ = __webpack_require__(288);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__apply_transform__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StyleModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StyleModule = (function () {
    function StyleModule() {
    }
    StyleModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__focus_classes__["a" /* CdkFocusClasses */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__focus_classes__["a" /* CdkFocusClasses */]],
            providers: [__WEBPACK_IMPORTED_MODULE_1__focus_classes__["b" /* FOCUS_ORIGIN_MONITOR_PROVIDER */]],
        }), 
        __metadata('design:paramtypes', [])
    ], StyleModule);
    return StyleModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extendObject;
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param dest The object which will have properties copied to it.
 * @param sources The source objects from which properties will be copied.
 */
function extendObject(dest) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        if (source != null) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}
//# sourceMappingURL=object-extend.js.map

/***/ }),
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialogConfig; });
;
/**
 * Configuration for opening a modal dialog with the MdDialog service.
 */
var MdDialogConfig = (function () {
    function MdDialogConfig() {
        /** The ARIA role of the dialog element. */
        this.role = 'dialog';
        /** Whether the user can use escape or clicking outside to close a modal. */
        this.disableClose = false;
        /** Width of the dialog. */
        this.width = '';
        /** Height of the dialog. */
        this.height = '';
    }
    return MdDialogConfig;
}());
//# sourceMappingURL=dialog-config.js.map

/***/ }),
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_ref__ = __webpack_require__(242);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialogClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdDialogTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdDialogContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MdDialogActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Button that will close the current dialog.
 */
var MdDialogClose = (function () {
    function MdDialogClose(dialogRef) {
        this.dialogRef = dialogRef;
        /** Screenreader label for the button. */
        this.ariaLabel = 'Close dialog';
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-label'), 
        __metadata('design:type', String)
    ], MdDialogClose.prototype, "ariaLabel", void 0);
    MdDialogClose = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'button[md-dialog-close], button[mat-dialog-close]',
            host: {
                '(click)': 'dialogRef.close()',
                '[attr.aria-label]': 'ariaLabel',
                'type': 'button',
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__dialog_ref__["a" /* MdDialogRef */]])
    ], MdDialogClose);
    return MdDialogClose;
}());
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
var MdDialogTitle = (function () {
    function MdDialogTitle() {
    }
    MdDialogTitle = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-dialog-title], [mat-dialog-title]',
            host: {
                '[class.mat-dialog-title]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogTitle);
    return MdDialogTitle;
}());
/**
 * Scrollable content container of a dialog.
 */
var MdDialogContent = (function () {
    function MdDialogContent() {
    }
    MdDialogContent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-dialog-content], md-dialog-content, [mat-dialog-content], mat-dialog-content',
            host: {
                '[class.mat-dialog-content]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogContent);
    return MdDialogContent;
}());
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
var MdDialogActions = (function () {
    function MdDialogActions() {
    }
    MdDialogActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-dialog-actions], md-dialog-actions, [mat-dialog-actions], mat-dialog-actions',
            host: {
                '[class.mat-dialog-actions]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogActions);
    return MdDialogActions;
}());
//# sourceMappingURL=dialog-content-directives.js.map

/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_ref__ = __webpack_require__(242);
/* unused harmony export MD_DIALOG_DATA */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogInjector; });


var MD_DIALOG_DATA = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('MdDialogData');
/** Custom injector type specifically for instantiating components with a dialog. */
var DialogInjector = (function () {
    function DialogInjector(_parentInjector, _dialogRef, _data) {
        this._parentInjector = _parentInjector;
        this._dialogRef = _dialogRef;
        this._data = _data;
    }
    DialogInjector.prototype.get = function (token, notFoundValue) {
        if (token === __WEBPACK_IMPORTED_MODULE_1__dialog_ref__["a" /* MdDialogRef */]) {
            return this._dialogRef;
        }
        if (token === MD_DIALOG_DATA && this._data) {
            return this._data;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return DialogInjector;
}());
//# sourceMappingURL=dialog-injector.js.map

/***/ }),
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_util_object_extend__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_keyboard_keycodes__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dialog_injector__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialog_config__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dialog_ref__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialog_container__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_portal_portal__ = __webpack_require__(234);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










// TODO(jelbourn): animations
/**
 * Service to open Material Design modal dialogs.
 */
var MdDialog = (function () {
    function MdDialog(_overlay, _injector, _parentDialog) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._afterOpenAtThisLevel = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._boundKeydown = this._handleKeydown.bind(this);
        /** Gets an observable that is notified when a dialog has been opened. */
        this.afterOpen = this._afterOpen.asObservable();
        /** Gets an observable that is notified when all open dialog have finished closing. */
        this.afterAllClosed = this._afterAllClosed.asObservable();
    }
    Object.defineProperty(MdDialog.prototype, "_openDialogs", {
        /** Keeps track of the currently-open dialogs. */
        get: function () {
            return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdDialog.prototype, "_afterOpen", {
        /** Subject for notifying the user that all open dialogs have finished closing. */
        get: function () {
            return this._parentDialog ? this._parentDialog._afterOpen : this._afterOpenAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdDialog.prototype, "_afterAllClosed", {
        /** Subject for notifying the user that a dialog has opened. */
        get: function () {
            return this._parentDialog ?
                this._parentDialog._afterAllClosed : this._afterAllClosedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens a modal dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    MdDialog.prototype.open = function (componentOrTemplateRef, config) {
        var _this = this;
        config = _applyConfigDefaults(config);
        var overlayRef = this._createOverlay(config);
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        var dialogRef = this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this._openDialogs.length && !this._parentDialog) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this._openDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(function () { return _this._removeOpenDialog(dialogRef); });
        this._afterOpen.next(dialogRef);
        return dialogRef;
    };
    /**
     * Closes all of the currently-open dialogs.
     */
    MdDialog.prototype.closeAll = function () {
        var i = this._openDialogs.length;
        while (i--) {
            // The `_openDialogs` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            this._openDialogs[i].close();
        }
    };
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param dialogConfig The dialog configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    MdDialog.prototype._createOverlay = function (dialogConfig) {
        var overlayState = this._getOverlayState(dialogConfig);
        return this._overlay.create(overlayState);
    };
    /**
     * Attaches an MdDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    MdDialog.prototype._attachDialogContainer = function (overlay, config) {
        var viewContainer = config ? config.viewContainerRef : null;
        var containerPortal = new __WEBPACK_IMPORTED_MODULE_2__core__["a" /* ComponentPortal */](__WEBPACK_IMPORTED_MODULE_8__dialog_container__["a" /* MdDialogContainer */], viewContainer);
        var containerRef = overlay.attach(containerPortal);
        containerRef.instance.dialogConfig = config;
        return containerRef.instance;
    };
    /**
     * Attaches the user-provided component to the already-created MdDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MdDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MdDialogRef that should be returned to the user.
     */
    MdDialog.prototype._attachDialogContent = function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        var dialogRef = new __WEBPACK_IMPORTED_MODULE_7__dialog_ref__["a" /* MdDialogRef */](overlayRef, config);
        if (!config.disableClose) {
            // When the dialog backdrop is clicked, we want to close it.
            overlayRef.backdropClick().first().subscribe(function () { return dialogRef.close(); });
        }
        // Set the dialogRef to the container so that it can use the ref to close the dialog.
        dialogContainer.dialogRef = dialogRef;
        // We create an injector specifically for the component we're instantiating so that it can
        // inject the MdDialogRef. This allows a component loaded inside of a dialog to close itself
        // and, optionally, to return a value.
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var dialogInjector = new __WEBPACK_IMPORTED_MODULE_5__dialog_injector__["a" /* DialogInjector */](userInjector || this._injector, dialogRef, config.data);
        if (componentOrTemplateRef instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) {
            dialogContainer.attachTemplatePortal(new __WEBPACK_IMPORTED_MODULE_9__core_portal_portal__["b" /* TemplatePortal */](componentOrTemplateRef, null));
        }
        else {
            var contentRef = dialogContainer.attachComponentPortal(new __WEBPACK_IMPORTED_MODULE_2__core__["a" /* ComponentPortal */](componentOrTemplateRef, null, dialogInjector));
            dialogRef.componentInstance = contentRef.instance;
        }
        return dialogRef;
    };
    /**
     * Creates an overlay state from a dialog config.
     * @param dialogConfig The dialog configuration.
     * @returns The overlay configuration.
     */
    MdDialog.prototype._getOverlayState = function (dialogConfig) {
        var state = new __WEBPACK_IMPORTED_MODULE_2__core__["b" /* OverlayState */]();
        var strategy = this._overlay.position().global();
        var position = dialogConfig.position;
        state.hasBackdrop = true;
        state.positionStrategy = strategy;
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        strategy.width(dialogConfig.width).height(dialogConfig.height);
        return state;
    };
    /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef Dialog to be removed.
     */
    MdDialog.prototype._removeOpenDialog = function (dialogRef) {
        var index = this._openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                this._afterAllClosed.next();
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
    };
    /**
     * Handles global key presses while there are open dialogs. Closes the
     * top dialog when the user presses escape.
     */
    MdDialog.prototype._handleKeydown = function (event) {
        var topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === __WEBPACK_IMPORTED_MODULE_4__core_keyboard_keycodes__["k" /* ESCAPE */] && topDialog && !topDialog.config.disableClose) {
            topDialog.close();
        }
    };
    MdDialog = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__core__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], MdDialog])
    ], MdDialog);
    return MdDialog;
}());
/**
 * Applies default options to the dialog config.
 * @param dialogConfig Config to be modified.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(dialogConfig) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_util_object_extend__["a" /* extendObject */])(new __WEBPACK_IMPORTED_MODULE_6__dialog_config__["a" /* MdDialogConfig */](), dialogConfig);
}
//# sourceMappingURL=dialog.js.map

/***/ }),
/* 296 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_container__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__ = __webpack_require__(293);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dialog_config__ = __webpack_require__(292);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialog_ref__ = __webpack_require__(242);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dialog_injector__ = __webpack_require__(294);
/* unused harmony reexport MD_DIALOG_DATA */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialogModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MdDialogModule = (function () {
    function MdDialogModule() {
    }
    /** @deprecated */
    MdDialogModule.forRoot = function () {
        return {
            ngModule: MdDialogModule,
            providers: [],
        };
    };
    MdDialogModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__core__["d" /* OverlayModule */],
                __WEBPACK_IMPORTED_MODULE_1__core__["o" /* PortalModule */],
                __WEBPACK_IMPORTED_MODULE_1__core__["C" /* A11yModule */],
                __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__dialog_container__["a" /* MdDialogContainer */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["a" /* MdDialogClose */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["b" /* MdDialogTitle */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["c" /* MdDialogContent */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["d" /* MdDialogActions */],
                __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__dialog_container__["a" /* MdDialogContainer */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["a" /* MdDialogClose */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["b" /* MdDialogTitle */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["d" /* MdDialogActions */],
                __WEBPACK_IMPORTED_MODULE_4__dialog_content_directives__["c" /* MdDialogContent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__dialog__["a" /* MdDialog */],
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__dialog_container__["a" /* MdDialogContainer */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogModule);
    return MdDialogModule;
}());






//# sourceMappingURL=index.js.map

/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = coerceToString;
/* harmony export (immutable) */ __webpack_exports__["a"] = coerceToNumber;
/**
 * Converts values into strings. Falsy values become empty strings.
 * @docs-private
 */
function coerceToString(value) {
    return "" + (value || '');
}
/**
 * Converts a value that might be a string into a number.
 * @docs-private
 */
function coerceToNumber(value) {
    return typeof value === 'string' ? parseInt(value, 10) : value;
}
//# sourceMappingURL=grid-list-measure.js.map

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid_list__ = __webpack_require__(360);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__grid_list__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_filter__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_do__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_share__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_finally__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_catch__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_catch__);
/* unused harmony export MdIconNameNotFoundError */
/* unused harmony export MdIconSvgTagNotFoundError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdIconRegistry; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Exception thrown when attempting to load an icon with a name that cannot be found.
 * @docs-private
 */
var MdIconNameNotFoundError = (function (_super) {
    __extends(MdIconNameNotFoundError, _super);
    function MdIconNameNotFoundError(iconName) {
        _super.call(this, "Unable to find icon with the name \"" + iconName + "\"");
    }
    return MdIconNameNotFoundError;
}(__WEBPACK_IMPORTED_MODULE_3__core__["f" /* MdError */]));
/**
 * Exception thrown when attempting to load SVG content that does not contain the expected
 * <svg> tag.
 * @docs-private
 */
var MdIconSvgTagNotFoundError = (function (_super) {
    __extends(MdIconSvgTagNotFoundError, _super);
    function MdIconSvgTagNotFoundError() {
        _super.call(this, '<svg> tag not found');
    }
    return MdIconSvgTagNotFoundError;
}(__WEBPACK_IMPORTED_MODULE_3__core__["f" /* MdError */]));
/**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
var SvgIconConfig = (function () {
    function SvgIconConfig(url) {
        this.url = url;
        this.svgElement = null;
    }
    return SvgIconConfig;
}());
/** Returns the cache key to use for an icon namespace and name. */
var iconKey = function (namespace, name) { return namespace + ':' + name; };
/**
 * Service to register and display icons used by the <md-icon> component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
var MdIconRegistry = (function () {
    function MdIconRegistry(_http, _sanitizer) {
        this._http = _http;
        this._sanitizer = _sanitizer;
        /**
         * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
         */
        this._svgIconConfigs = new Map();
        /**
         * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
         * Multiple icon sets can be registered under the same namespace.
         */
        this._iconSetConfigs = new Map();
        /** Cache for icons loaded by direct URLs. */
        this._cachedIconsByUrl = new Map();
        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
        this._inProgressUrlFetches = new Map();
        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
        this._fontCssClassesByAlias = new Map();
        /**
         * The CSS class to apply when an <md-icon> component has no icon name, url, or font specified.
         * The default 'material-icons' value assumes that the material icon font has been loaded as
         * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
         */
        this._defaultFontSetClass = 'material-icons';
    }
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    MdIconRegistry.prototype.addSvgIcon = function (iconName, url) {
        return this.addSvgIconInNamespace('', iconName, url);
    };
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    MdIconRegistry.prototype.addSvgIconInNamespace = function (namespace, iconName, url) {
        var key = iconKey(namespace, iconName);
        this._svgIconConfigs.set(key, new SvgIconConfig(url));
        return this;
    };
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     */
    MdIconRegistry.prototype.addSvgIconSet = function (url) {
        return this.addSvgIconSetInNamespace('', url);
    };
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     */
    MdIconRegistry.prototype.addSvgIconSetInNamespace = function (namespace, url) {
        var config = new SvgIconConfig(url);
        if (this._iconSetConfigs.has(namespace)) {
            this._iconSetConfigs.get(namespace).push(config);
        }
        else {
            this._iconSetConfigs.set(namespace, [config]);
        }
        return this;
    };
    /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an mdIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the <md-icon> element.
     *
     * @param alias Alias for the font.
     * @param className Class name override to be used instead of the alias.
     */
    MdIconRegistry.prototype.registerFontClassAlias = function (alias, className) {
        if (className === void 0) { className = alias; }
        this._fontCssClassesByAlias.set(alias, className);
        return this;
    };
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     */
    MdIconRegistry.prototype.classNameForFontAlias = function (alias) {
        return this._fontCssClassesByAlias.get(alias) || alias;
    };
    /**
     * Sets the CSS class name to be used for icon fonts when an <md-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param className
     */
    MdIconRegistry.prototype.setDefaultFontSetClass = function (className) {
        this._defaultFontSetClass = className;
        return this;
    };
    /**
     * Returns the CSS class name to be used for icon fonts when an <md-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    MdIconRegistry.prototype.getDefaultFontSetClass = function () {
        return this._defaultFontSetClass;
    };
    /**
     * Returns an Observable that produces the icon (as an <svg> DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     */
    MdIconRegistry.prototype.getSvgIconFromUrl = function (safeUrl) {
        var _this = this;
        var url = this._sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SecurityContext"].RESOURCE_URL, safeUrl);
        if (this._cachedIconsByUrl.has(url)) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(cloneSvg(this._cachedIconsByUrl.get(url)));
        }
        return this._loadSvgIconFromConfig(new SvgIconConfig(url))
            .do(function (svg) { return _this._cachedIconsByUrl.set(url, svg); })
            .map(function (svg) { return cloneSvg(svg); });
    };
    /**
     * Returns an Observable that produces the icon (as an <svg> DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an MdIconNameNotFoundError.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     */
    MdIconRegistry.prototype.getNamedSvgIcon = function (name, namespace) {
        if (namespace === void 0) { namespace = ''; }
        // Return (copy of) cached icon if possible.
        var key = iconKey(namespace, name);
        if (this._svgIconConfigs.has(key)) {
            return this._getSvgFromConfig(this._svgIconConfigs.get(key));
        }
        // See if we have any icon sets registered for the namespace.
        var iconSetConfigs = this._iconSetConfigs.get(namespace);
        if (iconSetConfigs) {
            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
        }
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw(new MdIconNameNotFoundError(key));
    };
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     */
    MdIconRegistry.prototype._getSvgFromConfig = function (config) {
        if (config.svgElement) {
            // We already have the SVG element for this icon, return a copy.
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(cloneSvg(config.svgElement));
        }
        else {
            // Fetch the icon from the config's URL, cache it, and return a copy.
            return this._loadSvgIconFromConfig(config)
                .do(function (svg) { return config.svgElement = svg; })
                .map(function (svg) { return cloneSvg(svg); });
        }
    };
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * MdIconNameNotFoundError if no icon with the specified name can be found.
     */
    MdIconRegistry.prototype._getSvgFromIconSetConfigs = function (name, iconSetConfigs) {
        var _this = this;
        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
        // requested name.
        var namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
        if (namedIcon) {
            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
            // time anyway, there's probably not much advantage compared to just always extracting
            // it from the icon set.
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(namedIcon);
        }
        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
        // fetched, fetch them now and look for iconName in the results.
        var iconSetFetchRequests = iconSetConfigs
            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
            .map(function (iconSetConfig) {
            return _this._loadSvgIconSetFromConfig(iconSetConfig)
                .catch(function (err, caught) {
                var url = _this._sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SecurityContext"].RESOURCE_URL, iconSetConfig.url);
                // Swallow errors fetching individual URLs so the combined Observable won't
                // necessarily fail.
                console.log("Loading icon set URL: " + url + " failed: " + err);
                return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(null);
            })
                .do(function (svg) {
                // Cache SVG element.
                if (svg) {
                    iconSetConfig.svgElement = svg;
                }
            });
        });
        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
        // cached SVG element (unless the request failed), and we can check again for the icon.
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].forkJoin(iconSetFetchRequests)
            .map(function (ignoredResults) {
            var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
            if (!foundIcon) {
                throw new MdIconNameNotFoundError(name);
            }
            return foundIcon;
        });
    };
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    MdIconRegistry.prototype._extractIconWithNameFromAnySet = function (iconName, iconSetConfigs) {
        // Iterate backwards, so icon sets added later have precedence.
        for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
            var config = iconSetConfigs[i];
            if (config.svgElement) {
                var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName);
                if (foundIcon) {
                    return foundIcon;
                }
            }
        }
        return null;
    };
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    MdIconRegistry.prototype._loadSvgIconFromConfig = function (config) {
        var _this = this;
        return this._fetchUrl(config.url)
            .map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText); });
    };
    /**
     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    MdIconRegistry.prototype._loadSvgIconSetFromConfig = function (config) {
        var _this = this;
        // TODO: Document that icons should only be loaded from trusted sources.
        return this._fetchUrl(config.url)
            .map(function (svgText) { return _this._svgElementFromString(svgText); });
    };
    /**
     * Creates a DOM element from the given SVG string, and adds default attributes.
     */
    MdIconRegistry.prototype._createSvgElementForSingleIcon = function (responseText) {
        var svg = this._svgElementFromString(responseText);
        this._setSvgAttributes(svg);
        return svg;
    };
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    MdIconRegistry.prototype._extractSvgIconFromSet = function (iconSet, iconName) {
        var iconNode = iconSet.querySelector('#' + iconName);
        if (!iconNode) {
            return null;
        }
        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
        // the content of a new <svg> node.
        if (iconNode.tagName.toLowerCase() == 'svg') {
            return this._setSvgAttributes(iconNode.cloneNode(true));
        }
        // createElement('SVG') doesn't work as expected; the DOM ends up with
        // the correct nodes, but the SVG content doesn't render. Instead we
        // have to create an empty SVG node using innerHTML and append its content.
        // Elements created using DOMParser.parseFromString have the same problem.
        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
        var svg = this._svgElementFromString('<svg></svg>');
        // Clone the node so we don't remove it from the parent icon set element.
        svg.appendChild(iconNode.cloneNode(true));
        return this._setSvgAttributes(svg);
    };
    /**
     * Creates a DOM element from the given SVG string.
     */
    MdIconRegistry.prototype._svgElementFromString = function (str) {
        // TODO: Is there a better way than innerHTML? Renderer doesn't appear to have a method for
        // creating an element from an HTML string.
        var div = document.createElement('DIV');
        div.innerHTML = str;
        var svg = div.querySelector('svg');
        if (!svg) {
            throw new MdIconSvgTagNotFoundError();
        }
        return svg;
    };
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     */
    MdIconRegistry.prototype._setSvgAttributes = function (svg) {
        if (!svg.getAttribute('xmlns')) {
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        svg.setAttribute('fit', '');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
        return svg;
    };
    /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    MdIconRegistry.prototype._fetchUrl = function (safeUrl) {
        var _this = this;
        var url = this._sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SecurityContext"].RESOURCE_URL, safeUrl);
        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        if (this._inProgressUrlFetches.has(url)) {
            return this._inProgressUrlFetches.get(url);
        }
        // TODO(jelbourn): for some reason, the `finally` operator "loses" the generic type on the
        // Observable. Figure out why and fix it.
        var req = this._http.get(url)
            .map(function (response) { return response.text(); })
            .finally(function () {
            _this._inProgressUrlFetches.delete(url);
        })
            .share();
        this._inProgressUrlFetches.set(url, req);
        return req;
    };
    MdIconRegistry = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]])
    ], MdIconRegistry);
    return MdIconRegistry;
}());
/** Clones an SVGElement while preserving type information. */
function cloneSvg(svg) {
    return svg.cloneNode(true);
}
//# sourceMappingURL=icon-registry.js.map

/***/ }),
/* 300 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(364);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__icon__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 301 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTextareaAutosize; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Directive to automatically resize a textarea to fit its content.
 */
var MdTextareaAutosize = (function () {
    function MdTextareaAutosize(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(MdTextareaAutosize.prototype, "mdAutosizeMinRows", {
        get: function () {
            return this.minRows;
        },
        set: function (value) {
            this.minRows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTextareaAutosize.prototype, "mdAutosizeMaxRows", {
        get: function () {
            return this.maxRows;
        },
        set: function (value) {
            this.maxRows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTextareaAutosize.prototype, "_minHeight", {
        /** The minimum height of the textarea as determined by minRows. */
        get: function () {
            return this.minRows ? this.minRows * this._cachedLineHeight + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTextareaAutosize.prototype, "_maxHeight", {
        /** The maximum height of the textarea as determined by maxRows. */
        get: function () {
            return this.maxRows ? this.maxRows * this._cachedLineHeight + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    MdTextareaAutosize.prototype.ngOnInit = function () {
        this._cacheTextareaLineHeight();
        this.resizeToFitContent();
    };
    /**
     * Cache the height of a single-row textarea.
     *
     * We need to know how large a single "row" of a textarea is in order to apply minRows and
     * maxRows. For the initial version, we will assume that the height of a single line in the
     * textarea does not ever change.
     */
    MdTextareaAutosize.prototype._cacheTextareaLineHeight = function () {
        var textarea = this._elementRef.nativeElement;
        // Use a clone element because we have to override some styles.
        var textareaClone = textarea.cloneNode(false);
        textareaClone.rows = 1;
        // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        textarea.parentNode.appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.offsetHeight;
        textarea.parentNode.removeChild(textareaClone);
    };
    /** Resize the textarea to fit its content. */
    MdTextareaAutosize.prototype.resizeToFitContent = function () {
        var textarea = this._elementRef.nativeElement;
        // Reset the textarea height to auto in order to shrink back to its default size.
        textarea.style.height = 'auto';
        // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
        textarea.style.height = textarea.scrollHeight + "px";
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MdTextareaAutosize.prototype, "minRows", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MdTextareaAutosize.prototype, "mdAutosizeMinRows", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MdTextareaAutosize.prototype, "maxRows", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MdTextareaAutosize.prototype, "mdAutosizeMaxRows", null);
    MdTextareaAutosize = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'textarea[md-autosize], textarea[mdTextareaAutosize],' +
                'textarea[mat-autosize], textarea[matTextareaAutosize]',
            exportAs: 'mdTextareaAutosize',
            host: {
                '(input)': 'resizeToFitContent()',
                '[style.min-height]': '_minHeight',
                '[style.max-height]': '_maxHeight',
            },
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdTextareaAutosize);
    return MdTextareaAutosize;
}());
//# sourceMappingURL=autosize.js.map

/***/ }),
/* 302 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_container__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__autosize__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_platform_index__ = __webpack_require__(240);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_container_errors__ = __webpack_require__(303);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdInputModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MdInputModule = (function () {
    function MdInputModule() {
    }
    /** @deprecated */
    MdInputModule.forRoot = function () {
        return {
            ngModule: MdInputModule,
            providers: [],
        };
    };
    MdInputModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__input_container__["a" /* MdPlaceholder */],
                __WEBPACK_IMPORTED_MODULE_1__input_container__["b" /* MdInputContainer */],
                __WEBPACK_IMPORTED_MODULE_1__input_container__["c" /* MdHint */],
                __WEBPACK_IMPORTED_MODULE_2__autosize__["a" /* MdTextareaAutosize */],
                __WEBPACK_IMPORTED_MODULE_1__input_container__["d" /* MdInputDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__core_platform_index__["a" /* PlatformModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__input_container__["a" /* MdPlaceholder */],
                __WEBPACK_IMPORTED_MODULE_1__input_container__["b" /* MdInputContainer */],
                __WEBPACK_IMPORTED_MODULE_1__input_container__["c" /* MdHint */],
                __WEBPACK_IMPORTED_MODULE_2__autosize__["a" /* MdTextareaAutosize */],
                __WEBPACK_IMPORTED_MODULE_1__input_container__["d" /* MdInputDirective */]
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputModule);
    return MdInputModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_errors_error__ = __webpack_require__(251);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdInputContainerPlaceholderConflictError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdInputContainerUnsupportedTypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MdInputContainerDuplicatedHintError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdInputContainerMissingMdInputError; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/** @docs-private */
var MdInputContainerPlaceholderConflictError = (function (_super) {
    __extends(MdInputContainerPlaceholderConflictError, _super);
    function MdInputContainerPlaceholderConflictError() {
        _super.call(this, 'Placeholder attribute and child element were both specified.');
    }
    return MdInputContainerPlaceholderConflictError;
}(__WEBPACK_IMPORTED_MODULE_0__core_errors_error__["a" /* MdError */]));
/** @docs-private */
var MdInputContainerUnsupportedTypeError = (function (_super) {
    __extends(MdInputContainerUnsupportedTypeError, _super);
    function MdInputContainerUnsupportedTypeError(type) {
        _super.call(this, "Input type \"" + type + "\" isn't supported by md-input-container.");
    }
    return MdInputContainerUnsupportedTypeError;
}(__WEBPACK_IMPORTED_MODULE_0__core_errors_error__["a" /* MdError */]));
/** @docs-private */
var MdInputContainerDuplicatedHintError = (function (_super) {
    __extends(MdInputContainerDuplicatedHintError, _super);
    function MdInputContainerDuplicatedHintError(align) {
        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
    }
    return MdInputContainerDuplicatedHintError;
}(__WEBPACK_IMPORTED_MODULE_0__core_errors_error__["a" /* MdError */]));
/** @docs-private */
var MdInputContainerMissingMdInputError = (function (_super) {
    __extends(MdInputContainerMissingMdInputError, _super);
    function MdInputContainerMissingMdInputError() {
        _super.call(this, 'md-input-container must contain an mdInput directive. Did you forget to add mdInput ' +
            'to the native input or textarea element?');
    }
    return MdInputContainerMissingMdInputError;
}(__WEBPACK_IMPORTED_MODULE_0__core_errors_error__["a" /* MdError */]));
//# sourceMappingURL=input-container-errors.js.map

/***/ }),
/* 304 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list__ = __webpack_require__(366);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__list__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 305 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu__ = __webpack_require__(367);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__menu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_trigger__ = __webpack_require__(261);
/* unused harmony reexport MdMenuTrigger */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_animations__ = __webpack_require__(306);
/* unused harmony reexport fadeInItems */
/* unused harmony reexport transformMenu */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_directive__ = __webpack_require__(260);
/* unused harmony reexport MdMenu */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_item__ = __webpack_require__(243);
/* unused harmony reexport MdMenuItem */





//# sourceMappingURL=index.js.map

/***/ }),
/* 306 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return transformMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fadeInItems; });

/**
 * Below are all the animations for the md-menu component.
 * Animation duration and timing values are based on AngularJS Material.
 */
/**
 * This animation controls the menu panel's entry and exit from the page.
 *
 * When the menu panel is added to the DOM, it scales in and fades in its border.
 *
 * When the menu panel is removed from the DOM, it simply fades out after a brief
 * delay to display the ripple.
 */
// TODO(kara): switch to :enter and :leave once Mobile Safari is sorted out.
var transformMenu = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('transformMenu', [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('showing', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1,
        transform: "scale(1)"
    })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
            opacity: 0,
            transform: "scale(0)"
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])("200ms cubic-bezier(0.25, 0.8, 0.25, 1)")
    ]),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => void', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('50ms 100ms linear', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0 }))
    ])
]);
/**
 * This animation fades in the background color and content of the menu panel
 * after its containing element is scaled in.
 */
var fadeInItems = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('fadeInItems', [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('showing', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 1 })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0 }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])("200ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);
//# sourceMappingURL=menu-animations.js.map

/***/ }),
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdMenuMissingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdMenuInvalidPositionX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdMenuInvalidPositionY; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Exception thrown when menu trigger doesn't have a valid md-menu instance
 * @docs-private
 */
var MdMenuMissingError = (function (_super) {
    __extends(MdMenuMissingError, _super);
    function MdMenuMissingError() {
        _super.call(this, "md-menu-trigger: must pass in an md-menu instance.\n\n    Example:\n      <md-menu #menu=\"mdMenu\"></md-menu>\n      <button [mdMenuTriggerFor]=\"menu\"></button>\n    ");
    }
    return MdMenuMissingError;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
/**
 * Exception thrown when menu's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
var MdMenuInvalidPositionX = (function (_super) {
    __extends(MdMenuInvalidPositionX, _super);
    function MdMenuInvalidPositionX() {
        _super.call(this, "x-position value must be either 'before' or after'.\n      Example: <md-menu x-position=\"before\" #menu=\"mdMenu\"></md-menu>\n    ");
    }
    return MdMenuInvalidPositionX;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
/**
 * Exception thrown when menu's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
var MdMenuInvalidPositionY = (function (_super) {
    __extends(MdMenuInvalidPositionY, _super);
    function MdMenuInvalidPositionY() {
        _super.call(this, "y-position value must be either 'above' or below'.\n      Example: <md-menu y-position=\"above\" #menu=\"mdMenu\"></md-menu>\n    ");
    }
    return MdMenuInvalidPositionY;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
//# sourceMappingURL=menu-errors.js.map

/***/ }),
/* 308 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_bar__ = __webpack_require__(369);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__progress_bar__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 309 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_circle__ = __webpack_require__(370);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_spinner__ = __webpack_require__(262);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__progress_spinner__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),
/* 310 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__radio__ = __webpack_require__(371);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__radio__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 311 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_option_option__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(227);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__select_animations__ = __webpack_require__(312);
/* unused harmony reexport fadeInContent */
/* unused harmony reexport transformPanel */
/* unused harmony reexport transformPlaceholder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSelectModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MdSelectModule = (function () {
    function MdSelectModule() {
    }
    /** @deprecated */
    MdSelectModule.forRoot = function () {
        return {
            ngModule: MdSelectModule,
            providers: []
        };
    };
    MdSelectModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_4__core__["d" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_3__core_option_option__["a" /* MdOptionModule */], __WEBPACK_IMPORTED_MODULE_4__core__["e" /* CompatibilityModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__select__["a" /* MdSelect */], __WEBPACK_IMPORTED_MODULE_3__core_option_option__["a" /* MdOptionModule */], __WEBPACK_IMPORTED_MODULE_4__core__["e" /* CompatibilityModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__select__["a" /* MdSelect */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSelectModule);
    return MdSelectModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),
/* 312 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return transformPlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return transformPanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fadeInContent; });

/**
 * The following are all the animations for the md-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material md-select animation.
 */
/**
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
 */
var transformPlaceholder = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('transformPlaceholder', [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('floating-ltr', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        top: '-22px',
        left: '-2px',
        transform: "scale(0.75)"
    })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('floating-rtl', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        top: '-22px',
        left: '2px',
        transform: "scale(0.75)"
    })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])("400ms cubic-bezier(0.25, 0.8, 0.25, 1)"))
]);
/**
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width 32px, scales it up to
 * 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
 */
var transformPanel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('transformPanel', [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('showing', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: "translate3d(0,0,0) scaleY(1)"
    })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
            opacity: 0,
            minWidth: '100%',
            transform: "translate3d(0, 0, 0) scaleY(0)"
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])("150ms cubic-bezier(0.25, 0.8, 0.25, 1)")
    ]),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => void', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms 100ms linear', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0 }))
    ])
]);
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
var fadeInContent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('fadeInContent', [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('showing', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 1 })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => showing', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0 }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);
//# sourceMappingURL=select-animations.js.map

/***/ }),
/* 313 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_option_option__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_keyboard_keycodes__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_key_manager__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__select_animations__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_overlay_overlay_directives__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_overlay_position_viewport_ruler__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_startWith__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_startWith__);
/* unused harmony export SELECT_OPTION_HEIGHT */
/* unused harmony export SELECT_PANEL_MAX_HEIGHT */
/* unused harmony export SELECT_MAX_OPTIONS_DISPLAYED */
/* unused harmony export SELECT_TRIGGER_HEIGHT */
/* unused harmony export SELECT_OPTION_HEIGHT_ADJUSTMENT */
/* unused harmony export SELECT_PANEL_PADDING_X */
/* unused harmony export SELECT_PANEL_PADDING_Y */
/* unused harmony export SELECT_PANEL_VIEWPORT_PADDING */
/* unused harmony export MdSelectChange */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSelect; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The fixed height of every option element. */
var SELECT_OPTION_HEIGHT = 48;
/** The max height of the select's overlay panel */
var SELECT_PANEL_MAX_HEIGHT = 256;
/** The max number of options visible at once in the select panel. */
var SELECT_MAX_OPTIONS_DISPLAYED = 5;
/** The fixed height of the select's trigger element. */
var SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 * (SELECT_OPTION_HEIGHT (48) - SELECT_TRIGGER_HEIGHT (30)) / 2 = 9
 */
var SELECT_OPTION_HEIGHT_ADJUSTMENT = 9;
/** The panel's padding on the x-axis */
var SELECT_PANEL_PADDING_X = 16;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
var SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
var SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Change event object that is emitted when the select value has changed. */
var MdSelectChange = (function () {
    function MdSelectChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return MdSelectChange;
}());
var MdSelect = (function () {
    function MdSelect(_element, _renderer, _viewportRuler, _changeDetectorRef, _dir, _control) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._control = _control;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        /** Subscriptions to option events. */
        this._subscriptions = [];
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this._scrollTop = 0;
        /** The animation state of the placeholder. */
        this._placeholderState = '';
        /** View -> model callback called when value changes */
        this._onChange = function (value) { };
        /** View -> model callback called when select has been touched */
        this._onTouched = function () { };
        /** The IDs of child options to be passed to the aria-owns attribute. */
        this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        this._panelDoneAnimating = false;
        /**
         * The x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction.
         */
        this._offsetX = 0;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        /** Event emitted when the select has been opened. */
        this.onOpen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the select has been closed. */
        this.onClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the selected value has been changed by the user. */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(MdSelect.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: function () { return this._placeholder; },
        set: function (value) {
            var _this = this;
            this._placeholder = value;
            // Must wait to record the trigger width to ensure placeholder width is included.
            Promise.resolve(null).then(function () { return _this._triggerWidth = _this._getWidth(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSelect.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSelect.prototype, "required", {
        /** Whether the component is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    MdSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._changeSubscription = this.options.changes.startWith(null).subscribe(function () {
            _this._resetOptions();
            if (_this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(function () { return _this._setSelectionByValue(_this._control.value); });
            }
        });
    };
    MdSelect.prototype.ngOnDestroy = function () {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    };
    /** Toggles the overlay panel open or closed. */
    MdSelect.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    MdSelect.prototype.open = function () {
        if (this.disabled || !this.options.length) {
            return;
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._isRtl() ? 'floating-rtl' : 'floating-ltr';
        this._panelOpen = true;
    };
    /** Closes the overlay panel and focuses the host element. */
    MdSelect.prototype.close = function () {
        this._panelOpen = false;
        if (!this._selected) {
            this._placeholderState = '';
        }
        this._focusHost();
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    MdSelect.prototype.writeValue = function (value) {
        if (this.options) {
            this._setSelectionByValue(value);
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    MdSelect.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    MdSelect.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    MdSelect.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(MdSelect.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSelect.prototype, "selected", {
        /** The currently selected option. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    MdSelect.prototype._isRtl = function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /** The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    MdSelect.prototype._getWidth = function () {
        return this._getTriggerRect().width;
    };
    /** Ensures the panel opens if activated by the keyboard. */
    MdSelect.prototype._handleKeydown = function (event) {
        if (event.keyCode === __WEBPACK_IMPORTED_MODULE_2__core_keyboard_keycodes__["a" /* ENTER */] || event.keyCode === __WEBPACK_IMPORTED_MODULE_2__core_keyboard_keycodes__["b" /* SPACE */]) {
            this.open();
        }
    };
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     */
    MdSelect.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    MdSelect.prototype._onFadeInDone = function () {
        this._panelDoneAnimating = this.panelOpen;
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    MdSelect.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /** Returns the correct tabindex for the select depending on disabled state. */
    MdSelect.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     */
    MdSelect.prototype._setScrollTop = function () {
        var scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.mat-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    MdSelect.prototype._setSelectionByValue = function (value) {
        var options = this.options.toArray();
        for (var i = 0; i < this.options.length; i++) {
            if (options[i].value === value) {
                options[i].select();
                return;
            }
        }
        // Clear selection if no item was selected.
        this._clearSelection();
    };
    /** Clears the select trigger and deselects every option in the list. */
    MdSelect.prototype._clearSelection = function () {
        this._selected = null;
        this._updateOptions();
    };
    MdSelect.prototype._getTriggerRect = function () {
        return this.trigger.nativeElement.getBoundingClientRect();
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    MdSelect.prototype._initKeyManager = function () {
        var _this = this;
        this._keyManager = new __WEBPACK_IMPORTED_MODULE_3__core_a11y_focus_key_manager__["a" /* FocusKeyManager */](this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () {
            _this.close();
        });
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    MdSelect.prototype._resetOptions = function () {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
    };
    /** Listens to selection events on each option. */
    MdSelect.prototype._listenToOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            var sub = option.onSelect.subscribe(function (event) {
                if (event.isUserInput && _this._selected !== option) {
                    _this._emitChangeEvent(option);
                }
                _this._onSelect(option);
            });
            _this._subscriptions.push(sub);
        });
    };
    /** Unsubscribes from all option subscriptions. */
    MdSelect.prototype._dropSubscriptions = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._subscriptions = [];
    };
    /** Emits an event when the user selects an option. */
    MdSelect.prototype._emitChangeEvent = function (option) {
        this._onChange(option.value);
        this.change.emit(new MdSelectChange(this, option.value));
    };
    /** Records option IDs to pass to the aria-owns property. */
    MdSelect.prototype._setOptionIds = function () {
        this._optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /** When a new option is selected, deselects the others and closes the panel. */
    MdSelect.prototype._onSelect = function (option) {
        this._selected = option;
        this._updateOptions();
        this._setValueWidth();
        this._placeholderState = '';
        if (this.panelOpen) {
            this.close();
        }
    };
    /** Deselect each option that doesn't match the current selection. */
    MdSelect.prototype._updateOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            if (option !== _this.selected) {
                option.deselect();
            }
        });
    };
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     */
    MdSelect.prototype._setValueWidth = function () {
        this._selectedValueWidth = this._triggerWidth - 13;
    };
    /** Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    MdSelect.prototype._focusCorrectOption = function () {
        if (this.selected) {
            this._keyManager.setActiveItem(this._getOptionIndex(this.selected));
        }
        else {
            this._keyManager.setFirstItemActive();
        }
    };
    /** Focuses the host element when the panel closes. */
    MdSelect.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    /** Gets the index of the provided option in the option list. */
    MdSelect.prototype._getOptionIndex = function (option) {
        return this.options.reduce(function (result, current, index) {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    MdSelect.prototype._calculateOverlayPosition = function () {
        this._offsetX = this._isRtl() ? SELECT_PANEL_PADDING_X : -SELECT_PANEL_PADDING_X;
        var panelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        var scrollContainerHeight = this.options.length * SELECT_OPTION_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        var maxScroll = scrollContainerHeight - panelHeight;
        if (this.selected) {
            var selectedIndex = this._getOptionIndex(this.selected);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            var scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffset(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_OPTION_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    MdSelect.prototype._calculateOverlayScroll = function (selectedIndex, scrollBuffer, maxScroll) {
        var optionOffsetFromScrollTop = SELECT_OPTION_HEIGHT * selectedIndex;
        var halfOptionHeight = SELECT_OPTION_HEIGHT / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    MdSelect.prototype._calculateOverlayOffset = function (selectedIndex, scrollBuffer, maxScroll) {
        var optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_OPTION_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            var firstDisplayedIndex = this.options.length - SELECT_MAX_OPTIONS_DISPLAYED;
            var selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_OPTION_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_OPTION_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    MdSelect.prototype._checkOverlayWithinViewport = function (maxScroll) {
        var viewportRect = this._viewportRuler.getViewportRect();
        var triggerRect = this._getTriggerRect();
        var topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        var bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        var panelHeightTop = Math.abs(this._offsetY);
        var totalPanelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        var panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    };
    /** Adjusts the overlay panel up to fit in the viewport. */
    MdSelect.prototype._adjustPanelUp = function (panelHeightBottom, bottomSpaceAvailable) {
        var distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = "50% bottom 0px";
        }
    };
    /** Adjusts the overlay panel down to fit in the viewport. */
    MdSelect.prototype._adjustPanelDown = function (panelHeightTop, topSpaceAvailable, maxScroll) {
        var distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = "50% top 0px";
            return;
        }
    };
    /** Sets the transform origin point based on the selected option. */
    MdSelect.prototype._getOriginBasedOnOption = function () {
        var originY = Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_OPTION_HEIGHT / 2;
        return "50% " + originY + "px 0px";
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('trigger'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdSelect.prototype, "trigger", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8__core_overlay_overlay_directives__["b" /* ConnectedOverlayDirective */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_8__core_overlay_overlay_directives__["b" /* ConnectedOverlayDirective */])
    ], MdSelect.prototype, "overlayDir", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__core_option_option__["b" /* MdOption */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdSelect.prototype, "options", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "placeholder", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "required", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdSelect.prototype, "onOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdSelect.prototype, "onClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdSelect.prototype, "change", void 0);
    MdSelect = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-select, mat-select',
            template: "<div class=\"mat-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger><span class=\"mat-select-placeholder\" [class.mat-floating-placeholder]=\"this.selected\" [@transformPlaceholder]=\"_placeholderState\" [style.width.px]=\"_selectedValueWidth\">{{ placeholder }} </span><span class=\"mat-select-value\" *ngIf=\"selected\"><span class=\"mat-select-value-text\">{{ selected?.viewValue }}</span> </span><span class=\"mat-select-arrow\"></span> <span class=\"mat-select-underline\"></span></div><template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" [offsetX]=\"_offsetX\" (attach)=\"_setScrollTop()\"><div class=\"mat-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.mat-select-panel-done-animating]=\"_panelDoneAnimating\"><div class=\"mat-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"><ng-content></ng-content></div></div></template>",
            styles: [".mat-select{display:inline-block;outline:0;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{display:flex;align-items:center;height:30px;min-width:112px;cursor:pointer;position:relative;box-sizing:border-box;font-size:16px}[aria-disabled=true] .mat-select-trigger{cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mat-select-underline{position:absolute;bottom:0;left:0;right:0;height:1px}[aria-disabled=true] .mat-select-underline{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-color:transparent;background-position:0 bottom}.mat-select-placeholder{position:relative;padding:0 2px;transform-origin:left top;flex-grow:1}.mat-select-placeholder.mat-floating-placeholder{top:-22px;left:-2px;text-align:left;transform:scale(.75)}[dir=rtl] .mat-select-placeholder{transform-origin:right top}[dir=rtl] .mat-select-placeholder.mat-floating-placeholder{left:2px;text-align:right}[aria-required=true] .mat-select-placeholder::after{content:'*'}.mat-select-value{position:absolute;max-width:calc(100% - 18px);flex-grow:1;top:0;left:0;bottom:0;display:flex;align-items:center}[dir=rtl] .mat-select-value{left:auto;right:0}.mat-select-value-text{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;line-height:30px}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px}@media screen and (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            host: {
                'role': 'listbox',
                '[attr.tabindex]': '_getTabIndex()',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '[attr.aria-owns]': '_optionIds',
                '[class.mat-select-disabled]': 'disabled',
                '[class.mat-select]': 'true',
                '(keydown)': '_handleKeydown($event)',
                '(blur)': '_onBlur()'
            },
            animations: [
                __WEBPACK_IMPORTED_MODULE_5__select_animations__["a" /* transformPlaceholder */],
                __WEBPACK_IMPORTED_MODULE_5__select_animations__["b" /* transformPanel */],
                __WEBPACK_IMPORTED_MODULE_5__select_animations__["c" /* fadeInContent */]
            ],
            exportAs: 'mdSelect',
        }),
        __param(4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"])()),
        __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_9__core_overlay_position_viewport_ruler__["a" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__["a" /* Dir */], __WEBPACK_IMPORTED_MODULE_6__angular_forms__["NgControl"]])
    ], MdSelect);
    return MdSelect;
}());
/** Clamps a value n between min and max values. */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}
//# sourceMappingURL=select.js.map

/***/ }),
/* 314 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidenav__ = __webpack_require__(372);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__sidenav__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 315 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slide_toggle__ = __webpack_require__(373);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__slide_toggle__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 316 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(374);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__slider__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 317 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__snack_bar__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__snack_bar_container__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__simple_snack_bar__ = __webpack_require__(263);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__snack_bar_config__ = __webpack_require__(318);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__snack_bar_ref__ = __webpack_require__(319);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSnackBarModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MdSnackBarModule = (function () {
    function MdSnackBarModule() {
    }
    /** @deprecated */
    MdSnackBarModule.forRoot = function () {
        return {
            ngModule: MdSnackBarModule,
            providers: []
        };
    };
    MdSnackBarModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["d" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_1__core__["o" /* PortalModule */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_4__snack_bar_container__["a" /* MdSnackBarContainer */], __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__snack_bar_container__["a" /* MdSnackBarContainer */], __WEBPACK_IMPORTED_MODULE_5__simple_snack_bar__["a" /* SimpleSnackBar */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_4__snack_bar_container__["a" /* MdSnackBarContainer */], __WEBPACK_IMPORTED_MODULE_5__simple_snack_bar__["a" /* SimpleSnackBar */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__snack_bar__["a" /* MdSnackBar */], __WEBPACK_IMPORTED_MODULE_1__core__["p" /* LIVE_ANNOUNCER_PROVIDER */]]
        }), 
        __metadata('design:paramtypes', [])
    ], MdSnackBarModule);
    return MdSnackBarModule;
}());





//# sourceMappingURL=index.js.map

/***/ }),
/* 318 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSnackBarConfig; });
/**
 * Configuration used when opening a snack-bar.
 */
var MdSnackBarConfig = (function () {
    function MdSnackBarConfig() {
        /** The politeness level for the MdAriaLiveAnnouncer announcement. */
        this.politeness = 'assertive';
        /** Message to be announced by the MdAriaLiveAnnouncer */
        this.announcementMessage = '';
        /** The view container to place the overlay for the snack bar into. */
        this.viewContainerRef = null;
        /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
        this.duration = 0;
    }
    return MdSnackBarConfig;
}());
//# sourceMappingURL=snack-bar-config.js.map

/***/ }),
/* 319 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSnackBarRef; });

// TODO(josephperrott): Implement onAction observable.
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
var MdSnackBarRef = (function () {
    function MdSnackBarRef(instance, containerInstance, _overlayRef) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the snack bar has closed. */
        this._afterClosed = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        /** Subject for notifying the user that the snack bar action was called. */
        this._onAction = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        // Sets the readonly instance of the snack bar content component.
        this._instance = instance;
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(function () { return _this.dismiss(); });
        containerInstance._onExit().subscribe(function () { return _this._finishDismiss(); });
    }
    Object.defineProperty(MdSnackBarRef.prototype, "instance", {
        /** The instance of the component making up the content of the snack bar. */
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /** Dismisses the snack bar. */
    MdSnackBarRef.prototype.dismiss = function () {
        if (!this._afterClosed.closed) {
            this.containerInstance.exit();
        }
    };
    /** Marks the snackbar action clicked. */
    MdSnackBarRef.prototype._action = function () {
        if (!this._onAction.closed) {
            this._onAction.next();
            this._onAction.complete();
        }
    };
    /** Marks the snackbar as opened */
    MdSnackBarRef.prototype._open = function () {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    };
    /** Cleans up the DOM after closing. */
    MdSnackBarRef.prototype._finishDismiss = function () {
        this._overlayRef.dispose();
        this._afterClosed.next();
        this._afterClosed.complete();
    };
    /** Gets an observable that is notified when the snack bar is finished closing. */
    MdSnackBarRef.prototype.afterDismissed = function () {
        return this._afterClosed.asObservable();
    };
    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    MdSnackBarRef.prototype.afterOpened = function () {
        return this.containerInstance._onEnter();
    };
    /** Gets an observable that is notified when the snack bar action is called. */
    MdSnackBarRef.prototype.onAction = function () {
        return this._onAction.asObservable();
    };
    return MdSnackBarRef;
}());
//# sourceMappingURL=snack-bar-ref.js.map

/***/ }),
/* 320 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snack_bar_config__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__snack_bar_ref__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__snack_bar_container__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__simple_snack_bar__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_util_object_extend__ = __webpack_require__(291);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSnackBar; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







/**
 * Service to dispatch Material Design snack bar messages.
 */
var MdSnackBar = (function () {
    function MdSnackBar(_overlay, _live, _parentSnackBar) {
        this._overlay = _overlay;
        this._live = _live;
        this._parentSnackBar = _parentSnackBar;
    }
    Object.defineProperty(MdSnackBar.prototype, "_openedSnackBarRef", {
        /** Reference to the currently opened snackbar at *any* level. */
        get: function () {
            return this._parentSnackBar ?
                this._parentSnackBar._openedSnackBarRef : this._snackBarRefAtThisLevel;
        },
        set: function (value) {
            if (this._parentSnackBar) {
                this._parentSnackBar._openedSnackBarRef = value;
            }
            else {
                this._snackBarRefAtThisLevel = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @param component Component to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    MdSnackBar.prototype.openFromComponent = function (component, config) {
        var _this = this;
        config = _applyConfigDefaults(config);
        var overlayRef = this._createOverlay();
        var snackBarContainer = this._attachSnackBarContainer(overlayRef, config);
        var snackBarRef = this._attachSnackbarContent(component, snackBarContainer, overlayRef);
        // When the snackbar is dismissed, clear the reference to it.
        snackBarRef.afterDismissed().subscribe(function () {
            // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
            if (_this._openedSnackBarRef == snackBarRef) {
                _this._openedSnackBarRef = null;
            }
        });
        // If a snack bar is already in view, dismiss it and enter the new snack bar after exit
        // animation is complete.
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.afterDismissed().subscribe(function () {
                snackBarRef.containerInstance.enter();
            });
            this._openedSnackBarRef.dismiss();
        }
        else {
            snackBarRef.containerInstance.enter();
        }
        // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
        if (config.duration > 0) {
            snackBarRef.afterOpened().subscribe(function () {
                setTimeout(function () { return snackBarRef.dismiss(); }, config.duration);
            });
        }
        this._live.announce(config.announcementMessage, config.politeness);
        this._openedSnackBarRef = snackBarRef;
        return this._openedSnackBarRef;
    };
    /**
     * Opens a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
    MdSnackBar.prototype.open = function (message, action, config) {
        if (action === void 0) { action = ''; }
        if (config === void 0) { config = {}; }
        config.announcementMessage = message;
        var simpleSnackBarRef = this.openFromComponent(__WEBPACK_IMPORTED_MODULE_5__simple_snack_bar__["a" /* SimpleSnackBar */], config);
        simpleSnackBarRef.instance.snackBarRef = simpleSnackBarRef;
        simpleSnackBarRef.instance.message = message;
        simpleSnackBarRef.instance.action = action;
        return simpleSnackBarRef;
    };
    /**
     * Attaches the snack bar container component to the overlay.
     */
    MdSnackBar.prototype._attachSnackBarContainer = function (overlayRef, config) {
        var containerPortal = new __WEBPACK_IMPORTED_MODULE_1__core__["a" /* ComponentPortal */](__WEBPACK_IMPORTED_MODULE_4__snack_bar_container__["a" /* MdSnackBarContainer */], config.viewContainerRef);
        var containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    };
    /**
     * Places a new component as the content of the snack bar container.
     */
    MdSnackBar.prototype._attachSnackbarContent = function (component, container, overlayRef) {
        var portal = new __WEBPACK_IMPORTED_MODULE_1__core__["a" /* ComponentPortal */](component);
        var contentRef = container.attachComponentPortal(portal);
        return new __WEBPACK_IMPORTED_MODULE_3__snack_bar_ref__["a" /* MdSnackBarRef */](contentRef.instance, container, overlayRef);
    };
    /**
     * Creates a new overlay and places it in the correct location.
     */
    MdSnackBar.prototype._createOverlay = function () {
        var state = new __WEBPACK_IMPORTED_MODULE_1__core__["b" /* OverlayState */]();
        state.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .bottom('0');
        return this._overlay.create(state);
    };
    MdSnackBar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__core__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_1__core__["q" /* LiveAnnouncer */], MdSnackBar])
    ], MdSnackBar);
    return MdSnackBar;
}());
/**
 * Applies default options to the snackbar config.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__core_util_object_extend__["a" /* extendObject */])(new __WEBPACK_IMPORTED_MODULE_2__snack_bar_config__["a" /* MdSnackBarConfig */](), config);
}
//# sourceMappingURL=snack-bar.js.map

/***/ }),
/* 321 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_group__ = __webpack_require__(376);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tab_group__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ink_bar__ = __webpack_require__(244);
/* unused harmony reexport MdInkBar */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_body__ = __webpack_require__(322);
/* unused harmony reexport MdTabBody */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_header__ = __webpack_require__(323);
/* unused harmony reexport MdTabHeader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tab_label_wrapper__ = __webpack_require__(265);
/* unused harmony reexport MdTabLabelWrapper */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tab__ = __webpack_require__(325);
/* unused harmony reexport MdTab */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tab_label__ = __webpack_require__(266);
/* unused harmony reexport MdTabLabel */







//# sourceMappingURL=index.js.map

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTabBody; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/**
 * Wrapper for the contents of a tab.
 */
var MdTabBody = (function () {
    function MdTabBody(_dir, _elementRef, _changeDetectorRef) {
        this._dir = _dir;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this.onCentering = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the tab completes its animation towards the center. */
        this.onCentered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        /** Whether the element is allowed to be animated. */
        this._canBeAnimated = false;
    }
    Object.defineProperty(MdTabBody.prototype, "position", {
        set: function (position) {
            if (position < 0) {
                this._position = this._getLayoutDirection() == 'ltr' ? 'left' : 'right';
            }
            else if (position > 0) {
                this._position = this._getLayoutDirection() == 'ltr' ? 'right' : 'left';
            }
            else {
                this._position = 'center';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabBody.prototype, "origin", {
        /** The origin position from which this tab should appear when it is centered into view. */
        set: function (origin) {
            if (origin == null) {
                return;
            }
            var dir = this._getLayoutDirection();
            if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
                this._origin = 'left';
            }
            else {
                this._origin = 'right';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    MdTabBody.prototype.ngOnInit = function () {
        if (this._position == 'center' && this._origin) {
            this._position = this._origin == 'left' ? 'left-origin-center' : 'right-origin-center';
        }
    };
    /**
     * After the view has been set, check if the tab content is set to the center and attach the
     * content if it is not already attached.
     */
    MdTabBody.prototype.ngAfterViewChecked = function () {
        if (this._isCenterPosition(this._position) && !this._portalHost.hasAttached()) {
            this._portalHost.attach(this._content);
        }
    };
    /**
     * After the content has been checked, determines whether the element should be allowed to
     * animate. This has to be limited, because under a specific set of circumstances (see #2151),
     * the animations can be triggered too early, which either crashes Chrome by putting it into an
     * infinite loop (with Angular < 2.3.0) or throws an error because the element doesn't have a
     * computed style (with Angular > 2.3.0). This can alternatively be determined by checking the
     * transform: canBeAnimated = getComputedStyle(element) !== '', however document.contains should
     * be faster since it doesn't cause a reflow.
     *
     * TODO: This can safely be removed after we stop supporting Angular < 2.4.2. The fix landed via
     * https://github.com/angular/angular/commit/21030e9a1cf30e8101399d8535ed72d847a23ba6
     */
    MdTabBody.prototype.ngAfterContentChecked = function () {
        if (!this._canBeAnimated) {
            this._canBeAnimated = document.body.contains(this._elementRef.nativeElement);
            if (this._canBeAnimated) {
                this._changeDetectorRef.markForCheck();
            }
        }
    };
    MdTabBody.prototype._onTranslateTabStarted = function (e) {
        if (this._isCenterPosition(e.toState)) {
            this.onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    };
    MdTabBody.prototype._onTranslateTabComplete = function (e) {
        // If the end state is that the tab is not centered, then detach the content.
        if (!this._isCenterPosition(e.toState) && !this._isCenterPosition(this._position)) {
            this._portalHost.detach();
        }
        // If the transition to the center is complete, emit an event.
        if (this._isCenterPosition(e.toState) && this._isCenterPosition(this._position)) {
            this.onCentered.emit();
        }
    };
    /** The text direction of the containing app. */
    MdTabBody.prototype._getLayoutDirection = function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    MdTabBody.prototype._isCenterPosition = function (position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__core__["l" /* PortalHostDirective */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__core__["l" /* PortalHostDirective */])
    ], MdTabBody.prototype, "_portalHost", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdTabBody.prototype, "onCentering", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdTabBody.prototype, "onCentered", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('content'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__core__["m" /* TemplatePortal */])
    ], MdTabBody.prototype, "_content", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('position'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabBody.prototype, "position", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('origin'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabBody.prototype, "origin", null);
    MdTabBody = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-tab-body, mat-tab-body',
            template: "<div class=\"mat-tab-body-content\" #content [@translateTab]=\"_canBeAnimated ? _position : null\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"><template cdkPortalHost></template></div>",
            host: {
                '[class.mat-tab-body]': 'true',
            },
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('translateTab', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('left', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(-100%, 0, 0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('left-origin-center', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0, 0, 0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('right-origin-center', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0, 0, 0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('center', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0, 0, 0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('right', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(100%, 0, 0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => left, * => right, left => center, right => center', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => left-origin-center', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(-100%, 0, 0)' }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                    ]),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => right-origin-center', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(100%, 0, 0)' }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                    ])
                ])
            ]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__core__["k" /* Dir */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], MdTabBody);
    return MdTabBody;
}());
//# sourceMappingURL=tab-body.js.map

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_label_wrapper__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ink_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_style_apply_transform__ = __webpack_require__(288);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTabHeader; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
var EXAGGERATED_OVERSCROLL = 60;
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 */
var MdTabHeader = (function () {
    function MdTabHeader(_zone, _elementRef, _dir) {
        this._zone = _zone;
        this._elementRef = _elementRef;
        this._dir = _dir;
        /** The tab index that is focused. */
        this._focusIndex = 0;
        /** The distance in pixels that the tab labels should be translated to the left. */
        this._scrollDistance = 0;
        /** Whether the header should scroll to the selected index after the view has been checked. */
        this._selectedIndexChanged = false;
        /** Whether the controls for pagination should be displayed */
        this._showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        this._disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        this._disableScrollBefore = true;
        this._selectedIndex = 0;
        /** Event emitted when the option is selected. */
        this.selectFocusedIndex = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when a label is focused. */
        this.indexFocused = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(MdTabHeader.prototype, "selectedIndex", {
        get: function () { return this._selectedIndex; },
        /** The index of the active tab. */
        set: function (value) {
            this._selectedIndexChanged = this._selectedIndex != value;
            this._selectedIndex = value;
            this._focusIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    MdTabHeader.prototype.ngAfterContentChecked = function () {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this._tabLabelCount != this._labelWrappers.length) {
            this._updatePagination();
            this._tabLabelCount = this._labelWrappers.length;
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            this._checkScrollingControls();
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this._scrollDistanceChanged) {
            this._updateTabScrollPosition();
            this._scrollDistanceChanged = false;
        }
    };
    MdTabHeader.prototype._handleKeydown = function (event) {
        switch (event.keyCode) {
            case __WEBPACK_IMPORTED_MODULE_1__core__["h" /* RIGHT_ARROW */]:
                this._focusNextTab();
                break;
            case __WEBPACK_IMPORTED_MODULE_1__core__["i" /* LEFT_ARROW */]:
                this._focusPreviousTab();
                break;
            case __WEBPACK_IMPORTED_MODULE_1__core__["j" /* ENTER */]:
                this.selectFocusedIndex.emit(this.focusIndex);
                break;
        }
    };
    /**
     * Aligns the ink bar to the selected tab on load.
     */
    MdTabHeader.prototype.ngAfterContentInit = function () {
        this._alignInkBarToSelectedTab();
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    MdTabHeader.prototype._onContentChanges = function () {
        this._updatePagination();
        this._alignInkBarToSelectedTab();
    };
    /**
     * Updating the view whether pagination should be enabled or not
     */
    MdTabHeader.prototype._updatePagination = function () {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    };
    Object.defineProperty(MdTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () { return this._focusIndex; },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            if (!this._isValidIndex(value) || this._focusIndex == value) {
                return;
            }
            this._focusIndex = value;
            this.indexFocused.emit(value);
            this._setTabFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    MdTabHeader.prototype._isValidIndex = function (index) {
        if (!this._labelWrappers) {
            return true;
        }
        var tab = this._labelWrappers ? this._labelWrappers.toArray()[index] : null;
        return tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    MdTabHeader.prototype._setTabFocus = function (tabIndex) {
        if (this._showPaginationControls) {
            this._scrollToLabel(tabIndex);
        }
        if (this._labelWrappers && this._labelWrappers.length) {
            this._labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            var containerEl = this._tabListContainer.nativeElement;
            var dir = this._getLayoutDirection();
            if (dir == 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /**
     * Moves the focus towards the beginning or the end of the list depending on the offset provided.
     * Valid offsets are 1 and -1.
     */
    MdTabHeader.prototype._moveFocus = function (offset) {
        if (this._labelWrappers) {
            var tabs = this._labelWrappers.toArray();
            for (var i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
                if (this._isValidIndex(i)) {
                    this.focusIndex = i;
                    return;
                }
            }
        }
    };
    /** Increment the focus index by 1 until a valid tab is found. */
    MdTabHeader.prototype._focusNextTab = function () {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? 1 : -1);
    };
    /** Decrement the focus index by 1 until a valid tab is found. */
    MdTabHeader.prototype._focusPreviousTab = function () {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? -1 : 1);
    };
    /** The layout direction of the containing app. */
    MdTabHeader.prototype._getLayoutDirection = function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    MdTabHeader.prototype._updateTabScrollPosition = function () {
        var translateX = this.scrollDistance + 'px';
        if (this._getLayoutDirection() == 'ltr') {
            translateX = '-' + translateX;
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__core_style_apply_transform__["a" /* applyCssTransform */])(this._tabList.nativeElement, "translate3d(" + translateX + ", 0, 0)");
    };
    Object.defineProperty(MdTabHeader.prototype, "scrollDistance", {
        get: function () { return this._scrollDistance; },
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        set: function (v) {
            this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this._scrollDistanceChanged = true;
            this._checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    MdTabHeader.prototype._scrollHeader = function (scrollDir) {
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance += (scrollDir == 'before' ? -1 : 1) * viewLength / 3;
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    MdTabHeader.prototype._scrollToLabel = function (labelIndex) {
        var selectedLabel = this._labelWrappers
            ? this._labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        var labelBeforePos, labelAfterPos;
        if (this._getLayoutDirection() == 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        var beforeVisiblePos = this.scrollDistance;
        var afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    MdTabHeader.prototype._checkPaginationEnabled = function () {
        this._showPaginationControls =
            this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
        if (!this._showPaginationControls) {
            this.scrollDistance = 0;
        }
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    MdTabHeader.prototype._checkScrollingControls = function () {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance == 0;
        this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    MdTabHeader.prototype._getMaxScrollDistance = function () {
        var lengthOfTabList = this._tabList.nativeElement.scrollWidth;
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength;
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    MdTabHeader.prototype._alignInkBarToSelectedTab = function () {
        var _this = this;
        var selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length
            ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
            : null;
        this._zone.runOutsideAngular(function () {
            requestAnimationFrame(function () {
                _this._inkBar.alignToElement(selectedLabelWrapper);
            });
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_2__tab_label_wrapper__["a" /* MdTabLabelWrapper */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdTabHeader.prototype, "_labelWrappers", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__ink_bar__["a" /* MdInkBar */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_3__ink_bar__["a" /* MdInkBar */])
    ], MdTabHeader.prototype, "_inkBar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tabListContainer'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdTabHeader.prototype, "_tabListContainer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tabList'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdTabHeader.prototype, "_tabList", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabHeader.prototype, "selectedIndex", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdTabHeader.prototype, "selectFocusedIndex", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdTabHeader.prototype, "indexFocused", void 0);
    MdTabHeader = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-tab-header, mat-tab-header',
            template: "<div class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\" aria-hidden=\"true\" md-ripple [mdRippleDisabled]=\"_disableScrollBefore\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_scrollHeader('before')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div><div class=\"mat-tab-label-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div class=\"mat-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-tab-labels\"><ng-content></ng-content></div><md-ink-bar></md-ink-bar></div></div><div class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\" aria-hidden=\"true\" md-ripple [mdRippleDisabled]=\"_disableScrollAfter\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\" (click)=\"_scrollHeader('after')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div>",
            styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{line-height:48px;height:48px;padding:0 12px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;cursor:pointer;box-sizing:border-box;color:currentColor;opacity:.6;min-width:160px;text-align:center;position:relative}.mat-tab-label:focus{outline:0;opacity:1}@media (max-width:600px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination,.mat-tab-labels{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:#ccc}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            host: {
                'class': 'mat-tab-header',
                '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
            }
        }),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__core__["k" /* Dir */]])
    ], MdTabHeader);
    return MdTabHeader;
}());
//# sourceMappingURL=tab-header.js.map

/***/ }),
/* 324 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ink_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_ripple_ripple__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_overlay_position_viewport_ruler__ = __webpack_require__(231);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTabNavBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdTabLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdTabLinkRipple; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
var MdTabNavBar = (function () {
    function MdTabNavBar() {
    }
    /** Notifies the component that the active link has been changed. */
    MdTabNavBar.prototype.updateActiveLink = function (element) {
        this._activeLinkChanged = this._activeLinkElement != element;
        this._activeLinkElement = element;
    };
    /** Checks if the active link has been changed and, if so, will update the ink bar. */
    MdTabNavBar.prototype.ngAfterContentChecked = function () {
        if (this._activeLinkChanged) {
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
            this._activeLinkChanged = false;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__ink_bar__["a" /* MdInkBar */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__ink_bar__["a" /* MdInkBar */])
    ], MdTabNavBar.prototype, "_inkBar", void 0);
    MdTabNavBar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: '[md-tab-nav-bar], [mat-tab-nav-bar]',
            template: "<div class=\"mat-tab-links\"><ng-content></ng-content></div><md-ink-bar></md-ink-bar>",
            styles: [".mat-tab-link,.mat-tab-nav-bar{position:relative;overflow:hidden}.mat-tab-nav-bar{flex-shrink:0}.mat-tab-links{display:flex;position:relative}.mat-tab-link{line-height:48px;height:48px;padding:0 12px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;cursor:pointer;box-sizing:border-box;color:currentColor;opacity:.6;min-width:160px;text-align:center;text-decoration:none}.mat-tab-link:focus{outline:0;opacity:1}@media (max-width:600px){.mat-tab-link{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}"],
            host: {
                '[class.mat-tab-nav-bar]': 'true',
            },
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }), 
        __metadata('design:paramtypes', [])
    ], MdTabNavBar);
    return MdTabNavBar;
}());
/**
 * Link inside of a `md-tab-nav-bar`.
 */
var MdTabLink = (function () {
    function MdTabLink(_mdTabNavBar, _elementRef) {
        this._mdTabNavBar = _mdTabNavBar;
        this._elementRef = _elementRef;
        this._isActive = false;
    }
    Object.defineProperty(MdTabLink.prototype, "active", {
        /** Whether the link is active. */
        get: function () { return this._isActive; },
        set: function (value) {
            this._isActive = value;
            if (value) {
                this._mdTabNavBar.updateActiveLink(this._elementRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdTabLink.prototype, "active", null);
    MdTabLink = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-tab-link], [mat-tab-link]',
            host: {
                '[class.mat-tab-link]': 'true',
            }
        }), 
        __metadata('design:paramtypes', [MdTabNavBar, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdTabLink);
    return MdTabLink;
}());
/**
 * Simple directive that extends the ripple and matches the selector of the MdTabLink. This
 * adds the ripple behavior to nav bar labels.
 */
var MdTabLinkRipple = (function (_super) {
    __extends(MdTabLinkRipple, _super);
    function MdTabLinkRipple(elementRef, ngZone, ruler) {
        _super.call(this, elementRef, ngZone, ruler);
    }
    MdTabLinkRipple = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-tab-link], [mat-tab-link]',
            host: {
                '[class.mat-tab-link]': 'true',
            },
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_3__core_overlay_position_viewport_ruler__["a" /* ViewportRuler */]])
    ], MdTabLinkRipple);
    return MdTabLinkRipple;
}(__WEBPACK_IMPORTED_MODULE_2__core_ripple_ripple__["b" /* MdRipple */]));
//# sourceMappingURL=tab-nav-bar.js.map

/***/ }),
/* 325 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_portal_portal__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_label__ = __webpack_require__(266);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTab; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MdTab = (function () {
    function MdTab(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        /** The plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        /** The portal that will be the hosted content of the tab */
        this._contentPortal = null;
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        this.origin = null;
        this._disabled = false;
    }
    Object.defineProperty(MdTab.prototype, "content", {
        get: function () { return this._contentPortal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTab.prototype, "disabled", {
        get: function () { return this._disabled; },
        /** Whether the tab is disabled */
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    MdTab.prototype.ngOnInit = function () {
        this._contentPortal = new __WEBPACK_IMPORTED_MODULE_0__core_portal_portal__["b" /* TemplatePortal */](this._content, this._viewContainerRef);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ContentChild"])(__WEBPACK_IMPORTED_MODULE_3__tab_label__["a" /* MdTabLabel */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_3__tab_label__["a" /* MdTabLabel */])
    ], MdTab.prototype, "templateLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
    ], MdTab.prototype, "_content", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('label'), 
        __metadata('design:type', String)
    ], MdTab.prototype, "textLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], MdTab.prototype, "disabled", null);
    MdTab = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({selector: 'md-tab, mat-tab',
            template: "<template><ng-content></ng-content></template>",
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]])
    ], MdTab);
    return MdTab;
}());
//# sourceMappingURL=tab.js.map

/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar__ = __webpack_require__(378);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__toolbar__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 327 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tooltip__ = __webpack_require__(380);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tooltip__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 328 */,
/* 329 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttackPatternsComponent; });


var AttackPatternsComponent = (function () {
    function AttackPatternsComponent() {
        console.log('Initial AttackPatternsComponent');
    }
    AttackPatternsComponent.prototype.ngOnInit = function () {
        console.log('Initial AttackPatternsComponent');
    };
    AttackPatternsComponent.prototype.download = function () {
        alert('download clicked');
    };
    return AttackPatternsComponent;
}());
AttackPatternsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'attack-patterns',
        styles: [__webpack_require__(427)],
        template: __webpack_require__(416)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], AttackPatternsComponent);



/***/ }),
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(412);

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(504);

/***/ }),
/* 341 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(227);
/* unused harmony export MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR */
/* unused harmony export MdButtonToggleChange */
/* unused harmony export MdButtonToggleGroup */
/* unused harmony export MdButtonToggleGroupMultiple */
/* unused harmony export MdButtonToggle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdButtonToggleModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




/**
 * Provider Expression that allows md-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
var MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdButtonToggleGroup; }),
    multi: true
};
var _uniqueIdCounter = 0;
/** Change event object emitted by MdButtonToggle. */
var MdButtonToggleChange = (function () {
    function MdButtonToggleChange() {
    }
    return MdButtonToggleChange;
}());
/** Exclusive selection button toggle group that behaves like a radio-button group. */
var MdButtonToggleGroup = (function () {
    function MdButtonToggleGroup() {
        /** The value for the button toggle group. Should match currently selected button toggle. */
        this._value = null;
        /** The HTML name attribute applied to toggles in this group. */
        this._name = "md-button-toggle-group-" + _uniqueIdCounter++;
        /** Disables all toggles in the group. */
        this._disabled = null;
        /** Whether the button toggle group should be vertical. */
        this._vertical = false;
        /** The currently selected button toggle, should match the value. */
        this._selected = null;
        /** Whether the button toggle group is initialized or not. */
        this._isInitialized = false;
        /**
         * The method to be called in order to update ngModel.
         * Now `ngModel` binding is not supported in multiple selection mode.
         */
        this._controlValueAccessorChangeFn = function (value) { };
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = function () { };
        /** Event emitted when the group's value changes. */
        this._change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Child button toggle buttons. */
        this._buttonToggles = null;
    }
    Object.defineProperty(MdButtonToggleGroup.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    MdButtonToggleGroup.prototype.ngAfterViewInit = function () {
        this._isInitialized = true;
    };
    Object.defineProperty(MdButtonToggleGroup.prototype, "name", {
        /** `name` attribute for the underlying `input` element. */
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this._updateButtonToggleNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggleGroup.prototype, "disabled", {
        /** Whether the toggle group is disabled. */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggleGroup.prototype, "vertical", {
        /** Whether the toggle group is vertical. */
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggleGroup.prototype, "value", {
        /** Value of the toggle group. */
        get: function () {
            return this._value;
        },
        set: function (newValue) {
            if (this._value != newValue) {
                this._value = newValue;
                this._updateSelectedButtonToggleFromValue();
                // Only emit a change event if the view is completely initialized.
                // We don't want to emit a change event for the initial values.
                if (this._isInitialized) {
                    this._emitChangeEvent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggleGroup.prototype, "selected", {
        /** Whether the toggle group is selected. */
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            if (selected && !selected.checked) {
                selected.checked = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    MdButtonToggleGroup.prototype._updateButtonToggleNames = function () {
        var _this = this;
        if (this._buttonToggles) {
            this._buttonToggles.forEach(function (toggle) {
                toggle.name = _this._name;
            });
        }
    };
    // TODO: Refactor into shared code with radio.
    MdButtonToggleGroup.prototype._updateSelectedButtonToggleFromValue = function () {
        var _this = this;
        var isAlreadySelected = this._selected != null && this._selected.value == this._value;
        if (this._buttonToggles != null && !isAlreadySelected) {
            var matchingButtonToggle = this._buttonToggles.filter(function (buttonToggle) { return buttonToggle.value == _this._value; })[0];
            if (matchingButtonToggle) {
                this.selected = matchingButtonToggle;
            }
            else if (this.value == null) {
                this.selected = null;
                this._buttonToggles.forEach(function (buttonToggle) {
                    buttonToggle.checked = false;
                });
            }
        }
    };
    /** Dispatch change event with current selection and group value. */
    MdButtonToggleGroup.prototype._emitChangeEvent = function () {
        var event = new MdButtonToggleChange();
        event.source = this._selected;
        event.value = this._value;
        this._controlValueAccessorChangeFn(event.value);
        this._change.emit(event);
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    MdButtonToggleGroup.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    MdButtonToggleGroup.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    MdButtonToggleGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    MdButtonToggleGroup.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], MdButtonToggleGroup.prototype, "change", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdButtonToggle; })), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdButtonToggleGroup.prototype, "_buttonToggles", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdButtonToggleGroup.prototype, "name", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdButtonToggleGroup.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdButtonToggleGroup.prototype, "vertical", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdButtonToggleGroup.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdButtonToggleGroup.prototype, "selected", null);
    MdButtonToggleGroup = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-button-toggle-group:not([multiple]), mat-button-toggle-group:not([multiple])',
            providers: [MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
            host: {
                '[class.mat-button-toggle-group]': 'true',
                'role': 'radiogroup',
                '[class.mat-button-toggle-vertical]': 'vertical'
            },
            exportAs: 'mdButtonToggleGroup',
        }), 
        __metadata('design:paramtypes', [])
    ], MdButtonToggleGroup);
    return MdButtonToggleGroup;
}());
/** Multiple selection button-toggle group. `ngModel` is not supported in this mode. */
var MdButtonToggleGroupMultiple = (function () {
    function MdButtonToggleGroupMultiple() {
        /** Disables all toggles in the group. */
        this._disabled = null;
        /** Whether the button toggle group should be vertical. */
        this._vertical = false;
    }
    Object.defineProperty(MdButtonToggleGroupMultiple.prototype, "disabled", {
        /** Whether the toggle group is disabled. */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = (value != null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggleGroupMultiple.prototype, "vertical", {
        /** Whether the toggle group is vertical. */
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdButtonToggleGroupMultiple.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdButtonToggleGroupMultiple.prototype, "vertical", null);
    MdButtonToggleGroupMultiple = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-button-toggle-group[multiple], mat-button-toggle-group[multiple]',
            exportAs: 'mdButtonToggleGroup',
            host: {
                '[class.mat-button-toggle-group]': 'true',
                '[class.mat-button-toggle-vertical]': 'vertical'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdButtonToggleGroupMultiple);
    return MdButtonToggleGroupMultiple;
}());
/** Single button inside of a toggle group. */
var MdButtonToggle = (function () {
    function MdButtonToggle(toggleGroup, toggleGroupMultiple, buttonToggleDispatcher, _renderer) {
        var _this = this;
        this.buttonToggleDispatcher = buttonToggleDispatcher;
        this._renderer = _renderer;
        /** Whether or not this button toggle is checked. */
        this._checked = false;
        /** Whether or not this button toggle is disabled. */
        this._disabled = null;
        /** Value assigned to this button toggle. */
        this._value = null;
        /** Whether or not the button toggle is a single selection. */
        this._isSingleSelector = null;
        /** Event emitted when the group value changes. */
        this._change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.buttonToggleGroup = toggleGroup;
        this.buttonToggleGroupMultiple = toggleGroupMultiple;
        if (this.buttonToggleGroup) {
            buttonToggleDispatcher.listen(function (id, name) {
                if (id != _this.id && name == _this.name) {
                    _this.checked = false;
                }
            });
            this._type = 'radio';
            this.name = this.buttonToggleGroup.name;
            this._isSingleSelector = true;
        }
        else {
            // Even if there is no group at all, treat the button toggle as a checkbox so it can be
            // toggled on or off.
            this._type = 'checkbox';
            this._isSingleSelector = false;
        }
    }
    Object.defineProperty(MdButtonToggle.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    MdButtonToggle.prototype.ngOnInit = function () {
        if (this.id == null) {
            this.id = "md-button-toggle-" + _uniqueIdCounter++;
        }
        if (this.buttonToggleGroup && this._value == this.buttonToggleGroup.value) {
            this._checked = true;
        }
    };
    Object.defineProperty(MdButtonToggle.prototype, "inputId", {
        /** Unique ID for the underlying `input` element. */
        get: function () {
            return this.id + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggle.prototype, "checked", {
        /** Whether the button is checked. */
        get: function () {
            return this._checked;
        },
        set: function (newCheckedState) {
            if (this._isSingleSelector) {
                if (newCheckedState) {
                    // Notify all button toggles with the same name (in the same group) to un-check.
                    this.buttonToggleDispatcher.notify(this.id, this.name);
                }
            }
            this._checked = newCheckedState;
            if (newCheckedState && this._isSingleSelector && this.buttonToggleGroup.value != this.value) {
                this.buttonToggleGroup.selected = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButtonToggle.prototype, "value", {
        /** MdButtonToggleGroup reads this to assign its own value. */
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value != value) {
                if (this.buttonToggleGroup != null && this.checked) {
                    this.buttonToggleGroup.value = value;
                }
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Dispatch change event with current value. */
    MdButtonToggle.prototype._emitChangeEvent = function () {
        var event = new MdButtonToggleChange();
        event.source = this;
        event.value = this._value;
        this._change.emit(event);
    };
    Object.defineProperty(MdButtonToggle.prototype, "disabled", {
        /** Whether the button is disabled. */
        get: function () {
            return this._disabled || (this.buttonToggleGroup != null && this.buttonToggleGroup.disabled) ||
                (this.buttonToggleGroupMultiple != null && this.buttonToggleGroupMultiple.disabled);
        },
        set: function (value) {
            this._disabled = (value != null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    /** Toggle the state of the current button toggle. */
    MdButtonToggle.prototype._toggle = function () {
        this.checked = !this.checked;
    };
    /** Checks the button toggle due to an interaction with the underlying native input. */
    MdButtonToggle.prototype._onInputChange = function (event) {
        event.stopPropagation();
        if (this._isSingleSelector) {
            // Propagate the change one-way via the group, which will in turn mark this
            // button toggle as checked.
            this.checked = true;
            this.buttonToggleGroup.selected = this;
            this.buttonToggleGroup.onTouched();
        }
        else {
            this._toggle();
        }
        // Emit a change event when the native input does.
        this._emitChangeEvent();
    };
    MdButtonToggle.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /** Focuses the button. */
    MdButtonToggle.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])(),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdButtonToggle.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdButtonToggle.prototype, "name", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], MdButtonToggle.prototype, "change", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdButtonToggle.prototype, "_inputElement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.mat-button-toggle-checked'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdButtonToggle.prototype, "checked", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdButtonToggle.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.mat-button-toggle-disabled'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdButtonToggle.prototype, "disabled", null);
    MdButtonToggle = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-button-toggle, mat-button-toggle',
            template: "<label [attr.for]=\"inputId\" class=\"mat-button-toggle-label\"><input #input class=\"mat-button-toggle-input cdk-visually-hidden\" [type]=\"_type\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"><div class=\"mat-button-toggle-label-content\"><ng-content></ng-content></div></label>",
            styles: [".mat-button-toggle-group{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);position:relative;display:inline-flex;flex-direction:row;border-radius:2px;cursor:pointer;white-space:nowrap}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle-disabled .mat-button-toggle-label-content{cursor:default}.mat-button-toggle{white-space:nowrap;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-button-toggle-label-content{display:inline-block;line-height:36px;padding:0 16px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mat-button-toggle-label-content>*{vertical-align:middle}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            host: {
                '[class.mat-button-toggle]': 'true'
            }
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [MdButtonToggleGroup, MdButtonToggleGroupMultiple, __WEBPACK_IMPORTED_MODULE_3__core__["v" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdButtonToggle);
    return MdButtonToggle;
}());
var MdButtonToggleModule = (function () {
    function MdButtonToggleModule() {
    }
    /** @deprecated */
    MdButtonToggleModule.forRoot = function () {
        return {
            ngModule: MdButtonToggleModule,
            providers: []
        };
    };
    MdButtonToggleModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            exports: [
                MdButtonToggleGroup,
                MdButtonToggleGroupMultiple,
                MdButtonToggle,
                __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */],
            ],
            declarations: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
            providers: [__WEBPACK_IMPORTED_MODULE_3__core__["x" /* UNIQUE_SELECTION_DISPATCHER_PROVIDER */]]
        }), 
        __metadata('design:paramtypes', [])
    ], MdButtonToggleModule);
    return MdButtonToggleModule;
}());
//# sourceMappingURL=button-toggle.js.map

/***/ }),
/* 342 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* unused harmony export MdButtonCssMatStyler */
/* unused harmony export MdRaisedButtonCssMatStyler */
/* unused harmony export MdIconButtonCssMatStyler */
/* unused harmony export MdFabCssMatStyler */
/* unused harmony export MdMiniFabCssMatStyler */
/* unused harmony export MdButton */
/* unused harmony export MdAnchor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdButtonModule; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// TODO(jelbourn): Make the `isMouseDown` stuff done with one global listener.
// TODO(kara): Convert attribute selectors to classes when attr maps become available
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdButtonCssMatStyler = (function () {
    function MdButtonCssMatStyler() {
    }
    MdButtonCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'button[md-button], button[mat-button], a[md-button], a[mat-button]',
            host: {
                '[class.mat-button]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdButtonCssMatStyler);
    return MdButtonCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdRaisedButtonCssMatStyler = (function () {
    function MdRaisedButtonCssMatStyler() {
    }
    MdRaisedButtonCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'button[md-raised-button], button[mat-raised-button], ' +
                'a[md-raised-button], a[mat-raised-button]',
            host: {
                '[class.mat-raised-button]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdRaisedButtonCssMatStyler);
    return MdRaisedButtonCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdIconButtonCssMatStyler = (function () {
    function MdIconButtonCssMatStyler() {
    }
    MdIconButtonCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'button[md-icon-button], button[mat-icon-button], a[md-icon-button], a[mat-icon-button]',
            host: {
                '[class.mat-icon-button]': 'true',
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconButtonCssMatStyler);
    return MdIconButtonCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdFabCssMatStyler = (function () {
    function MdFabCssMatStyler() {
    }
    MdFabCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'button[md-fab], button[mat-fab], a[md-fab], a[mat-fab]',
            host: {
                '[class.mat-fab]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdFabCssMatStyler);
    return MdFabCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdMiniFabCssMatStyler = (function () {
    function MdMiniFabCssMatStyler() {
    }
    MdMiniFabCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'button[md-mini-fab], button[mat-mini-fab], a[md-mini-fab], a[mat-mini-fab]',
            host: {
                '[class.mat-mini-fab]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdMiniFabCssMatStyler);
    return MdMiniFabCssMatStyler;
}());
/**
 * Material design button.
 */
var MdButton = (function () {
    function MdButton(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Whether the button has focus from the keyboard (not the mouse). Used for class binding. */
        this._isKeyboardFocused = false;
        /** Whether a mousedown has occurred on this element in the last 100ms. */
        this._isMouseDown = false;
        /** Whether the ripple effect on click should be disabled. */
        this._disableRipple = false;
        this._disabled = null;
    }
    Object.defineProperty(MdButton.prototype, "disableRipple", {
        /** Whether the ripple effect for this button is disabled. */
        get: function () { return this._disableRipple; },
        set: function (v) { this._disableRipple = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["n" /* coerceBooleanProperty */])(v); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButton.prototype, "disabled", {
        /** Whether the button is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["n" /* coerceBooleanProperty */])(value) ? true : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdButton.prototype, "color", {
        /** The color of the button. Can be `primary`, `accent`, or `warn`. */
        get: function () { return this._color; },
        set: function (value) { this._updateColor(value); },
        enumerable: true,
        configurable: true
    });
    MdButton.prototype._setMousedown = function () {
        var _this = this;
        // We only *show* the focus style when focus has come to the button via the keyboard.
        // The Material Design spec is silent on this topic, and without doing this, the
        // button continues to look :active after clicking.
        // @see http://marcysutton.com/button-focus-hell/
        this._isMouseDown = true;
        setTimeout(function () { _this._isMouseDown = false; }, 100);
    };
    MdButton.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdButton.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._getHostElement(), "mat-" + color, isAdd);
        }
    };
    MdButton.prototype._setKeyboardFocus = function () {
        this._isKeyboardFocused = !this._isMouseDown;
    };
    MdButton.prototype._removeKeyboardFocus = function () {
        this._isKeyboardFocused = false;
    };
    /** Focuses the button. */
    MdButton.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    MdButton.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    MdButton.prototype._isRoundButton = function () {
        var el = this._getHostElement();
        return el.hasAttribute('md-icon-button') ||
            el.hasAttribute('md-fab') ||
            el.hasAttribute('md-mini-fab');
    };
    MdButton.prototype._isRippleDisabled = function () {
        return this.disableRipple || this.disabled;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdButton.prototype, "disableRipple", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdButton.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdButton.prototype, "color", null);
    MdButton = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'button[md-button], button[md-raised-button], button[md-icon-button],' +
                'button[md-fab], button[md-mini-fab],' +
                'button[mat-button], button[mat-raised-button], button[mat-icon-button],' +
                'button[mat-fab], button[mat-mini-fab]',
            host: {
                '[disabled]': 'disabled',
                '[class.mat-button-focus]': '_isKeyboardFocused',
                '(mousedown)': '_setMousedown()',
                '(focus)': '_setKeyboardFocus()',
                '(blur)': '_removeKeyboardFocus()',
            },
            template: "<span class=\"mat-button-wrapper\"><ng-content></ng-content></span><div md-ripple *ngIf=\"!_isRippleDisabled()\" class=\"mat-button-ripple\" [class.mat-button-ripple-round]=\"_isRoundButton()\" [mdRippleTrigger]=\"_getHostElement()\"></div><div class=\"mat-button-focus-overlay\" (touchstart)=\"$event.preventDefault()\"></div>",
            styles: [".mat-button-focus.mat-button .mat-button-focus-overlay,.mat-button-focus.mat-fab .mat-button-focus-overlay,.mat-button-focus.mat-icon-button .mat-button-focus-overlay,.mat-button-focus.mat-mini-fab .mat-button-focus-overlay,.mat-button-focus.mat-raised-button .mat-button-focus-overlay,.mat-button:hover .mat-button-focus-overlay,.mat-icon-button:hover .mat-button-focus-overlay{opacity:1}.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{box-sizing:border-box;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;text-align:center;margin:0;min-width:88px;line-height:36px;padding:0 16px;border-radius:2px}[disabled].mat-button,[disabled].mat-fab,[disabled].mat-icon-button,[disabled].mat-mini-fab,[disabled].mat-raised-button{cursor:default}.mat-fab,.mat-mini-fab,.mat-raised-button{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-fab:not([disabled]):active,.mat-mini-fab:not([disabled]):active,.mat-raised-button:not([disabled]):active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}[disabled].mat-fab,[disabled].mat-mini-fab,[disabled].mat-raised-button{box-shadow:none}.mat-button[disabled]:hover .mat-button-focus-overlay,.mat-button[disabled]:hover.mat-accent,.mat-button[disabled]:hover.mat-primary,.mat-button[disabled]:hover.mat-warn,.mat-icon-button[disabled]:hover .mat-button-focus-overlay,.mat-icon-button[disabled]:hover.mat-accent,.mat-icon-button[disabled]:hover.mat-primary,.mat-icon-button[disabled]:hover.mat-warn{background-color:transparent}.mat-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-icon-button,.mat-mini-fab{min-width:0;width:40px;height:40px;border-radius:50%}.mat-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-fab .mat-icon,.mat-fab i{padding:16px 0;line-height:24px}.mat-mini-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);padding:0;flex-shrink:0}.mat-mini-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-mini-fab .mat-icon,.mat-mini-fab i{padding:8px 0;line-height:24px}.mat-icon-button{padding:0;flex-shrink:0;line-height:40px}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button,.mat-icon-button,.mat-raised-button{color:currentColor}.mat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*{vertical-align:middle}.mat-button-focus-overlay,.mat-button-ripple{position:absolute;top:0;left:0;bottom:0;right:0}.mat-button-focus-overlay{background-color:rgba(0,0,0,.12);border-radius:inherit;pointer-events:none;opacity:0}.mat-button-ripple-round{border-radius:50%;z-index:1}@media screen and (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:rgba(255,255,255,.5)}.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdButton);
    return MdButton;
}());
/**
 * Raised Material design button.
 */
var MdAnchor = (function (_super) {
    __extends(MdAnchor, _super);
    function MdAnchor(elementRef, renderer) {
        _super.call(this, elementRef, renderer);
    }
    Object.defineProperty(MdAnchor.prototype, "tabIndex", {
        /** @docs-private */
        get: function () {
            return this.disabled ? -1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAnchor.prototype, "_isAriaDisabled", {
        get: function () {
            return this.disabled ? 'true' : 'false';
        },
        enumerable: true,
        configurable: true
    });
    MdAnchor.prototype._haltDisabledEvents = function (event) {
        // A disabled button shouldn't apply any actions
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('tabIndex'), 
        __metadata('design:type', Number)
    ], MdAnchor.prototype, "tabIndex", null);
    MdAnchor = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: "a[md-button], a[md-raised-button], a[md-icon-button], a[md-fab], a[md-mini-fab],\n             a[mat-button], a[mat-raised-button], a[mat-icon-button], a[mat-fab], a[mat-mini-fab]",
            host: {
                '[attr.disabled]': 'disabled',
                '[attr.aria-disabled]': '_isAriaDisabled',
                '[class.mat-button-focus]': '_isKeyboardFocused',
                '(mousedown)': '_setMousedown()',
                '(focus)': '_setKeyboardFocus()',
                '(blur)': '_removeKeyboardFocus()',
                '(click)': '_haltDisabledEvents($event)',
            },
            template: "<span class=\"mat-button-wrapper\"><ng-content></ng-content></span><div md-ripple *ngIf=\"!_isRippleDisabled()\" class=\"mat-button-ripple\" [class.mat-button-ripple-round]=\"_isRoundButton()\" [mdRippleTrigger]=\"_getHostElement()\"></div><div class=\"mat-button-focus-overlay\" (touchstart)=\"$event.preventDefault()\"></div>",
            styles: [".mat-button-focus.mat-button .mat-button-focus-overlay,.mat-button-focus.mat-fab .mat-button-focus-overlay,.mat-button-focus.mat-icon-button .mat-button-focus-overlay,.mat-button-focus.mat-mini-fab .mat-button-focus-overlay,.mat-button-focus.mat-raised-button .mat-button-focus-overlay,.mat-button:hover .mat-button-focus-overlay,.mat-icon-button:hover .mat-button-focus-overlay{opacity:1}.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{box-sizing:border-box;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;text-align:center;margin:0;min-width:88px;line-height:36px;padding:0 16px;border-radius:2px}[disabled].mat-button,[disabled].mat-fab,[disabled].mat-icon-button,[disabled].mat-mini-fab,[disabled].mat-raised-button{cursor:default}.mat-fab,.mat-mini-fab,.mat-raised-button{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-fab:not([disabled]):active,.mat-mini-fab:not([disabled]):active,.mat-raised-button:not([disabled]):active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}[disabled].mat-fab,[disabled].mat-mini-fab,[disabled].mat-raised-button{box-shadow:none}.mat-button[disabled]:hover .mat-button-focus-overlay,.mat-button[disabled]:hover.mat-accent,.mat-button[disabled]:hover.mat-primary,.mat-button[disabled]:hover.mat-warn,.mat-icon-button[disabled]:hover .mat-button-focus-overlay,.mat-icon-button[disabled]:hover.mat-accent,.mat-icon-button[disabled]:hover.mat-primary,.mat-icon-button[disabled]:hover.mat-warn{background-color:transparent}.mat-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-icon-button,.mat-mini-fab{min-width:0;width:40px;height:40px;border-radius:50%}.mat-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-fab .mat-icon,.mat-fab i{padding:16px 0;line-height:24px}.mat-mini-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);padding:0;flex-shrink:0}.mat-mini-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-mini-fab .mat-icon,.mat-mini-fab i{padding:8px 0;line-height:24px}.mat-icon-button{padding:0;flex-shrink:0;line-height:40px}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button,.mat-icon-button,.mat-raised-button{color:currentColor}.mat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*{vertical-align:middle}.mat-button-focus-overlay,.mat-button-ripple{position:absolute;top:0;left:0;bottom:0;right:0}.mat-button-focus-overlay{background-color:rgba(0,0,0,.12);border-radius:inherit;pointer-events:none;opacity:0}.mat-button-ripple-round{border-radius:50%;z-index:1}@media screen and (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:rgba(255,255,255,.5)}.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdAnchor);
    return MdAnchor;
}(MdButton));
var MdButtonModule = (function () {
    function MdButtonModule() {
    }
    /** @deprecated */
    MdButtonModule.forRoot = function () {
        return {
            ngModule: MdButtonModule,
            providers: []
        };
    };
    MdButtonModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__core__["w" /* MdRippleModule */], __WEBPACK_IMPORTED_MODULE_2__core__["e" /* CompatibilityModule */]],
            exports: [
                MdButton, MdAnchor,
                __WEBPACK_IMPORTED_MODULE_2__core__["e" /* CompatibilityModule */],
                MdButtonCssMatStyler,
                MdRaisedButtonCssMatStyler,
                MdIconButtonCssMatStyler,
                MdFabCssMatStyler,
                MdMiniFabCssMatStyler
            ],
            declarations: [
                MdButton,
                MdAnchor,
                MdButtonCssMatStyler,
                MdRaisedButtonCssMatStyler,
                MdIconButtonCssMatStyler,
                MdFabCssMatStyler,
                MdMiniFabCssMatStyler
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdButtonModule);
    return MdButtonModule;
}());
//# sourceMappingURL=button.js.map

/***/ }),
/* 343 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* unused harmony export MdCardContent */
/* unused harmony export MdCardTitle */
/* unused harmony export MdCardSubtitle */
/* unused harmony export MdCardActions */
/* unused harmony export MdCardFooter */
/* unused harmony export MdCardSmImage */
/* unused harmony export MdCardMdImage */
/* unused harmony export MdCardLgImage */
/* unused harmony export MdCardImage */
/* unused harmony export MdCardXlImage */
/* unused harmony export MdCardAvatar */
/* unused harmony export MdCard */
/* unused harmony export MdCardHeader */
/* unused harmony export MdCardTitleGroup */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdCardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Content of a card, needed as it's used as a selector in the API.
 */
var MdCardContent = (function () {
    function MdCardContent() {
    }
    MdCardContent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-content, mat-card-content',
            host: {
                '[class.mat-card-content]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardContent);
    return MdCardContent;
}());
/**
 * Title of a card, needed as it's used as a selector in the API.
 */
var MdCardTitle = (function () {
    function MdCardTitle() {
    }
    MdCardTitle = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-title, mat-card-title',
            host: {
                '[class.mat-card-title]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardTitle);
    return MdCardTitle;
}());
/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 */
var MdCardSubtitle = (function () {
    function MdCardSubtitle() {
    }
    MdCardSubtitle = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-subtitle, mat-card-subtitle',
            host: {
                '[class.mat-card-subtitle]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardSubtitle);
    return MdCardSubtitle;
}());
/**
 * Action section of a card, needed as it's used as a selector in the API.
 */
var MdCardActions = (function () {
    function MdCardActions() {
    }
    MdCardActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-actions, mat-card-actions',
            host: {
                '[class.mat-card-actions]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardActions);
    return MdCardActions;
}());
/**
 * Footer of a card, needed as it's used as a selector in the API.
 */
var MdCardFooter = (function () {
    function MdCardFooter() {
    }
    MdCardFooter = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-footer, mat-card-footer',
            host: {
                '[class.mat-card-footer]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardFooter);
    return MdCardFooter;
}());
/**
 * Image used in a card, needed to add the mat- CSS styling.
 */
var MdCardSmImage = (function () {
    function MdCardSmImage() {
    }
    MdCardSmImage = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-card-sm-image], [mat-card-sm-image]',
            host: {
                '[class.mat-card-sm-image]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardSmImage);
    return MdCardSmImage;
}());
/**
 * Image used in a card, needed to add the mat- CSS styling.
 */
var MdCardMdImage = (function () {
    function MdCardMdImage() {
    }
    MdCardMdImage = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-card-md-image], [mat-card-md-image]',
            host: {
                '[class.mat-card-md-image]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardMdImage);
    return MdCardMdImage;
}());
/**
 * Image used in a card, needed to add the mat- CSS styling.
 */
var MdCardLgImage = (function () {
    function MdCardLgImage() {
    }
    MdCardLgImage = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-card-lg-image], [mat-card-lg-image]',
            host: {
                'class.mat-card-lg-image': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardLgImage);
    return MdCardLgImage;
}());
/**
 * Image used in a card, needed to add the mat- CSS styling.
 */
var MdCardImage = (function () {
    function MdCardImage() {
    }
    MdCardImage = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-card-image], [mat-card-image]',
            host: {
                '[class.mat-card-image]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardImage);
    return MdCardImage;
}());
/**
 * Large image used in a card, needed to add the mat- CSS styling.
 */
var MdCardXlImage = (function () {
    function MdCardXlImage() {
    }
    MdCardXlImage = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-xl-image, mat-card-xl-image',
            host: {
                '[class.mat-card-xl-image]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardXlImage);
    return MdCardXlImage;
}());
/**
 * Avatar image used in a card, needed to add the mat- CSS styling.
 */
var MdCardAvatar = (function () {
    function MdCardAvatar() {
    }
    MdCardAvatar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-card-avatar, mat-card-avatar',
            host: {
                '[class.mat-card-avatar]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardAvatar);
    return MdCardAvatar;
}());
/**
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - md-card-title
 * - md-card-subtitle
 * - md-card-content
 * - md-card-actions
 * - md-card-footer
 */
var MdCard = (function () {
    function MdCard() {
    }
    MdCard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-card, mat-card',
            template: "<ng-content></ng-content>",
            styles: [".mat-card{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);will-change:box-shadow;display:block;position:relative;padding:24px;border-radius:2px;font-family:Roboto,\"Helvetica Neue\",sans-serif}@media screen and (-ms-high-contrast:active){.mat-card{outline:solid 1px}}.mat-card-flat{box-shadow:none}.mat-card-actions,.mat-card-content,.mat-card-subtitle,.mat-card-title{display:block;margin-bottom:16px}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-card-actions{margin-left:-16px;margin-right:-16px;padding:8px 0}.mat-card-actions[align=end]{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 48px);margin:0 -24px 16px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-footer{position:absolute;width:100%;min-height:5px;bottom:0;left:0}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button{margin:0 4px}.mat-card-header{display:flex;flex-direction:row;height:40px;margin:-8px 0 16px}.mat-card-header-text{height:40px;margin:0 8px}.mat-card-avatar{height:40px;width:40px;border-radius:50%}.mat-card-lg-image,.mat-card-md-image,.mat-card-sm-image{margin:-8px 0}.mat-card-title-group{display:flex;justify-content:space-between;margin:0 -8px}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}@media (max-width:600px){.mat-card{padding:24px 16px}.mat-card-actions{margin-left:-8px;margin-right:-8px}.mat-card-image{width:calc(100% + 32px);margin:16px -16px}.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}.mat-card-header{margin:-8px 0 0}}.mat-card-content>:first-child,.mat-card>:first-child{margin-top:0}.mat-card-content>:last-child,.mat-card>:last-child{margin-bottom:0}.mat-card-image:first-child{margin-top:-24px}.mat-card>.mat-card-actions:last-child{margin-bottom:-16px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child{margin-left:0;margin-right:0}.mat-card-subtitle:not(:first-child),.mat-card-title:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child),.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
            host: {
                '[class.mat-card]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCard);
    return MdCard;
}());
/**
 * Component intended to be used within the `<md-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 */
var MdCardHeader = (function () {
    function MdCardHeader() {
    }
    MdCardHeader = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-card-header, mat-card-header',
            template: "<ng-content select=\"[md-card-avatar], [mat-card-avatar]\"></ng-content><div class=\"mat-card-header-text\"><ng-content select=\"md-card-title, mat-card-title, md-card-subtitle, mat-card-subtitle\"></ng-content></div><ng-content></ng-content>",
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
            host: {
                '[class.mat-card-header]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardHeader);
    return MdCardHeader;
}());
/**
 * Component intended to be used within the <md-card> component. It adds styles for a preset
 * layout that groups an image with a title section.
 */
var MdCardTitleGroup = (function () {
    function MdCardTitleGroup() {
    }
    MdCardTitleGroup = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-card-title-group, mat-card-title-group',
            template: "<div><ng-content select=\"md-card-title, mat-card-title, md-card-subtitle, mat-card-subtitle\"></ng-content></div><ng-content select=\"img\"></ng-content><ng-content></ng-content>",
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
            host: {
                '[class.mat-card-title-group]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardTitleGroup);
    return MdCardTitleGroup;
}());
var MdCardModule = (function () {
    function MdCardModule() {
    }
    /** @deprecated */
    MdCardModule.forRoot = function () {
        return {
            ngModule: MdCardModule,
            providers: []
        };
    };
    MdCardModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            exports: [
                MdCard,
                MdCardHeader,
                MdCardTitleGroup,
                MdCardContent,
                MdCardTitle,
                MdCardSubtitle,
                MdCardActions,
                MdCardFooter,
                MdCardSmImage,
                MdCardMdImage,
                MdCardLgImage,
                MdCardImage,
                MdCardXlImage,
                MdCardAvatar,
                __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */],
            ],
            declarations: [
                MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
                MdCardActions, MdCardFooter, MdCardSmImage, MdCardMdImage, MdCardLgImage, MdCardImage,
                MdCardXlImage, MdCardAvatar,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardModule);
    return MdCardModule;
}());
//# sourceMappingURL=card.js.map

/***/ }),
/* 344 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(227);
/* unused harmony export MD_CHECKBOX_CONTROL_VALUE_ACCESSOR */
/* unused harmony export TransitionCheckState */
/* unused harmony export MdCheckboxChange */
/* unused harmony export MdCheckbox */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdCheckboxModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/** Monotonically increasing integer used to auto-generate unique ids for checkbox components. */
var nextId = 0;
/**
 * Provider Expression that allows md-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
var MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdCheckbox; }),
    multi: true
};
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
var TransitionCheckState;
(function (TransitionCheckState) {
    /** The initial state of the component before any user interaction. */
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    /** The state representing the component when it's becoming checked. */
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    /** The state representing the component when it's becoming unchecked. */
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    /** The state representing the component when it's becoming indeterminate. */
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
/** Change event object emitted by MdCheckbox. */
var MdCheckboxChange = (function () {
    function MdCheckboxChange() {
    }
    return MdCheckboxChange;
}());
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A MdCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://www.google.com/design/spec/components/selection-controls.html
 */
var MdCheckbox = (function () {
    function MdCheckbox(_renderer, _elementRef, _changeDetectorRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
        this.id = "md-checkbox-" + ++nextId;
        /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
        this.labelPosition = 'after';
        this._disabled = false;
        /** Tabindex value that is passed to the underlying input element. */
        this.tabIndex = 0;
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * @docs-private
         */
        this.onTouched = function () { };
        this._currentAnimationClass = '';
        this._currentCheckState = TransitionCheckState.Init;
        this._checked = false;
        this._indeterminate = false;
        this._controlValueAccessorChangeFn = function (value) { };
        this._hasFocus = false;
        this.color = 'accent';
    }
    Object.defineProperty(MdCheckbox.prototype, "disableRipple", {
        /** Whether the ripple effect for this checkbox is disabled. */
        get: function () { return this._disableRipple; },
        set: function (value) { this._disableRipple = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "inputId", {
        /** ID of the native input element inside `<md-checkbox>` */
        get: function () {
            return "input-" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "required", {
        /** Whether the checkbox is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "align", {
        /**
         * Whether or not the checkbox should appear before or after the label.
         * @deprecated
         */
        get: function () {
            // align refers to the checkbox relative to the label, while labelPosition refers to the
            // label relative to the checkbox. As such, they are inverted.
            return this.labelPosition == 'after' ? 'start' : 'end';
        },
        set: function (v) {
            this.labelPosition = (v == 'start') ? 'after' : 'before';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "disabled", {
        /** Whether the checkbox is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "checked", {
        /**
         * Whether the checkbox is checked. Note that setting `checked` will immediately set
         * `indeterminate` to false.
         */
        get: function () {
            return this._checked;
        },
        set: function (checked) {
            if (checked != this.checked) {
                if (this._indeterminate) {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                }
                this._checked = checked;
                this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
         * false. This differs from the web platform in that indeterminate state on native
         * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
         * `checked` property programmatically). However, we feel that this behavior is more accommodating
         * to the way consumers would envision using this component.
         */
        get: function () {
            return this._indeterminate;
        },
        set: function (indeterminate) {
            var changed = indeterminate != this._indeterminate;
            this._indeterminate = indeterminate;
            if (this._indeterminate) {
                this._transitionCheckState(TransitionCheckState.Indeterminate);
            }
            else {
                this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
            if (changed) {
                this.indeterminateChange.emit(this._indeterminate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "color", {
        /** The color of the button. Can be `primary`, `accent`, or `warn`. */
        get: function () { return this._color; },
        set: function (value) { this._updateColor(value); },
        enumerable: true,
        configurable: true
    });
    MdCheckbox.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdCheckbox.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    MdCheckbox.prototype._isRippleDisabled = function () {
        return this.disableRipple || this.disabled;
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    MdCheckbox.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Function to be called on change.
     */
    MdCheckbox.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be triggered when the checkbox is touched.
     */
    MdCheckbox.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the checkbox's disabled state. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the checkbox should be disabled.
     */
    MdCheckbox.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    MdCheckbox.prototype._transitionCheckState = function (newState) {
        var oldState = this._currentCheckState;
        var renderer = this._renderer;
        var elementRef = this._elementRef;
        if (oldState === newState) {
            return;
        }
        if (this._currentAnimationClass.length > 0) {
            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, false);
        }
        this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
        this._currentCheckState = newState;
        if (this._currentAnimationClass.length > 0) {
            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, true);
        }
    };
    MdCheckbox.prototype._emitChangeEvent = function () {
        var event = new MdCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    };
    /** Informs the component when the input has focus so that we can style accordingly */
    MdCheckbox.prototype._onInputFocus = function () {
        this._hasFocus = true;
    };
    /** Informs the component when we lose focus in order to style accordingly */
    MdCheckbox.prototype._onInputBlur = function () {
        this._hasFocus = false;
        this.onTouched();
    };
    /** Toggles the `checked` state of the checkbox. */
    MdCheckbox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * @param event
     */
    MdCheckbox.prototype._onInteractionEvent = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        if (!this.disabled) {
            this.toggle();
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
    };
    /** Focuses the checkbox. */
    MdCheckbox.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
        this._onInputFocus();
    };
    MdCheckbox.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    MdCheckbox.prototype._getAnimationClassForCheckStateTransition = function (oldState, newState) {
        var animSuffix;
        switch (oldState) {
            case TransitionCheckState.Init:
                // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
                // [checked] bound to it.
                if (newState === TransitionCheckState.Checked) {
                    animSuffix = 'unchecked-checked';
                }
                else {
                    return '';
                }
                break;
            case TransitionCheckState.Unchecked:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'unchecked-checked' : 'unchecked-indeterminate';
                break;
            case TransitionCheckState.Checked:
                animSuffix = newState === TransitionCheckState.Unchecked ?
                    'checked-unchecked' : 'checked-indeterminate';
                break;
            case TransitionCheckState.Indeterminate:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'indeterminate-checked' : 'indeterminate-unchecked';
        }
        return "mat-checkbox-anim-" + animSuffix;
    };
    MdCheckbox.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-label'), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "ariaLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-labelledby'), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "ariaLabelledby", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdCheckbox.prototype, "disableRipple", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdCheckbox.prototype, "required", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "align", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "labelPosition", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdCheckbox.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MdCheckbox.prototype, "tabIndex", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "name", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdCheckbox.prototype, "change", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdCheckbox.prototype, "indeterminateChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdCheckbox.prototype, "_inputElement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "checked", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "indeterminate", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "color", null);
    MdCheckbox = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-checkbox, mat-checkbox',
            template: "<label class=\"mat-checkbox-layout\"><div class=\"mat-checkbox-inner-container\"><input #input class=\"mat-checkbox-input cdk-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" [tabIndex]=\"tabIndex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (change)=\"_onInteractionEvent($event)\" (click)=\"_onInputClick($event)\"><div md-ripple *ngIf=\"!_isRippleDisabled()\" class=\"mat-checkbox-ripple\" [mdRippleTrigger]=\"_getHostElement()\" [mdRippleCentered]=\"true\" [mdRippleSpeedFactor]=\"0.3\"></div><div class=\"mat-checkbox-frame\"></div><div class=\"mat-checkbox-background\"><svg version=\"1.1\" class=\"mat-checkbox-checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" xml:space=\"preserve\"><path class=\"mat-checkbox-checkmark-path\" fill=\"none\" stroke=\"white\" d=\"M4.1,12.7 9,17.6 20.3,6.3\"/></svg><div class=\"mat-checkbox-mixedmark\"></div></div></div><span class=\"mat-checkbox-label\"><ng-content></ng-content></span></label>",
            styles: [".mat-checkbox-frame,.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.91026}50%{animation-timing-function:cubic-bezier(0,0,.2,.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0,0,0,1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(.4,0,1,1);stroke-dashoffset:0}to{stroke-dashoffset:-22.91026}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0,0,.2,.1);opacity:1;transform:rotate(0)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(.14,0,0,1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0,0,.2,.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(.14,0,0,1);opacity:1;transform:rotate(0)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}100%,32.8%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-checkmark,.mat-checkbox-frame{bottom:0;left:0;position:absolute;right:0;top:0}.mat-checkbox-checkmark,.mat-checkbox-mixedmark{width:calc(100% - 4px)}.mat-checkbox-background,.mat-checkbox-frame{border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{cursor:pointer;font-family:Roboto,\"Helvetica Neue\",sans-serif;transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex}.mat-checkbox-inner-container{display:inline-block;height:20px;line-height:0;margin:auto 8px auto auto;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:20px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-checkbox-frame{transition:border-color 90ms cubic-bezier(0,0,.2,.1);border-width:2px;border-style:solid}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0,0,.2,.1),opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-checkbox-checkmark{width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.91026;stroke-dasharray:22.91026;stroke-width:2.67px}.mat-checkbox-checked .mat-checkbox-checkmark-path,.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-mixedmark{height:2px;opacity:0;transform:scaleX(0) rotate(0)}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0)}.mat-checkbox-disabled{cursor:default}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0s mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0s mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0s mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0s mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0s mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0s mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0s mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0s mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:.5s linear 0s mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:.5s linear 0s mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0s mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:.3s linear 0s mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}.mat-checkbox-ripple{position:absolute;left:-15px;top:-15px;right:-15px;bottom:-15px;border-radius:50%;z-index:1;pointer-events:none}"],
            host: {
                '[class.mat-checkbox]': 'true',
                '[class.mat-checkbox-indeterminate]': 'indeterminate',
                '[class.mat-checkbox-checked]': 'checked',
                '[class.mat-checkbox-disabled]': 'disabled',
                '[class.mat-checkbox-label-before]': 'labelPosition == "before"',
                '[class.mat-checkbox-focused]': '_hasFocus',
            },
            providers: [MD_CHECKBOX_CONTROL_VALUE_ACCESSOR],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], MdCheckbox);
    return MdCheckbox;
}());
var MdCheckboxModule = (function () {
    function MdCheckboxModule() {
    }
    /** @deprecated */
    MdCheckboxModule.forRoot = function () {
        return {
            ngModule: MdCheckboxModule,
            providers: []
        };
    };
    MdCheckboxModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_4__core__["w" /* MdRippleModule */], __WEBPACK_IMPORTED_MODULE_4__core__["e" /* CompatibilityModule */]],
            exports: [MdCheckbox, __WEBPACK_IMPORTED_MODULE_4__core__["e" /* CompatibilityModule */]],
            declarations: [MdCheckbox],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCheckboxModule);
    return MdCheckboxModule;
}());
//# sourceMappingURL=checkbox.js.map

/***/ }),
/* 345 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chip__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_a11y_focus_key_manager__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_keyboard_keycodes__ = __webpack_require__(230);
/* unused harmony export MdChipList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdChipsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * A material design chips component (named ChipList for it's similarity to the List component).
 *
 * Example:
 *
 *     <md-chip-list>
 *       <md-chip>Chip 1<md-chip>
 *       <md-chip>Chip 2<md-chip>
 *     </md-chip-list>
 */
var MdChipList = (function () {
    function MdChipList(_elementRef) {
        this._elementRef = _elementRef;
        /** Track which chips we're listening to for focus/destruction. */
        this._subscribed = new WeakMap();
        /** Whether or not the chip is selectable. */
        this._selectable = true;
    }
    MdChipList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new __WEBPACK_IMPORTED_MODULE_2__core_a11y_focus_key_manager__["a" /* FocusKeyManager */](this.chips).withWrap();
        // Go ahead and subscribe all of the initial chips
        this._subscribeChips(this.chips);
        // When the list changes, re-subscribe
        this.chips.changes.subscribe(function (chips) {
            _this._subscribeChips(chips);
        });
    };
    Object.defineProperty(MdChipList.prototype, "selectable", {
        /**
         * Whether or not this chip is selectable. When a chip is not selectable,
         * it's selected state is always ignored.
         */
        get: function () {
            return this._selectable;
        },
        set: function (value) {
            this._selectable = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Programmatically focus the chip list. This in turn focuses the first
     * non-disabled chip in this chip list.
     */
    MdChipList.prototype.focus = function () {
        // TODO: ARIA says this should focus the first `selected` chip.
        this._keyManager.setFirstItemActive();
    };
    /** Passes relevant key presses to our key manager. */
    MdChipList.prototype._keydown = function (event) {
        var target = event.target;
        // If they are on a chip, check for space/left/right, otherwise pass to our key manager
        if (target && target.classList.contains('mat-chip')) {
            switch (event.keyCode) {
                case __WEBPACK_IMPORTED_MODULE_4__core_keyboard_keycodes__["b" /* SPACE */]:
                    // If we are selectable, toggle the focused chip
                    if (this.selectable) {
                        this._toggleSelectOnFocusedChip();
                    }
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__core_keyboard_keycodes__["d" /* LEFT_ARROW */]:
                    this._keyManager.setPreviousItemActive();
                    event.preventDefault();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__core_keyboard_keycodes__["c" /* RIGHT_ARROW */]:
                    this._keyManager.setNextItemActive();
                    event.preventDefault();
                    break;
                default:
                    this._keyManager.onKeydown(event);
            }
        }
    };
    /** Toggles the selected state of the currently focused chip. */
    MdChipList.prototype._toggleSelectOnFocusedChip = function () {
        // Allow disabling of chip selection
        if (!this.selectable) {
            return;
        }
        var focusedIndex = this._keyManager.activeItemIndex;
        if (this._isValidIndex(focusedIndex)) {
            var focusedChip = this.chips.toArray()[focusedIndex];
            if (focusedChip) {
                focusedChip.toggleSelected();
            }
        }
    };
    /**
     * Iterate through the list of chips and add them to our list of
     * subscribed chips.
     *
     * @param chips The list of chips to be subscribed.
     */
    MdChipList.prototype._subscribeChips = function (chips) {
        var _this = this;
        chips.forEach(function (chip) { return _this._addChip(chip); });
    };
    /**
     * Add a specific chip to our subscribed list. If the chip has
     * already been subscribed, this ensures it is only subscribed
     * once.
     *
     * @param chip The chip to be subscribed (or checked for existing
     * subscription).
     */
    MdChipList.prototype._addChip = function (chip) {
        var _this = this;
        // If we've already been subscribed to a parent, do nothing
        if (this._subscribed.has(chip)) {
            return;
        }
        // Watch for focus events outside of the keyboard navigation
        chip.onFocus.subscribe(function () {
            var chipIndex = _this.chips.toArray().indexOf(chip);
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveItemIndex(chipIndex);
            }
        });
        // On destroy, remove the item from our list, and check focus
        chip.destroy.subscribe(function () {
            var chipIndex = _this.chips.toArray().indexOf(chip);
            if (_this._isValidIndex(chipIndex)) {
                // Check whether the chip is the last item
                if (chipIndex < _this.chips.length - 1) {
                    _this._keyManager.setActiveItem(chipIndex);
                }
                else if (chipIndex - 1 >= 0) {
                    _this._keyManager.setActiveItem(chipIndex - 1);
                }
            }
            _this._subscribed.delete(chip);
            chip.destroy.unsubscribe();
        });
        this._subscribed.set(chip, true);
    };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    MdChipList.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.chips.length;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdChipList.prototype, "selectable", null);
    MdChipList = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-chip-list, mat-chip-list',
            template: "<div class=\"md-chip-list-wrapper\"><ng-content></ng-content></div>",
            host: {
                // Properties
                'tabindex': '0',
                'role': 'listbox',
                '[class.mat-chip-list]': 'true',
                // Events
                '(focus)': 'focus()',
                '(keydown)': '_keydown($event)'
            },
            queries: {
                chips: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"](__WEBPACK_IMPORTED_MODULE_1__chip__["a" /* MdChip */])
            },
            styles: [".mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:flex-start}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){margin:0 3px}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):first-child{margin-left:0;margin-right:3px}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child,[dir=rtl] .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):first-child{margin-left:3px;margin-right:0}[dir=rtl] .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-left:0;margin-right:3px}.mat-chip:not(.mat-basic-chip){display:inline-block;padding:8px 12px;border-radius:24px;font-size:13px;line-height:16px}.mat-chip-list-stacked .mat-chip-list-wrapper{display:block}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){display:block;margin:0 0 8px}[dir=rtl] .mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){margin:0 0 8px}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child,[dir=rtl] .mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-bottom:0}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdChipList);
    return MdChipList;
}());
var MdChipsModule = (function () {
    function MdChipsModule() {
    }
    /** @deprecated */
    MdChipsModule.forRoot = function () {
        return {
            ngModule: MdChipsModule,
            providers: []
        };
    };
    MdChipsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [],
            exports: [MdChipList, __WEBPACK_IMPORTED_MODULE_1__chip__["a" /* MdChip */]],
            declarations: [MdChipList, __WEBPACK_IMPORTED_MODULE_1__chip__["a" /* MdChip */]]
        }), 
        __metadata('design:paramtypes', [])
    ], MdChipsModule);
    return MdChipsModule;
}());
//# sourceMappingURL=chip-list.js.map

/***/ }),
/* 346 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_key_manager__ = __webpack_require__(276);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveDescendantKeyManager; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var ActiveDescendantKeyManager = (function (_super) {
    __extends(ActiveDescendantKeyManager, _super);
    function ActiveDescendantKeyManager(items) {
        _super.call(this, items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     */
    ActiveDescendantKeyManager.prototype.setActiveItem = function (index) {
        if (this.activeItem) {
            this.activeItem.setInactiveStyles();
        }
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.setActiveStyles();
        }
    };
    return ActiveDescendantKeyManager;
}(__WEBPACK_IMPORTED_MODULE_0__list_key_manager__["a" /* ListKeyManager */]));
//# sourceMappingURL=activedescendant-key-manager.js.map

/***/ }),
/* 347 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isFakeMousedownFromScreenReader;
/**
 * Screenreaders will often fire fake mousedown events when a focusable element
 * is activated using the keyboard. We can typically distinguish between these faked
 * mousedown events and real mousedown events using the "buttons" property. While
 * real mousedowns will indicate the mouse button that was pressed (e.g. "1" for
 * the left mouse button), faked mousedowns will usually set the property value to 0.
 */
function isFakeMousedownFromScreenReader(event) {
    return event.buttons === 0;
}
//# sourceMappingURL=fake-mousedown.js.map

/***/ }),
/* 348 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AnimationCurves */
/* unused harmony export AnimationDurations */
/** @docs-private */
var AnimationCurves = (function () {
    function AnimationCurves() {
    }
    AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
    AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
    AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
    AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
    return AnimationCurves;
}());
/** @docs-private */
var AnimationDurations = (function () {
    function AnimationDurations() {
    }
    AnimationDurations.COMPLEX = '375ms';
    AnimationDurations.ENTERING = '225ms';
    AnimationDurations.EXITING = '195ms';
    return AnimationDurations;
}());
//# sourceMappingURL=animation.js.map

/***/ }),
/* 349 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = coerceNumberProperty;
/** Coerces a data-bound value (typically a string) to a number. */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
//# sourceMappingURL=number-property.js.map

/***/ }),
/* 350 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GestureConfig; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* Adjusts configuration of our gesture library, Hammer. */
var GestureConfig = (function (_super) {
    __extends(GestureConfig, _super);
    function GestureConfig() {
        _super.call(this);
        this._hammer = typeof window !== 'undefined' ? window.Hammer : null;
        /* List of new event names to add to the gesture support list */
        this.events = this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!this._hammer && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    GestureConfig.prototype.buildHammer = function (element) {
        var mc = new this._hammer(element);
        // Default Hammer Recognizers.
        var pan = new this._hammer.Pan();
        var swipe = new this._hammer.Swipe();
        var press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
        // TODO: Confirm threshold numbers with Material Design UX Team
        var slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        var longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return mc;
    };
    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
    GestureConfig.prototype._createRecognizer = function (base, options) {
        var inheritances = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            inheritances[_i - 2] = arguments[_i];
        }
        var recognizer = new base.constructor(options);
        inheritances.push(base);
        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
        return recognizer;
    };
    GestureConfig = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], GestureConfig);
    return GestureConfig;
}(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["HammerGestureConfig"]));
//# sourceMappingURL=gesture-config.js.map

/***/ }),
/* 351 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_container__ = __webpack_require__(253);
/* unused harmony export FullscreenOverlayContainer */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
var FullscreenOverlayContainer = (function (_super) {
    __extends(FullscreenOverlayContainer, _super);
    function FullscreenOverlayContainer() {
        _super.apply(this, arguments);
    }
    FullscreenOverlayContainer.prototype._createContainer = function () {
        var _this = this;
        _super.prototype._createContainer.call(this);
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(function () { return _this._adjustParentForFullscreenChange(); });
    };
    FullscreenOverlayContainer.prototype._adjustParentForFullscreenChange = function () {
        if (!this._containerElement) {
            return;
        }
        var fullscreenElement = this.getFullscreenElement();
        var parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    };
    FullscreenOverlayContainer.prototype._addFullscreenChangeListener = function (fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if (document.mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if (document.msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    };
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
    */
    FullscreenOverlayContainer.prototype.getFullscreenElement = function () {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null;
    };
    FullscreenOverlayContainer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], FullscreenOverlayContainer);
    return FullscreenOverlayContainer;
}(__WEBPACK_IMPORTED_MODULE_1__overlay_container__["a" /* OverlayContainer */]));
//# sourceMappingURL=fullscreen-overlay-container.js.map

/***/ }),
/* 352 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalPositionStrategy; });
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
var GlobalPositionStrategy = (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    GlobalPositionStrategy.prototype.top = function (value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    GlobalPositionStrategy.prototype.left = function (value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    GlobalPositionStrategy.prototype.bottom = function (value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    GlobalPositionStrategy.prototype.right = function (value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     */
    GlobalPositionStrategy.prototype.width = function (value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    };
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     */
    GlobalPositionStrategy.prototype.height = function (value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._alignItems = 'center';
        return this;
    };
    /**
     * Apply the position to the element.
     * @docs-private
     *
     * @param element Element to which to apply the CSS.
     * @returns Resolved when the styles have been applied.
     */
    GlobalPositionStrategy.prototype.apply = function (element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        var styles = element.style;
        var parentStyles = element.parentNode.style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
        return Promise.resolve(null);
    };
    /**
     * Removes the wrapper element from the DOM.
     */
    GlobalPositionStrategy.prototype.dispose = function () {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    };
    return GlobalPositionStrategy;
}());
//# sourceMappingURL=global-position-strategy.js.map

/***/ }),
/* 353 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewport_ruler__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connected_position_strategy__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_position_strategy__ = __webpack_require__(352);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayPositionBuilder; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/** Builder for overlay position strategy. */
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     */
    OverlayPositionBuilder.prototype.global = function () {
        return new __WEBPACK_IMPORTED_MODULE_3__global_position_strategy__["a" /* GlobalPositionStrategy */]();
    };
    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     */
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new __WEBPACK_IMPORTED_MODULE_1__connected_position_strategy__["a" /* ConnectedPositionStrategy */](elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__viewport_ruler__["a" /* ViewportRuler */]])
    ], OverlayPositionBuilder);
    return OverlayPositionBuilder;
}());
//# sourceMappingURL=overlay-position-builder.js.map

/***/ }),
/* 354 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scroll_dispatcher__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scrollable; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var Scrollable = (function () {
    function Scrollable(_elementRef, _scroll) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
    }
    Scrollable.prototype.ngOnInit = function () {
        this._scroll.register(this);
    };
    Scrollable.prototype.ngOnDestroy = function () {
        this._scroll.deregister(this);
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     */
    Scrollable.prototype.elementScrolled = function () {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this._elementRef.nativeElement, 'scroll');
    };
    Scrollable.prototype.getElementRef = function () {
        return this._elementRef;
    };
    Scrollable = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[cdk-scrollable]'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__scroll_dispatcher__["a" /* ScrollDispatcher */]])
    ], Scrollable);
    return Scrollable;
}());
//# sourceMappingURL=scrollable.js.map

/***/ }),
/* 355 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errors_error__ = __webpack_require__(251);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NullPortalError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PortalAlreadyAttachedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PortalHostAlreadyDisposedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UnknownPortalTypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NullPortalHostError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NoPortalAttachedError; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
var NullPortalError = (function (_super) {
    __extends(NullPortalError, _super);
    function NullPortalError() {
        _super.call(this, 'Must provide a portal to attach');
    }
    return NullPortalError;
}(__WEBPACK_IMPORTED_MODULE_0__errors_error__["a" /* MdError */]));
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
var PortalAlreadyAttachedError = (function (_super) {
    __extends(PortalAlreadyAttachedError, _super);
    function PortalAlreadyAttachedError() {
        _super.call(this, 'Host already has a portal attached');
    }
    return PortalAlreadyAttachedError;
}(__WEBPACK_IMPORTED_MODULE_0__errors_error__["a" /* MdError */]));
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
var PortalHostAlreadyDisposedError = (function (_super) {
    __extends(PortalHostAlreadyDisposedError, _super);
    function PortalHostAlreadyDisposedError() {
        _super.call(this, 'This PortalHost has already been disposed');
    }
    return PortalHostAlreadyDisposedError;
}(__WEBPACK_IMPORTED_MODULE_0__errors_error__["a" /* MdError */]));
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
var UnknownPortalTypeError = (function (_super) {
    __extends(UnknownPortalTypeError, _super);
    function UnknownPortalTypeError() {
        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
    }
    return UnknownPortalTypeError;
}(__WEBPACK_IMPORTED_MODULE_0__errors_error__["a" /* MdError */]));
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
var NullPortalHostError = (function (_super) {
    __extends(NullPortalHostError, _super);
    function NullPortalHostError() {
        _super.call(this, 'Attempting to attach a portal to a null PortalHost');
    }
    return NullPortalHostError;
}(__WEBPACK_IMPORTED_MODULE_0__errors_error__["a" /* MdError */]));
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
var NoPortalAttachedError = (function (_super) {
    __extends(NoPortalAttachedError, _super);
    function NoPortalAttachedError() {
        _super.call(this, 'Attempting to detach a portal that is not attached to a host');
    }
    return NoPortalAttachedError;
}(__WEBPACK_IMPORTED_MODULE_0__errors_error__["a" /* MdError */]));
//# sourceMappingURL=portal-errors.js.map

/***/ }),
/* 356 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* unused harmony export DomProjectionHost */
/* unused harmony export DomProjection */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectionModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// "Polyfill" for `Node.replaceWith()`.
// cf. https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
function _replaceWith(toReplaceEl, otherEl) {
    toReplaceEl.parentElement.replaceChild(otherEl, toReplaceEl);
}
/** @docs-private */
var DomProjectionHost = (function () {
    function DomProjectionHost(ref) {
        this.ref = ref;
    }
    DomProjectionHost = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'cdk-dom-projection-host'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], DomProjectionHost);
    return DomProjectionHost;
}());
/** @docs-private */
var DomProjection = (function () {
    function DomProjection() {
    }
    /**
     * Project an element into a host element.
     * Replace a host element by another element. This also replaces the children of the element
     * by the children of the host.
     *
     * It should be used like this:
     *
     * ```
     *   @Component({
     *     template: `<div>
     *       <cdk-dom-projection-host>
     *         <div>other</div>
     *         <ng-content></ng-content>
     *       </cdk-dom-projection-host>
     *     </div>`
     *   })
     *   class Cmpt {
     *     constructor(private _projector: DomProjection, private _el: ElementRef) {}
     *     ngOnInit() { this._projector.project(this._el, this._projector); }
     *   }
     * ```
     *
     * This component will move the content of the element it's applied to in the outer div. Because
     * `project()` also move the children of the host inside the projected element, the element will
     * contain the `<div>other</div>` HTML as well as its own children.
     *
     * Note: without `<ng-content></ng-content>` the projection will project an empty element.
     *
     * @param ref ElementRef to be projected.
     * @param host Projection host into which to project the `ElementRef`.
     */
    DomProjection.prototype.project = function (ref, host) {
        var projectedEl = ref.nativeElement;
        var hostEl = host.ref.nativeElement;
        var childNodes = projectedEl.childNodes;
        var child = childNodes[0];
        // We hoist all of the projected element's children out into the projected elements position
        // because we *only* want to move the projected element and not its children.
        _replaceWith(projectedEl, child);
        var l = childNodes.length;
        while (l--) {
            child.parentNode.insertBefore(childNodes[0], child.nextSibling);
            child = child.nextSibling; // nextSibling is now the childNodes[0].
        }
        // Insert all host children under the projectedEl, then replace host by component.
        l = hostEl.childNodes.length;
        while (l--) {
            projectedEl.appendChild(hostEl.childNodes[0]);
        }
        _replaceWith(hostEl, projectedEl);
        // At this point the host is replaced by the component. Nothing else to be done.
    };
    DomProjection = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], DomProjection);
    return DomProjection;
}());
/** @docs-private */
var ProjectionModule = (function () {
    function ProjectionModule() {
    }
    /** @deprecated */
    ProjectionModule.forRoot = function () {
        return {
            ngModule: ProjectionModule,
        };
    };
    ProjectionModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [DomProjectionHost],
            declarations: [DomProjectionHost],
            providers: [DomProjection],
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectionModule);
    return ProjectionModule;
}());
//# sourceMappingURL=projection.js.map

/***/ }),
/* 357 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RIPPLE_SPEED_PX_PER_SECOND */
/* unused harmony export RIPPLE_FADE_OUT_DURATION */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RippleRenderer; });
/** Fade-in speed in pixels per second. Can be modified with the speedFactor option. */
var RIPPLE_SPEED_PX_PER_SECOND = 170;
/** Fade-out speed for the ripples in milliseconds. This can't be modified by the speedFactor. */
var RIPPLE_FADE_OUT_DURATION = 600;
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
var distanceToFurthestCorner = function (x, y, rect) {
    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    var distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
};
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
var RippleRenderer = (function () {
    function RippleRenderer(_elementRef, _ngZone, _ruler) {
        this._ngZone = _ngZone;
        this._ruler = _ruler;
        /** Whether the mouse is currently down or not. */
        this._isMousedown = false;
        /** Currently active ripples that will be closed on mouseup. */
        this._activeRipples = [];
        /** Events to be registered on the trigger element. */
        this._triggerEvents = new Map();
        /** Ripple config for all ripples created by events. */
        this.rippleConfig = {};
        /** Whether mouse ripples should be created or not. */
        this.rippleDisabled = false;
        this._containerElement = _elementRef.nativeElement;
        // Specify events which need to be registered on the trigger.
        this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
        this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
        this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));
        // By default use the host element as trigger element.
        this.setTriggerElement(this._containerElement);
    }
    /** Fades in a ripple at the given coordinates. */
    RippleRenderer.prototype.fadeInRipple = function (pageX, pageY, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            // Subtract scroll values from the coordinates because calculations below
            // are always relative to the viewport rectangle.
            var scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        var radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        var duration = 1 / (config.speedFactor || 1) * (radius / RIPPLE_SPEED_PX_PER_SECOND);
        var offsetX = pageX - containerRect.left;
        var offsetY = pageY - containerRect.top;
        var ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = (offsetX - radius) + "px";
        ripple.style.top = (offsetY - radius) + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.width = radius * 2 + "px";
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = duration + "s";
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        this._enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Wait for the ripple to be faded in. Once it's faded in, the ripple can be hidden immediately
        // if the mouse is released.
        this.runTimeoutOutsideZone(function () {
            _this._isMousedown ? _this._activeRipples.push(ripple) : _this.fadeOutRipple(ripple);
        }, duration * 1000);
    };
    /** Fades out a ripple element. */
    RippleRenderer.prototype.fadeOutRipple = function (ripple) {
        ripple.style.transitionDuration = RIPPLE_FADE_OUT_DURATION + "ms";
        ripple.style.opacity = '0';
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(function () {
            ripple.parentNode.removeChild(ripple);
        }, RIPPLE_FADE_OUT_DURATION);
    };
    /** Sets the trigger element and registers the mouse events. */
    RippleRenderer.prototype.setTriggerElement = function (element) {
        var _this = this;
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach(function (fn, type) { return _this._triggerElement.removeEventListener(type, fn); });
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._triggerEvents.forEach(function (fn, type) { return element.addEventListener(type, fn); });
        }
        this._triggerElement = element;
    };
    /** Listener being called on mousedown event. */
    RippleRenderer.prototype.onMousedown = function (event) {
        if (this.rippleDisabled) {
            return;
        }
        this._isMousedown = true;
        this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
    };
    /** Listener being called on mouseup event. */
    RippleRenderer.prototype.onMouseup = function () {
        var _this = this;
        this._isMousedown = false;
        this._activeRipples.forEach(function (ripple) { return _this.fadeOutRipple(ripple); });
        this._activeRipples = [];
    };
    /** Listener being called on mouseleave event. */
    RippleRenderer.prototype.onMouseLeave = function () {
        if (this._isMousedown) {
            this.onMouseup();
        }
    };
    /** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
    RippleRenderer.prototype.runTimeoutOutsideZone = function (fn, delay) {
        if (delay === void 0) { delay = 0; }
        this._ngZone.runOutsideAngular(function () { return setTimeout(fn, delay); });
    };
    /** Enforces a style recalculation of a DOM element by computing its styles. */
    // TODO(devversion): Move into global utility function.
    RippleRenderer.prototype._enforceStyleRecalculation = function (element) {
        // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
        // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
        // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        window.getComputedStyle(element).getPropertyValue('opacity');
    };
    return RippleRenderer;
}());
//# sourceMappingURL=ripple-renderer.js.map

/***/ }),
/* 358 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* unused harmony export SelectionModel */
/* unused harmony export SelectionChange */

/**
 * Class to be used to power selecting one or more options from a list.
 * @docs-private
 */
var SelectionModel = (function () {
    function SelectionModel(_isMulti, initiallySelectedValues) {
        var _this = this;
        if (_isMulti === void 0) { _isMulti = false; }
        this._isMulti = _isMulti;
        /** Currently-selected values. */
        this._selection = new Set();
        /** Keeps track of the deselected options that haven't been emitted by the change event. */
        this._deselectedToEmit = [];
        /** Keeps track of the selected option that haven't been emitted by the change event. */
        this._selectedToEmit = [];
        /** Event emitted when the value has changed. */
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /** Selected value(s). */
        get: function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    SelectionModel.prototype.select = function (value) {
        this._markSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    SelectionModel.prototype.deselect = function (value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Clears all of the selected values.
     */
    SelectionModel.prototype.clear = function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    SelectionModel.prototype.isSelected = function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model has a value.
     */
    SelectionModel.prototype.isEmpty = function () {
        return this._selection.size === 0;
    };
    /** Emits a change event and clears the records of selected and deselected values. */
    SelectionModel.prototype._emitChangeEvent = function () {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            var eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
            this._selected = null;
        }
    };
    /** Selects a value. */
    SelectionModel.prototype._markSelected = function (value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            this._selectedToEmit.push(value);
        }
    };
    /** Deselects a value. */
    SelectionModel.prototype._unmarkSelected = function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            this._deselectedToEmit.push(value);
        }
    };
    /** Clears out the selected values. */
    SelectionModel.prototype._unmarkAll = function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    return SelectionModel;
}());
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * @docs-private
 */
var SelectionChange = (function () {
    function SelectionChange(added, removed) {
        this.added = added;
        this.removed = removed;
    }
    return SelectionChange;
}());
//# sourceMappingURL=selection.js.map

/***/ }),
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdDialogContentAlreadyAttachedError; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin.
 * @docs-private
 */
var MdDialogContentAlreadyAttachedError = (function (_super) {
    __extends(MdDialogContentAlreadyAttachedError, _super);
    function MdDialogContentAlreadyAttachedError() {
        _super.call(this, 'Attempting to attach dialog content after content is already attached');
    }
    return MdDialogContentAlreadyAttachedError;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
//# sourceMappingURL=dialog-errors.js.map

/***/ }),
/* 360 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid_tile__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tile_coordinator__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tile_styler__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__grid_list_errors__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__grid_list_measure__ = __webpack_require__(297);
/* unused harmony export MdGridList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdGridListModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
var MD_FIT_MODE = 'fit';
var MdGridList = (function () {
    function MdGridList(_renderer, _element, _dir) {
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        /** The amount of space between tiles. This will be something like '5px' or '2em'. */
        this._gutter = '1px';
    }
    Object.defineProperty(MdGridList.prototype, "cols", {
        /** Amount of columns in the grid list. */
        get: function () { return this._cols; },
        set: function (value) { this._cols = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__grid_list_measure__["a" /* coerceToNumber */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridList.prototype, "gutterSize", {
        /** Size of the grid list's gutter in pixels. */
        get: function () { return this._gutter; },
        set: function (value) { this._gutter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__grid_list_measure__["b" /* coerceToString */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridList.prototype, "rowHeight", {
        /** Set internal representation of row height from the user-provided value. */
        set: function (value) {
            this._rowHeight = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__grid_list_measure__["b" /* coerceToString */])(value);
            this._setTileStyler();
        },
        enumerable: true,
        configurable: true
    });
    MdGridList.prototype.ngOnInit = function () {
        this._checkCols();
        this._checkRowHeight();
    };
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     */
    MdGridList.prototype.ngAfterContentChecked = function () {
        this._layoutTiles();
    };
    /** Throw a friendly error if cols property is missing */
    MdGridList.prototype._checkCols = function () {
        if (!this.cols) {
            throw new __WEBPACK_IMPORTED_MODULE_4__grid_list_errors__["a" /* MdGridListColsError */]();
        }
    };
    /** Default to equal width:height if rowHeight property is missing */
    MdGridList.prototype._checkRowHeight = function () {
        if (!this._rowHeight) {
            this._tileStyler = new __WEBPACK_IMPORTED_MODULE_3__tile_styler__["a" /* RatioTileStyler */]('1:1');
        }
    };
    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    MdGridList.prototype._setTileStyler = function () {
        if (this._rowHeight === MD_FIT_MODE) {
            this._tileStyler = new __WEBPACK_IMPORTED_MODULE_3__tile_styler__["b" /* FitTileStyler */]();
        }
        else if (this._rowHeight && this._rowHeight.indexOf(':') > -1) {
            this._tileStyler = new __WEBPACK_IMPORTED_MODULE_3__tile_styler__["a" /* RatioTileStyler */](this._rowHeight);
        }
        else {
            this._tileStyler = new __WEBPACK_IMPORTED_MODULE_3__tile_styler__["c" /* FixedTileStyler */](this._rowHeight);
        }
    };
    /** Computes and applies the size and position for all children grid tiles. */
    MdGridList.prototype._layoutTiles = function () {
        var _this = this;
        var tracker = new __WEBPACK_IMPORTED_MODULE_2__tile_coordinator__["a" /* TileCoordinator */](this.cols, this._tiles);
        var direction = this._dir ? this._dir.value : 'ltr';
        this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
        this._tiles.forEach(function (tile, index) {
            var pos = tracker.positions[index];
            _this._tileStyler.setStyle(tile, pos.row, pos.col);
        });
        this._setListStyle(this._tileStyler.getComputedHeight());
    };
    /** Sets style on the main grid-list element, given the style name and value. */
    MdGridList.prototype._setListStyle = function (style) {
        if (style) {
            this._renderer.setElementStyle(this._element.nativeElement, style[0], style[1]);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__grid_tile__["a" /* MdGridTile */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdGridList.prototype, "_tiles", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdGridList.prototype, "cols", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdGridList.prototype, "gutterSize", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], MdGridList.prototype, "rowHeight", null);
    MdGridList = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-grid-list, mat-grid-list',
            template: "<div><ng-content></ng-content></div>",
            styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{display:flex;position:absolute;align-items:center;justify-content:center;height:100%;top:0;right:0;bottom:0;left:0;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;font-size:16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer .mat-line,.mat-grid-tile .mat-grid-tile-header .mat-line{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile .mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile .mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}.mat-grid-tile .mat-grid-list-text>*,.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-avatar:empty,.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}"],
            host: {
                'role': 'list',
                '[class.mat-grid-list]': 'true',
            },
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5__core__["k" /* Dir */]])
    ], MdGridList);
    return MdGridList;
}());
var MdGridListModule = (function () {
    function MdGridListModule() {
    }
    /** @deprecated */
    MdGridListModule.forRoot = function () {
        return {
            ngModule: MdGridListModule,
            providers: []
        };
    };
    MdGridListModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_5__core__["B" /* MdLineModule */], __WEBPACK_IMPORTED_MODULE_5__core__["e" /* CompatibilityModule */]],
            exports: [
                MdGridList,
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["a" /* MdGridTile */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["b" /* MdGridTileText */],
                __WEBPACK_IMPORTED_MODULE_5__core__["B" /* MdLineModule */],
                __WEBPACK_IMPORTED_MODULE_5__core__["e" /* CompatibilityModule */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["c" /* MdGridTileHeaderCssMatStyler */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["d" /* MdGridTileFooterCssMatStyler */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["e" /* MdGridAvatarCssMatStyler */]
            ],
            declarations: [
                MdGridList,
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["a" /* MdGridTile */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["b" /* MdGridTileText */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["c" /* MdGridTileHeaderCssMatStyler */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["d" /* MdGridTileFooterCssMatStyler */],
                __WEBPACK_IMPORTED_MODULE_1__grid_tile__["e" /* MdGridAvatarCssMatStyler */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdGridListModule);
    return MdGridListModule;
}());
//# sourceMappingURL=grid-list.js.map

/***/ }),
/* 361 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grid_list_measure__ = __webpack_require__(297);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdGridTile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MdGridTileText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MdGridAvatarCssMatStyler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MdGridTileHeaderCssMatStyler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MdGridTileFooterCssMatStyler; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MdGridTile = (function () {
    function MdGridTile(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._rowspan = 1;
        this._colspan = 1;
    }
    Object.defineProperty(MdGridTile.prototype, "rowspan", {
        /** Amount of rows that the grid tile takes up. */
        get: function () { return this._rowspan; },
        set: function (value) { this._rowspan = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__grid_list_measure__["a" /* coerceToNumber */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridTile.prototype, "colspan", {
        /** Amount of columns that the grid tile takes up. */
        get: function () { return this._colspan; },
        set: function (value) { this._colspan = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__grid_list_measure__["a" /* coerceToNumber */])(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the style of the grid-tile element.  Needs to be set manually to avoid
     * "Changed after checked" errors that would occur with HostBinding.
     */
    MdGridTile.prototype._setStyle = function (property, value) {
        this._renderer.setElementStyle(this._element.nativeElement, property, value);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdGridTile.prototype, "rowspan", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdGridTile.prototype, "colspan", null);
    MdGridTile = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-grid-tile, mat-grid-tile',
            host: {
                'role': 'listitem',
                '[class.mat-grid-tile]': 'true',
            },
            template: "<figure class=\"mat-figure\"><ng-content></ng-content></figure>",
            styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{display:flex;position:absolute;align-items:center;justify-content:center;height:100%;top:0;right:0;bottom:0;left:0;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;font-size:16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer .mat-line,.mat-grid-tile .mat-grid-tile-header .mat-line{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile .mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile .mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}.mat-grid-tile .mat-grid-list-text>*,.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-avatar:empty,.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdGridTile);
    return MdGridTile;
}());
var MdGridTileText = (function () {
    function MdGridTileText(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    MdGridTileText.prototype.ngAfterContentInit = function () {
        this._lineSetter = new __WEBPACK_IMPORTED_MODULE_1__core__["z" /* MdLineSetter */](this._lines, this._renderer, this._element);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__core__["A" /* MdLine */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdGridTileText.prototype, "_lines", void 0);
    MdGridTileText = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-grid-tile-header, mat-grid-tile-header, md-grid-tile-footer, mat-grid-tile-footer',
            template: "<ng-content select=\"[md-grid-avatar], [mat-grid-avatar]\"></ng-content><div class=\"mat-grid-list-text\"><ng-content select=\"[md-line], [mat-line]\"></ng-content></div><ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdGridTileText);
    return MdGridTileText;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdGridAvatarCssMatStyler = (function () {
    function MdGridAvatarCssMatStyler() {
    }
    MdGridAvatarCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-grid-avatar], [mat-grid-avatar]',
            host: {
                '[class.mat-grid-avatar]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdGridAvatarCssMatStyler);
    return MdGridAvatarCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdGridTileHeaderCssMatStyler = (function () {
    function MdGridTileHeaderCssMatStyler() {
    }
    MdGridTileHeaderCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-grid-tile-header, mat-grid-tile-header',
            host: {
                '[class.mat-grid-tile-header]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdGridTileHeaderCssMatStyler);
    return MdGridTileHeaderCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdGridTileFooterCssMatStyler = (function () {
    function MdGridTileFooterCssMatStyler() {
    }
    MdGridTileFooterCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-grid-tile-footer, mat-grid-tile-footer',
            host: {
                '[class.mat-grid-tile-footer]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdGridTileFooterCssMatStyler);
    return MdGridTileFooterCssMatStyler;
}());
//# sourceMappingURL=grid-tile.js.map

/***/ }),
/* 362 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid_list_errors__ = __webpack_require__(258);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TileCoordinator; });
/* unused harmony export TilePosition */

/**
 * Class for determining, from a list of tiles, the (row, col) position of each of those tiles
 * in the grid. This is necessary (rather than just rendering the tiles in normal document flow)
 * because the tiles can have a rowspan.
 *
 * The positioning algorithm greedily places each tile as soon as it encounters a gap in the grid
 * large enough to accommodate it so that the tiles still render in the same order in which they
 * are given.
 *
 * The basis of the algorithm is the use of an array to track the already placed tiles. Each
 * element of the array corresponds to a column, and the value indicates how many cells in that
 * column are already occupied; zero indicates an empty cell. Moving "down" to the next row
 * decrements each value in the tracking array (indicating that the column is one cell closer to
 * being free).
 *
 * @docs-private
 */
var TileCoordinator = (function () {
    function TileCoordinator(numColumns, tiles) {
        var _this = this;
        /** Index at which the search for the next gap will start. */
        this.columnIndex = 0;
        /** The current row index. */
        this.rowIndex = 0;
        this.tracker = new Array(numColumns);
        this.tracker.fill(0, 0, this.tracker.length);
        this.positions = tiles.map(function (tile) { return _this._trackTile(tile); });
    }
    Object.defineProperty(TileCoordinator.prototype, "rowCount", {
        /** Gets the total number of rows occupied by tiles */
        get: function () { return this.rowIndex + 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileCoordinator.prototype, "rowspan", {
        /** Gets the total span of rows occupied by tiles.
         * Ex: A list with 1 row that contains a tile with rowspan 2 will have a total rowspan of 2. */
        get: function () {
            var lastRowMax = Math.max.apply(Math, this.tracker);
            // if any of the tiles has a rowspan that pushes it beyond the total row count,
            // add the difference to the rowcount
            return lastRowMax > 1 ? this.rowCount + lastRowMax - 1 : this.rowCount;
        },
        enumerable: true,
        configurable: true
    });
    /** Calculates the row and col position of a tile. */
    TileCoordinator.prototype._trackTile = function (tile) {
        // Find a gap large enough for this tile.
        var gapStartIndex = this._findMatchingGap(tile.colspan);
        // Place tile in the resulting gap.
        this._markTilePosition(gapStartIndex, tile);
        // The next time we look for a gap, the search will start at columnIndex, which should be
        // immediately after the tile that has just been placed.
        this.columnIndex = gapStartIndex + tile.colspan;
        return new TilePosition(this.rowIndex, gapStartIndex);
    };
    /** Finds the next available space large enough to fit the tile. */
    TileCoordinator.prototype._findMatchingGap = function (tileCols) {
        if (tileCols > this.tracker.length) {
            throw new __WEBPACK_IMPORTED_MODULE_0__grid_list_errors__["b" /* MdGridTileTooWideError */](tileCols, this.tracker.length);
        }
        // Start index is inclusive, end index is exclusive.
        var gapStartIndex = -1;
        var gapEndIndex = -1;
        // Look for a gap large enough to fit the given tile. Empty spaces are marked with a zero.
        do {
            // If we've reached the end of the row, go to the next row.
            if (this.columnIndex + tileCols > this.tracker.length) {
                this._nextRow();
                continue;
            }
            gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
            // If there are no more empty spaces in this row at all, move on to the next row.
            if (gapStartIndex == -1) {
                this._nextRow();
                continue;
            }
            gapEndIndex = this._findGapEndIndex(gapStartIndex);
            // If a gap large enough isn't found, we want to start looking immediately after the current
            // gap on the next iteration.
            this.columnIndex = gapStartIndex + 1;
        } while (gapEndIndex - gapStartIndex < tileCols);
        return gapStartIndex;
    };
    /** Move "down" to the next row. */
    TileCoordinator.prototype._nextRow = function () {
        this.columnIndex = 0;
        this.rowIndex++;
        // Decrement all spaces by one to reflect moving down one row.
        for (var i = 0; i < this.tracker.length; i++) {
            this.tracker[i] = Math.max(0, this.tracker[i] - 1);
        }
    };
    /**
     * Finds the end index (exclusive) of a gap given the index from which to start looking.
     * The gap ends when a non-zero value is found.
     */
    TileCoordinator.prototype._findGapEndIndex = function (gapStartIndex) {
        for (var i = gapStartIndex + 1; i < this.tracker.length; i++) {
            if (this.tracker[i] != 0) {
                return i;
            }
        }
        // The gap ends with the end of the row.
        return this.tracker.length;
    };
    /** Update the tile tracker to account for the given tile in the given space. */
    TileCoordinator.prototype._markTilePosition = function (start, tile) {
        for (var i = 0; i < tile.colspan; i++) {
            this.tracker[start + i] = tile.rowspan;
        }
    };
    return TileCoordinator;
}());
/**
 * Simple data structure for tile position (row, col).
 * @docs-private
 */
var TilePosition = (function () {
    function TilePosition(row, col) {
        this.row = row;
        this.col = col;
    }
    return TilePosition;
}());
//# sourceMappingURL=tile-coordinator.js.map

/***/ }),
/* 363 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid_list_errors__ = __webpack_require__(258);
/* unused harmony export TileStyler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FixedTileStyler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatioTileStyler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FitTileStyler; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Sets the style properties for an individual tile, given the position calculated by the
 * Tile Coordinator.
 * @docs-private
 */
var TileStyler = (function () {
    function TileStyler() {
        this._rows = 0;
        this._rowspan = 0;
    }
    /**
     * Adds grid-list layout info once it is available. Cannot be processed in the constructor
     * because these properties haven't been calculated by that point.
     *
     * @param gutterSize Size of the grid's gutter.
     * @param tracker Instance of the TileCoordinator.
     * @param cols Amount of columns in the grid.
     * @param direction Layout direction of the grid.
     */
    TileStyler.prototype.init = function (gutterSize, tracker, cols, direction) {
        this._gutterSize = normalizeUnits(gutterSize);
        this._rows = tracker.rowCount;
        this._rowspan = tracker.rowspan;
        this._cols = cols;
        this._direction = direction;
    };
    /**
     * Computes the amount of space a single 1x1 tile would take up (width or height).
     * Used as a basis for other calculations.
     * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
     * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
     * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
     */
    TileStyler.prototype.getBaseTileSize = function (sizePercent, gutterFraction) {
        // Take the base size percent (as would be if evenly dividing the size between cells),
        // and then subtracting the size of one gutter. However, since there are no gutters on the
        // edges, each tile only uses a fraction (gutterShare = numGutters / numCells) of the gutter
        // size. (Imagine having one gutter per tile, and then breaking up the extra gutter on the
        // edge evenly among the cells).
        return "(" + sizePercent + "% - ( " + this._gutterSize + " * " + gutterFraction + " ))";
    };
    /**
     * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
     * @param offset Number of tiles that have already been rendered in the row/column.
     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @return Position of the tile as a CSS calc() expression.
     */
    TileStyler.prototype.getTilePosition = function (baseSize, offset) {
        // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
        // row/column (offset).
        return calc("(" + baseSize + " + " + this._gutterSize + ") * " + offset);
    };
    /**
     * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param span The tile's rowspan or colspan.
     * @return Size of the tile as a CSS calc() expression.
     */
    TileStyler.prototype.getTileSize = function (baseSize, span) {
        return "(" + baseSize + " * " + span + ") + (" + (span - 1) + " * " + this._gutterSize + ")";
    };
    /**
     * Sets the style properties to be applied to a tile for the given row and column index.
     * @param tile Tile to which to apply the styling.
     * @param rowIndex Index of the tile's row.
     * @param colIndex Index of the tile's column.
     */
    TileStyler.prototype.setStyle = function (tile, rowIndex, colIndex) {
        // Percent of the available horizontal space that one column takes up.
        var percentWidthPerTile = 100 / this._cols;
        // Fraction of the vertical gutter size that each column takes up.
        // For example, if there are 5 columns, each column uses 4/5 = 0.8 times the gutter width.
        var gutterWidthFractionPerTile = (this._cols - 1) / this._cols;
        this.setColStyles(tile, colIndex, percentWidthPerTile, gutterWidthFractionPerTile);
        this.setRowStyles(tile, rowIndex, percentWidthPerTile, gutterWidthFractionPerTile);
    };
    /** Sets the horizontal placement of the tile in the list. */
    TileStyler.prototype.setColStyles = function (tile, colIndex, percentWidth, gutterWidth) {
        // Base horizontal size of a column.
        var baseTileWidth = this.getBaseTileSize(percentWidth, gutterWidth);
        // The width and horizontal position of each tile is always calculated the same way, but the
        // height and vertical position depends on the rowMode.
        var side = this._direction === 'ltr' ? 'left' : 'right';
        tile._setStyle(side, this.getTilePosition(baseTileWidth, colIndex));
        tile._setStyle('width', calc(this.getTileSize(baseTileWidth, tile.colspan)));
    };
    /**
     * Calculates the total size taken up by gutters across one axis of a list.
     */
    TileStyler.prototype.getGutterSpan = function () {
        return this._gutterSize + " * (" + this._rowspan + " - 1)";
    };
    /**
     * Calculates the total size taken up by tiles across one axis of a list.
     * @param tileHeight Height of the tile.
     */
    TileStyler.prototype.getTileSpan = function (tileHeight) {
        return this._rowspan + " * " + this.getTileSize(tileHeight, 1);
    };
    /**
     * Sets the vertical placement of the tile in the list.
     * This method will be implemented by each type of TileStyler.
     * @docs-private
     */
    TileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) { };
    /**
     * Calculates the computed height and returns the correct style property to set.
     * This method will be implemented by each type of TileStyler.
     * @docs-private
     */
    TileStyler.prototype.getComputedHeight = function () { return null; };
    return TileStyler;
}());
/**
 * This type of styler is instantiated when the user passes in a fixed row height.
 * Example <md-grid-list cols="3" rowHeight="100px">
 * @docs-private
 */
var FixedTileStyler = (function (_super) {
    __extends(FixedTileStyler, _super);
    function FixedTileStyler(fixedRowHeight) {
        _super.call(this);
        this.fixedRowHeight = fixedRowHeight;
    }
    FixedTileStyler.prototype.init = function (gutterSize, tracker, cols, direction) {
        _super.prototype.init.call(this, gutterSize, tracker, cols, direction);
        this.fixedRowHeight = normalizeUnits(this.fixedRowHeight);
    };
    FixedTileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) {
        tile._setStyle('top', this.getTilePosition(this.fixedRowHeight, rowIndex));
        tile._setStyle('height', calc(this.getTileSize(this.fixedRowHeight, tile.rowspan)));
    };
    FixedTileStyler.prototype.getComputedHeight = function () {
        return [
            'height', calc(this.getTileSpan(this.fixedRowHeight) + " + " + this.getGutterSpan())
        ];
    };
    return FixedTileStyler;
}(TileStyler));
/**
 * This type of styler is instantiated when the user passes in a width:height ratio
 * for the row height.  Example <md-grid-list cols="3" rowHeight="3:1">
 * @docs-private
 */
var RatioTileStyler = (function (_super) {
    __extends(RatioTileStyler, _super);
    function RatioTileStyler(value) {
        _super.call(this);
        this._parseRatio(value);
    }
    RatioTileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) {
        var percentHeightPerTile = percentWidth / this.rowHeightRatio;
        this.baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidth);
        // Use paddingTop and marginTop to maintain the given aspect ratio, as
        // a percentage-based value for these properties is applied versus the *width* of the
        // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
        tile._setStyle('marginTop', this.getTilePosition(this.baseTileHeight, rowIndex));
        tile._setStyle('paddingTop', calc(this.getTileSize(this.baseTileHeight, tile.rowspan)));
    };
    RatioTileStyler.prototype.getComputedHeight = function () {
        return [
            'paddingBottom', calc(this.getTileSpan(this.baseTileHeight) + " + " + this.getGutterSpan())
        ];
    };
    RatioTileStyler.prototype._parseRatio = function (value) {
        var ratioParts = value.split(':');
        if (ratioParts.length !== 2) {
            throw new __WEBPACK_IMPORTED_MODULE_0__grid_list_errors__["c" /* MdGridListBadRatioError */](value);
        }
        this.rowHeightRatio = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
    };
    return RatioTileStyler;
}(TileStyler));
/**
 * This type of styler is instantiated when the user selects a "fit" row height mode.
 * In other words, the row height will reflect the total height of the container divided
 * by the number of rows.  Example <md-grid-list cols="3" rowHeight="fit">
 *
 * @docs-private
 */
var FitTileStyler = (function (_super) {
    __extends(FitTileStyler, _super);
    function FitTileStyler() {
        _super.apply(this, arguments);
    }
    FitTileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) {
        // Percent of the available vertical space that one row takes up.
        var percentHeightPerTile = 100 / this._rowspan;
        // Fraction of the horizontal gutter size that each column takes up.
        var gutterHeightPerTile = (this._rows - 1) / this._rows;
        // Base vertical size of a column.
        var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightPerTile);
        tile._setStyle('top', this.getTilePosition(baseTileHeight, rowIndex));
        tile._setStyle('height', calc(this.getTileSize(baseTileHeight, tile.rowspan)));
    };
    return FitTileStyler;
}(TileStyler));
/** Wraps a CSS string in a calc function */
function calc(exp) { return "calc(" + exp + ")"; }
/** Appends pixels to a CSS string if no units are given. */
function normalizeUnits(value) {
    return (value.match(/px|em|rem/)) ? value : value + 'px';
}
//# sourceMappingURL=tile-styler.js.map

/***/ }),
/* 364 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_registry__ = __webpack_require__(299);
/* unused harmony reexport MdIconRegistry */
/* unused harmony export MdIconInvalidNameError */
/* unused harmony export MdIcon */
/* unused harmony export ICON_REGISTRY_PROVIDER_FACTORY */
/* unused harmony export ICON_REGISTRY_PROVIDER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdIconModule; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/** Exception thrown when an invalid icon name is passed to an md-icon component. */
var MdIconInvalidNameError = (function (_super) {
    __extends(MdIconInvalidNameError, _super);
    function MdIconInvalidNameError(iconName) {
        _super.call(this, "Invalid icon name: \"" + iconName + "\"");
    }
    return MdIconInvalidNameError;
}(__WEBPACK_IMPORTED_MODULE_3__core__["f" /* MdError */]));
/**
 * Component to display an icon. It can be used in the following ways:
 * - Specify the svgSrc input to load an SVG icon from a URL. The SVG content is directly inlined
 *   as a child of the <md-icon> component, so that CSS styles can easily be applied to it.
 *   The URL is loaded via an XMLHttpRequest, so it must be on the same domain as the page or its
 *   server must be configured to allow cross-domain requests.
 *   Example:
 *     <md-icon svgSrc="assets/arrow.svg"></md-icon>
 *
 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
 *   MdIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
 *   Examples:
 *     <md-icon svgIcon="left-arrow"></md-icon>
 *     <md-icon svgIcon="animals:cat"></md-icon>
 *
 * - Use a font ligature as an icon by putting the ligature text in the content of the <md-icon>
 *   component. By default the Material icons font is used as described at
 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
 *   desired font, or to an alias previously registered with MdIconRegistry.registerFontClassAlias.
 *   Examples:
 *     <md-icon>home</md-icon>
 *     <md-icon fontSet="myfont">sun</md-icon>
 *
 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
 *   CSS class which causes the glyph to be displayed via a :before selector, as in
 *   https://fortawesome.github.io/Font-Awesome/examples/
 *   Example:
 *     <md-icon fontSet="fa" fontIcon="alarm"></md-icon>
 */
var MdIcon = (function () {
    function MdIcon(_elementRef, _renderer, _mdIconRegistry) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._mdIconRegistry = _mdIconRegistry;
        /** Screenreader label for the icon. */
        this.hostAriaLabel = '';
    }
    Object.defineProperty(MdIcon.prototype, "color", {
        /** Color of the icon. */
        get: function () { return this._color; },
        set: function (value) { this._updateColor(value); },
        enumerable: true,
        configurable: true
    });
    MdIcon.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdIcon.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    /**
     * Splits an svgIcon binding value into its icon set and icon name components.
     * Returns a 2-element array of [(icon set), (icon name)].
     * The separator for the two fields is ':'. If there is no separator, an empty
     * string is returned for the icon set and the entire value is returned for
     * the icon name. If the argument is falsy, returns an array of two empty strings.
     * Throws a MdIconInvalidNameError if the name contains two or more ':' separators.
     * Examples:
     *   'social:cake' -> ['social', 'cake']
     *   'penguin' -> ['', 'penguin']
     *   null -> ['', '']
     *   'a:b:c' -> (throws MdIconInvalidNameError)
     */
    MdIcon.prototype._splitIconName = function (iconName) {
        if (!iconName) {
            return ['', ''];
        }
        var parts = iconName.split(':');
        switch (parts.length) {
            case 1:
                // Use default namespace.
                return ['', parts[0]];
            case 2:
                return parts;
            default:
                throw new MdIconInvalidNameError(iconName);
        }
    };
    MdIcon.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var changedInputs = Object.keys(changes);
        // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
        if (changedInputs.indexOf('svgIcon') != -1 || changedInputs.indexOf('svgSrc') != -1) {
            if (this.svgIcon) {
                var _a = this._splitIconName(this.svgIcon), namespace = _a[0], iconName = _a[1];
                this._mdIconRegistry.getNamedSvgIcon(iconName, namespace).first().subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
            }
        }
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
        this._updateAriaLabel();
    };
    MdIcon.prototype.ngOnInit = function () {
        // Update font classes because ngOnChanges won't be called if none of the inputs are present,
        // e.g. <md-icon>arrow</md-icon>. In this case we need to add a CSS class for the default font.
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
    };
    MdIcon.prototype.ngAfterViewChecked = function () {
        // Update aria label here because it may depend on the projected text content.
        // (e.g. <md-icon>home</md-icon> should use 'home').
        this._updateAriaLabel();
    };
    MdIcon.prototype._updateAriaLabel = function () {
        var ariaLabel = this._getAriaLabel();
        if (ariaLabel && ariaLabel !== this._previousAriaLabel) {
            this._previousAriaLabel = ariaLabel;
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-label', ariaLabel);
        }
    };
    MdIcon.prototype._getAriaLabel = function () {
        // If the parent provided an aria-label attribute value, use it as-is. Otherwise look for a
        // reasonable value from the alt attribute, font icon name, SVG icon name, or (for ligatures)
        // the text content of the directive.
        var label = this.hostAriaLabel ||
            this.alt ||
            this.fontIcon ||
            this._splitIconName(this.svgIcon)[1];
        if (label) {
            return label;
        }
        // The "content" of an SVG icon is not a useful label.
        if (this._usingFontIcon()) {
            var text = this._elementRef.nativeElement.textContent;
            if (text) {
                return text;
            }
        }
        // TODO: Warn here in dev mode.
        return null;
    };
    MdIcon.prototype._usingFontIcon = function () {
        return !this.svgIcon;
    };
    MdIcon.prototype._setSvgElement = function (svg) {
        var layoutElement = this._elementRef.nativeElement;
        // Remove existing child nodes and add the new SVG element.
        // We would use renderer.detachView(Array.from(layoutElement.childNodes)) here,
        // but it fails in IE11: https://github.com/angular/angular/issues/6327
        layoutElement.innerHTML = '';
        this._renderer.projectNodes(layoutElement, [svg]);
    };
    MdIcon.prototype._updateFontIconClasses = function () {
        if (!this._usingFontIcon()) {
            return;
        }
        var elem = this._elementRef.nativeElement;
        var fontSetClass = this.fontSet ?
            this._mdIconRegistry.classNameForFontAlias(this.fontSet) :
            this._mdIconRegistry.getDefaultFontSetClass();
        if (fontSetClass != this._previousFontSetClass) {
            if (this._previousFontSetClass) {
                this._renderer.setElementClass(elem, this._previousFontSetClass, false);
            }
            if (fontSetClass) {
                this._renderer.setElementClass(elem, fontSetClass, true);
            }
            this._previousFontSetClass = fontSetClass;
        }
        if (this.fontIcon != this._previousFontIconClass) {
            if (this._previousFontIconClass) {
                this._renderer.setElementClass(elem, this._previousFontIconClass, false);
            }
            if (this.fontIcon) {
                this._renderer.setElementClass(elem, this.fontIcon, true);
            }
            this._previousFontIconClass = this.fontIcon;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdIcon.prototype, "svgIcon", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdIcon.prototype, "fontSet", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdIcon.prototype, "fontIcon", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdIcon.prototype, "alt", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-label'), 
        __metadata('design:type', String)
    ], MdIcon.prototype, "hostAriaLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdIcon.prototype, "color", null);
    MdIcon = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template: '<ng-content></ng-content>',
            selector: 'md-icon, mat-icon',
            styles: [".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}"],
            host: {
                'role': 'img',
                '[class.mat-icon]': 'true',
            },
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_4__icon_registry__["a" /* MdIconRegistry */]])
    ], MdIcon);
    return MdIcon;
}());
function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, http, sanitizer) {
    return parentRegistry || new __WEBPACK_IMPORTED_MODULE_4__icon_registry__["a" /* MdIconRegistry */](http, sanitizer);
}
;
var ICON_REGISTRY_PROVIDER = {
    // If there is already an MdIconRegistry available, use that. Otherwise, provide a new one.
    provide: __WEBPACK_IMPORTED_MODULE_4__icon_registry__["a" /* MdIconRegistry */],
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), __WEBPACK_IMPORTED_MODULE_4__icon_registry__["a" /* MdIconRegistry */]], __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DomSanitizer"]],
    useFactory: ICON_REGISTRY_PROVIDER_FACTORY,
};
var MdIconModule = (function () {
    function MdIconModule() {
    }
    /** @deprecated */
    MdIconModule.forRoot = function () {
        return {
            ngModule: MdIconModule,
            providers: [],
        };
    };
    MdIconModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["HttpModule"], __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            exports: [MdIcon, __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            declarations: [MdIcon],
            providers: [ICON_REGISTRY_PROVIDER],
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconModule);
    return MdIconModule;
}());
//# sourceMappingURL=icon.js.map

/***/ }),
/* 365 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(227);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module__ = __webpack_require__(368);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__autocomplete_index__ = __webpack_require__(269);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_index__ = __webpack_require__(271);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__button_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__button_toggle_index__ = __webpack_require__(270);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__card_index__ = __webpack_require__(272);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chips_index__ = __webpack_require__(275);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__checkbox_index__ = __webpack_require__(273);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialog_index__ = __webpack_require__(296);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__grid_list_index__ = __webpack_require__(298);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__icon_index__ = __webpack_require__(300);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__input_index__ = __webpack_require__(302);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__list_index__ = __webpack_require__(304);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__menu_index__ = __webpack_require__(305);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__progress_bar_index__ = __webpack_require__(308);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__progress_spinner_index__ = __webpack_require__(309);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__radio_index__ = __webpack_require__(310);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__select_index__ = __webpack_require__(311);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__sidenav_index__ = __webpack_require__(314);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__slider_index__ = __webpack_require__(316);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__slide_toggle_index__ = __webpack_require__(315);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__snack_bar_index__ = __webpack_require__(317);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__tabs_index__ = __webpack_require__(321);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__tabs_tab_nav_bar_index__ = __webpack_require__(377);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__toolbar_index__ = __webpack_require__(326);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__tooltip_index__ = __webpack_require__(327);
/* unused harmony namespace reexport */


























//# sourceMappingURL=index.js.map

/***/ }),
/* 366 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* unused harmony export MdListDivider */
/* unused harmony export MdList */
/* unused harmony export MdListCssMatStyler */
/* unused harmony export MdNavListCssMatStyler */
/* unused harmony export MdDividerCssMatStyler */
/* unused harmony export MdListAvatarCssMatStyler */
/* unused harmony export MdListIconCssMatStyler */
/* unused harmony export MdListSubheaderCssMatStyler */
/* unused harmony export MdListItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdListModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MdListDivider = (function () {
    function MdListDivider() {
    }
    MdListDivider = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-divider, mat-divider'
        }), 
        __metadata('design:paramtypes', [])
    ], MdListDivider);
    return MdListDivider;
}());
var MdList = (function () {
    function MdList() {
    }
    MdList = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-list, mat-list, md-nav-list, mat-nav-list',
            host: {
                'role': 'list' },
            template: '<ng-content></ng-content>',
            styles: [".mat-list,.mat-nav-list{padding-top:8px;display:block}.mat-list .mat-subheader,.mat-nav-list .mat-subheader{display:block;box-sizing:border-box;height:48px;padding:16px;margin:0;font-size:14px;font-weight:500}.mat-list .mat-subheader:first-child,.mat-nav-list .mat-subheader:first-child{margin-top:-8px}.mat-list .mat-list-item,.mat-nav-list .mat-list-item{display:block}.mat-list .mat-list-item .mat-list-item-content,.mat-nav-list .mat-list-item .mat-list-item-content{display:flex;flex-direction:row;align-items:center;font-family:Roboto,\"Helvetica Neue\",sans-serif;box-sizing:border-box;font-size:16px;height:48px;padding:0 16px}.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content,.mat-nav-list .mat-list-item.mat-list-item-avatar .mat-list-item-content{height:56px}.mat-list .mat-list-item.mat-2-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-2-line .mat-list-item-content{height:72px}.mat-list .mat-list-item.mat-3-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-3-line .mat-list-item-content{height:88px}.mat-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-multi-line .mat-list-item-content{height:100%;padding:8px 16px}.mat-list .mat-list-item .mat-list-text,.mat-nav-list .mat-list-item .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list .mat-list-item .mat-list-text>*,.mat-nav-list .mat-list-item .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list .mat-list-item .mat-list-text:empty,.mat-nav-list .mat-list-item .mat-list-text:empty{display:none}.mat-list .mat-list-item .mat-list-text:first-child,.mat-nav-list .mat-list-item .mat-list-text:first-child{padding:0}.mat-list .mat-list-item .mat-list-avatar,.mat-nav-list .mat-list-item .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list .mat-list-item .mat-list-icon,.mat-nav-list .mat-list-item .mat-list-icon{width:24px;height:24px;border-radius:50%;padding:4px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list[dense],.mat-nav-list[dense]{padding-top:4px;display:block}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader{display:block;box-sizing:border-box;height:40px;padding:16px;margin:0;font-size:13px;font-weight:500}.mat-list[dense] .mat-subheader:first-child,.mat-nav-list[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item{display:block}.mat-list[dense] .mat-list-item .mat-list-item-content,.mat-nav-list[dense] .mat-list-item .mat-list-item-content{display:flex;flex-direction:row;align-items:center;font-family:Roboto,\"Helvetica Neue\",sans-serif;box-sizing:border-box;font-size:13px;height:40px;padding:0 16px}.mat-list[dense] .mat-list-item.mat-list-item-avatar .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-list-item-avatar .mat-list-item-content{height:48px}.mat-list[dense] .mat-list-item.mat-2-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-2-line .mat-list-item-content{height:60px}.mat-list[dense] .mat-list-item.mat-3-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-3-line .mat-list-item-content{height:76px}.mat-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content{height:100%;padding:8px 16px}.mat-list[dense] .mat-list-item .mat-list-text,.mat-nav-list[dense] .mat-list-item .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list[dense] .mat-list-item .mat-list-text>*,.mat-nav-list[dense] .mat-list-item .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list[dense] .mat-list-item .mat-list-text:empty,.mat-nav-list[dense] .mat-list-item .mat-list-text:empty{display:none}.mat-list[dense] .mat-list-item .mat-list-text:first-child,.mat-nav-list[dense] .mat-list-item .mat-list-text:first-child{padding:0}.mat-list[dense] .mat-list-item .mat-list-avatar,.mat-nav-list[dense] .mat-list-item .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list[dense] .mat-list-item .mat-list-icon,.mat-nav-list[dense] .mat-list-item .mat-list-icon{width:24px;height:24px;border-radius:50%;padding:4px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2){font-size:13px}.mat-divider{display:block;border-top-style:solid;border-top-width:1px;margin:0}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item-content{cursor:pointer}.mat-nav-list .mat-list-item-content.mat-list-item-focus,.mat-nav-list .mat-list-item-content:hover{outline:0}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [])
    ], MdList);
    return MdList;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdListCssMatStyler = (function () {
    function MdListCssMatStyler() {
    }
    MdListCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-list, mat-list',
            host: {
                '[class.mat-list]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdListCssMatStyler);
    return MdListCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdNavListCssMatStyler = (function () {
    function MdNavListCssMatStyler() {
    }
    MdNavListCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-nav-list, mat-nav-list',
            host: {
                '[class.mat-nav-list]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdNavListCssMatStyler);
    return MdNavListCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdDividerCssMatStyler = (function () {
    function MdDividerCssMatStyler() {
    }
    MdDividerCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-divider, mat-divider',
            host: {
                '[class.mat-divider]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdDividerCssMatStyler);
    return MdDividerCssMatStyler;
}());
/* Need directive for a ContentChild query in list-item */
var MdListAvatarCssMatStyler = (function () {
    function MdListAvatarCssMatStyler() {
    }
    MdListAvatarCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-list-avatar], [mat-list-avatar]',
            host: {
                '[class.mat-list-avatar]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdListAvatarCssMatStyler);
    return MdListAvatarCssMatStyler;
}());
/* Need directive to add mat- CSS styling */
var MdListIconCssMatStyler = (function () {
    function MdListIconCssMatStyler() {
    }
    MdListIconCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-list-icon], [mat-list-icon]',
            host: {
                '[class.mat-list-icon]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdListIconCssMatStyler);
    return MdListIconCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 */
var MdListSubheaderCssMatStyler = (function () {
    function MdListSubheaderCssMatStyler() {
    }
    MdListSubheaderCssMatStyler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-subheader], [mat-subheader]',
            host: {
                '[class.mat-subheader]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdListSubheaderCssMatStyler);
    return MdListSubheaderCssMatStyler;
}());
var MdListItem = (function () {
    function MdListItem(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._hasFocus = false;
    }
    Object.defineProperty(MdListItem.prototype, "_hasAvatar", {
        set: function (avatar) {
            this._renderer.setElementClass(this._element.nativeElement, 'mat-list-item-avatar', avatar != null);
        },
        enumerable: true,
        configurable: true
    });
    MdListItem.prototype.ngAfterContentInit = function () {
        this._lineSetter = new __WEBPACK_IMPORTED_MODULE_1__core__["z" /* MdLineSetter */](this._lines, this._renderer, this._element);
    };
    MdListItem.prototype._handleFocus = function () {
        this._hasFocus = true;
    };
    MdListItem.prototype._handleBlur = function () {
        this._hasFocus = false;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__core__["A" /* MdLine */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdListItem.prototype, "_lines", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(MdListAvatarCssMatStyler), 
        __metadata('design:type', MdListAvatarCssMatStyler), 
        __metadata('design:paramtypes', [MdListAvatarCssMatStyler])
    ], MdListItem.prototype, "_hasAvatar", null);
    MdListItem = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-list-item, mat-list-item, a[md-list-item], a[mat-list-item]',
            host: {
                'role': 'listitem',
                '(focus)': '_handleFocus()',
                '(blur)': '_handleBlur()',
                '[class.mat-list-item]': 'true',
            },
            template: "<div class=\"mat-list-item-content\" [class.mat-list-item-focus]=\"_hasFocus\"><ng-content select=\"[md-list-avatar],[md-list-icon], [mat-list-avatar], [mat-list-icon]\"></ng-content><div class=\"mat-list-text\"><ng-content select=\"[md-line], [mat-line]\"></ng-content></div><ng-content></ng-content></div>",
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdListItem);
    return MdListItem;
}());
var MdListModule = (function () {
    function MdListModule() {
    }
    /** @deprecated */
    MdListModule.forRoot = function () {
        return {
            ngModule: MdListModule,
            providers: []
        };
    };
    MdListModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["B" /* MdLineModule */], __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            exports: [
                MdList,
                MdListItem,
                MdListDivider,
                MdListAvatarCssMatStyler,
                __WEBPACK_IMPORTED_MODULE_1__core__["B" /* MdLineModule */],
                __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */],
                MdListIconCssMatStyler,
                MdListCssMatStyler,
                MdNavListCssMatStyler,
                MdDividerCssMatStyler,
                MdListSubheaderCssMatStyler
            ],
            declarations: [
                MdList,
                MdListItem,
                MdListDivider,
                MdListAvatarCssMatStyler,
                MdListIconCssMatStyler,
                MdListCssMatStyler,
                MdNavListCssMatStyler,
                MdDividerCssMatStyler,
                MdListSubheaderCssMatStyler
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdListModule);
    return MdListModule;
}());
//# sourceMappingURL=list.js.map

/***/ }),
/* 367 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_directive__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_item__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_trigger__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_ripple_ripple__ = __webpack_require__(235);
/* unused harmony reexport MdMenu */
/* unused harmony reexport MdMenuItem */
/* unused harmony reexport MdMenuTrigger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdMenuModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MdMenuModule = (function () {
    function MdMenuModule() {
    }
    /** @deprecated */
    MdMenuModule.forRoot = function () {
        return {
            ngModule: MdMenuModule,
            providers: [],
        };
    };
    MdMenuModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__core__["d" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_6__core_ripple_ripple__["a" /* MdRippleModule */], __WEBPACK_IMPORTED_MODULE_2__core__["e" /* CompatibilityModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__menu_directive__["a" /* MdMenu */], __WEBPACK_IMPORTED_MODULE_4__menu_item__["a" /* MdMenuItem */], __WEBPACK_IMPORTED_MODULE_5__menu_trigger__["a" /* MdMenuTrigger */], __WEBPACK_IMPORTED_MODULE_2__core__["e" /* CompatibilityModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__menu_directive__["a" /* MdMenu */], __WEBPACK_IMPORTED_MODULE_4__menu_item__["a" /* MdMenuItem */], __WEBPACK_IMPORTED_MODULE_5__menu_trigger__["a" /* MdMenuTrigger */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdMenuModule);
    return MdMenuModule;
}());
//# sourceMappingURL=menu.js.map

/***/ }),
/* 368 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_index__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_toggle_index__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_index__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__checkbox_index__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__radio_index__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__select_index__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__slide_toggle_index__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__slider_index__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sidenav_index__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__list_index__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__grid_list_index__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__card_index__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__chips_index__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__icon_index__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__progress_spinner_index__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__progress_bar_index__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__input_index__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__snack_bar_index__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__tabs_index__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__toolbar_index__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__tooltip_index__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__menu_index__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__dialog_index__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__core_platform_index__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__autocomplete_index__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__core_style_index__ = __webpack_require__(290);
/* unused harmony export MaterialRootModule */
/* unused harmony export MaterialModule */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























var MATERIAL_MODULES = [
    __WEBPACK_IMPORTED_MODULE_25__autocomplete_index__["a" /* MdAutocompleteModule */],
    __WEBPACK_IMPORTED_MODULE_3__button_index__["a" /* MdButtonModule */],
    __WEBPACK_IMPORTED_MODULE_2__button_toggle_index__["a" /* MdButtonToggleModule */],
    __WEBPACK_IMPORTED_MODULE_12__card_index__["a" /* MdCardModule */],
    __WEBPACK_IMPORTED_MODULE_13__chips_index__["a" /* MdChipsModule */],
    __WEBPACK_IMPORTED_MODULE_4__checkbox_index__["a" /* MdCheckboxModule */],
    __WEBPACK_IMPORTED_MODULE_23__dialog_index__["a" /* MdDialogModule */],
    __WEBPACK_IMPORTED_MODULE_11__grid_list_index__["a" /* MdGridListModule */],
    __WEBPACK_IMPORTED_MODULE_14__icon_index__["a" /* MdIconModule */],
    __WEBPACK_IMPORTED_MODULE_17__input_index__["a" /* MdInputModule */],
    __WEBPACK_IMPORTED_MODULE_10__list_index__["a" /* MdListModule */],
    __WEBPACK_IMPORTED_MODULE_22__menu_index__["a" /* MdMenuModule */],
    __WEBPACK_IMPORTED_MODULE_16__progress_bar_index__["a" /* MdProgressBarModule */],
    __WEBPACK_IMPORTED_MODULE_15__progress_spinner_index__["a" /* MdProgressSpinnerModule */],
    __WEBPACK_IMPORTED_MODULE_5__radio_index__["a" /* MdRadioModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["w" /* MdRippleModule */],
    __WEBPACK_IMPORTED_MODULE_6__select_index__["a" /* MdSelectModule */],
    __WEBPACK_IMPORTED_MODULE_9__sidenav_index__["a" /* MdSidenavModule */],
    __WEBPACK_IMPORTED_MODULE_8__slider_index__["a" /* MdSliderModule */],
    __WEBPACK_IMPORTED_MODULE_7__slide_toggle_index__["a" /* MdSlideToggleModule */],
    __WEBPACK_IMPORTED_MODULE_18__snack_bar_index__["a" /* MdSnackBarModule */],
    __WEBPACK_IMPORTED_MODULE_19__tabs_index__["a" /* MdTabsModule */],
    __WEBPACK_IMPORTED_MODULE_20__toolbar_index__["a" /* MdToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_21__tooltip_index__["a" /* MdTooltipModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["d" /* OverlayModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["o" /* PortalModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["G" /* RtlModule */],
    __WEBPACK_IMPORTED_MODULE_26__core_style_index__["b" /* StyleModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["C" /* A11yModule */],
    __WEBPACK_IMPORTED_MODULE_24__core_platform_index__["a" /* PlatformModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["H" /* ProjectionModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["e" /* CompatibilityModule */],
    __WEBPACK_IMPORTED_MODULE_1__core_index__["I" /* ObserveContentModule */]
];
var MaterialRootModule = (function () {
    function MaterialRootModule() {
    }
    MaterialRootModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_25__autocomplete_index__["a" /* MdAutocompleteModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__button_index__["a" /* MdButtonModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__card_index__["a" /* MdCardModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_13__chips_index__["a" /* MdChipsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__checkbox_index__["a" /* MdCheckboxModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11__grid_list_index__["a" /* MdGridListModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_17__input_index__["a" /* MdInputModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__list_index__["a" /* MdListModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_16__progress_bar_index__["a" /* MdProgressBarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_15__progress_spinner_index__["a" /* MdProgressSpinnerModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["w" /* MdRippleModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6__select_index__["a" /* MdSelectModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9__sidenav_index__["a" /* MdSidenavModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_19__tabs_index__["a" /* MdTabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_20__toolbar_index__["a" /* MdToolbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["o" /* PortalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["H" /* ProjectionModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["G" /* RtlModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["I" /* ObserveContentModule */].forRoot(),
                // These modules include providers.
                __WEBPACK_IMPORTED_MODULE_1__core_index__["C" /* A11yModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2__button_toggle_index__["a" /* MdButtonToggleModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23__dialog_index__["a" /* MdDialogModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_14__icon_index__["a" /* MdIconModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_22__menu_index__["a" /* MdMenuModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__radio_index__["a" /* MdRadioModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8__slider_index__["a" /* MdSliderModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__slide_toggle_index__["a" /* MdSlideToggleModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18__snack_bar_index__["a" /* MdSnackBarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_21__tooltip_index__["a" /* MdTooltipModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_24__core_platform_index__["a" /* PlatformModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["d" /* OverlayModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__core_index__["e" /* CompatibilityModule */].forRoot(),
            ],
            exports: MATERIAL_MODULES,
        }), 
        __metadata('design:paramtypes', [])
    ], MaterialRootModule);
    return MaterialRootModule;
}());
var MaterialModule = (function () {
    function MaterialModule() {
    }
    /** @deprecated */
    MaterialModule.forRoot = function () {
        return { ngModule: MaterialRootModule };
    };
    MaterialModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: MATERIAL_MODULES,
            exports: MATERIAL_MODULES,
        }), 
        __metadata('design:paramtypes', [])
    ], MaterialModule);
    return MaterialModule;
}());
//# sourceMappingURL=module.js.map

/***/ }),
/* 369 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_compatibility_compatibility__ = __webpack_require__(236);
/* unused harmony export MdProgressBar */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdProgressBarModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// TODO(josephperrott): Benchpress tests.
// TODO(josephperrott): Add ARIA attributes for progressbar "for".
/**
 * <md-progress-bar> component.
 */
var MdProgressBar = (function () {
    function MdProgressBar() {
        /** Color of the progress bar. */
        this.color = 'primary';
        this._value = 0;
        this._bufferValue = 0;
        /**
         * Mode of the progress bar.
         *
         * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
         * 'determinate'.
         * Mirrored to mode attribute.
         */
        this.mode = 'determinate';
    }
    Object.defineProperty(MdProgressBar.prototype, "value", {
        /** Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow. */
        get: function () { return this._value; },
        set: function (v) { this._value = clamp(v || 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressBar.prototype, "bufferValue", {
        /** Buffer value of the progress bar. Defaults to zero. */
        get: function () { return this._bufferValue; },
        set: function (v) { this._bufferValue = clamp(v || 0); },
        enumerable: true,
        configurable: true
    });
    /** Gets the current transform value for the progress bar's primary indicator. */
    MdProgressBar.prototype._primaryTransform = function () {
        var scale = this.value / 100;
        return { transform: "scaleX(" + scale + ")" };
    };
    /**
     * Gets the current transform value for the progress bar's buffer indicator.  Only used if the
     * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
     */
    MdProgressBar.prototype._bufferTransform = function () {
        if (this.mode == 'buffer') {
            var scale = this.bufferValue / 100;
            return { transform: "scaleX(" + scale + ")" };
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "color", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.aria-valuenow'), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "bufferValue", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('attr.mode'), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "mode", void 0);
    MdProgressBar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-progress-bar, mat-progress-bar',
            host: {
                'role': 'progressbar',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
                '[class.mat-primary]': 'color == "primary"',
                '[class.mat-accent]': 'color == "accent"',
                '[class.mat-warn]': 'color == "warn"',
                '[class.mat-progress-bar]': 'true',
            },
            template: "<div class=\"mat-progress-bar-background mat-progress-bar-element\"></div><div class=\"mat-progress-bar-buffer mat-progress-bar-element\" [ngStyle]=\"_bufferTransform()\"></div><div class=\"mat-progress-bar-primary mat-progress-bar-fill mat-progress-bar-element\" [ngStyle]=\"_primaryTransform()\"></div><div class=\"mat-progress-bar-secondary mat-progress-bar-fill mat-progress-bar-element\"></div>",
            styles: [":host{display:block;height:5px;overflow:hidden;position:relative;transform:translateZ(0);transition:opacity 250ms linear;width:100%}:host .mat-progress-bar-element,:host .mat-progress-bar-fill::after{height:100%;position:absolute;width:100%}:host .mat-progress-bar-background{background-repeat:repeat-x;background-size:10px 4px;display:none}:host .mat-progress-bar-buffer{transform-origin:top left;transition:transform 250ms ease}:host .mat-progress-bar-secondary{display:none}:host .mat-progress-bar-fill{animation:none;transform-origin:top left;transition:transform 250ms ease}:host .mat-progress-bar-fill::after{animation:none;content:'';display:inline-block;left:0}:host[mode=query]{transform:rotateZ(180deg)}:host[mode=query] .mat-progress-bar-fill,:host[mode=indeterminate] .mat-progress-bar-fill{transition:none}:host[mode=query] .mat-progress-bar-primary,:host[mode=indeterminate] .mat-progress-bar-primary{animation:mat-progress-bar-primary-indeterminate-translate 2s infinite linear;left:-145.166611%}:host[mode=query] .mat-progress-bar-primary.mat-progress-bar-fill::after,:host[mode=indeterminate] .mat-progress-bar-primary.mat-progress-bar-fill::after{animation:mat-progress-bar-primary-indeterminate-scale 2s infinite linear}:host[mode=query] .mat-progress-bar-secondary,:host[mode=indeterminate] .mat-progress-bar-secondary{animation:mat-progress-bar-secondary-indeterminate-translate 2s infinite linear;left:-54.888891%;display:block}:host[mode=query] .mat-progress-bar-secondary.mat-progress-bar-fill::after,:host[mode=indeterminate] .mat-progress-bar-secondary.mat-progress-bar-fill::after{animation:mat-progress-bar-secondary-indeterminate-scale 2s infinite linear}:host[mode=buffer] .mat-progress-bar-background{animation:mat-progress-bar-background-scroll 250ms infinite linear;display:block}:host-context([dir=rtl]){transform:rotateY(180deg)}@keyframes mat-progress-bar-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(.5,0,.70173,.49582);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);transform:translateX(83.67142%)}100%{transform:translateX(200.61106%)}}@keyframes mat-progress-bar-primary-indeterminate-scale{0%{transform:scaleX(.08)}36.65%{animation-timing-function:cubic-bezier(.33473,.12482,.78584,1);transform:scaleX(.08)}69.15%{animation-timing-function:cubic-bezier(.06,.11,.6,1);transform:scaleX(.66148)}100%{transform:scaleX(.08)}}@keyframes mat-progress-bar-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(.15,0,.51506,.40969);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);transform:translateX(37.65191%)}48.35%{animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);transform:translateX(84.38617%)}100%{transform:translateX(160.27778%)}}@keyframes mat-progress-bar-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(.15,0,.51506,.40969);transform:scaleX(.08)}19.15%{animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);transform:scaleX(.4571)}44.15%{animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);transform:scaleX(.72796)}100%{transform:scaleX(.08)}}@keyframes mat-progress-bar-background-scroll{to{transform:translateX(-10px)}}"],
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressBar);
    return MdProgressBar;
}());
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.max(min, Math.min(max, v));
}
var MdProgressBarModule = (function () {
    function MdProgressBarModule() {
    }
    /** @deprecated */
    MdProgressBarModule.forRoot = function () {
        return {
            ngModule: MdProgressBarModule,
            providers: []
        };
    };
    MdProgressBarModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__core_compatibility_compatibility__["a" /* CompatibilityModule */]],
            exports: [MdProgressBar, __WEBPACK_IMPORTED_MODULE_2__core_compatibility_compatibility__["a" /* CompatibilityModule */]],
            declarations: [MdProgressBar],
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressBarModule);
    return MdProgressBarModule;
}());
//# sourceMappingURL=progress-bar.js.map

/***/ }),
/* 370 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_spinner__ = __webpack_require__(262);
/* unused harmony reexport MdProgressCircle */
/* unused harmony reexport MdProgressCircleModule */
/** @deprecated */

/** @deprecated */

//# sourceMappingURL=progress-circle.js.map

/***/ }),
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_coercion_boolean_property__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_overlay_position_viewport_ruler__ = __webpack_require__(231);
/* unused harmony export MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR */
/* unused harmony export MdRadioChange */
/* unused harmony export MdRadioGroup */
/* unused harmony export MdRadioButton */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdRadioModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






/**
 * Provider Expression that allows md-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
var MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdRadioGroup; }),
    multi: true
};
var _uniqueIdCounter = 0;
/** Change event object emitted by MdRadio and MdRadioGroup. */
var MdRadioChange = (function () {
    function MdRadioChange() {
    }
    return MdRadioChange;
}());
/**
 * A group of radio buttons. May contain one or more `<md-radio-button>` elements.
 */
var MdRadioGroup = (function () {
    function MdRadioGroup() {
        /**
         * Selected value for group. Should equal the value of the selected radio button if there *is*
         * a corresponding radio button with a matching value. If there is *not* such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         */
        this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        this._name = "md-radio-group-" + _uniqueIdCounter++;
        /** Disables all individual radio buttons assigned to this group. */
        this._disabled = false;
        /** The currently selected radio button. Should match value. */
        this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** The method to be called in order to update ngModel */
        this._controlValueAccessorChangeFn = function (value) { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @docs-private
         */
        this.onTouched = function () { };
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Child radio buttons. */
        this._radios = null;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        this.labelPosition = 'after';
    }
    Object.defineProperty(MdRadioGroup.prototype, "name", {
        /** Name of the radio button group. All radio buttons inside this group will use this name. */
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this._updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioGroup.prototype, "align", {
        /**
         * Alignment of the radio-buttons relative to their labels. Can be 'before' or 'after'.
         * @deprecated
         */
        get: function () {
            // align refers to the checkbox relative to the label, while labelPosition refers to the
            // label relative to the checkbox. As such, they are inverted.
            return this.labelPosition == 'after' ? 'start' : 'end';
        },
        set: function (v) {
            this.labelPosition = (v == 'start') ? 'after' : 'before';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioGroup.prototype, "disabled", {
        /** Whether the radio button is disabled. */
        get: function () { return this._disabled; },
        set: function (value) {
            // The presence of *any* disabled value makes the component disabled, *except* for false.
            this._disabled = (value != null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioGroup.prototype, "value", {
        /** Value of the radio button. */
        get: function () { return this._value; },
        set: function (newValue) {
            if (this._value != newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this._updateSelectedRadioFromValue();
                this._checkSelectedRadioButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    MdRadioGroup.prototype._checkSelectedRadioButton = function () {
        if (this.selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    Object.defineProperty(MdRadioGroup.prototype, "selected", {
        /** Whether the radio button is selected. */
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this._checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    MdRadioGroup.prototype.ngAfterContentInit = function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on MdRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the MdRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    MdRadioGroup.prototype._touch = function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    MdRadioGroup.prototype._updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
            });
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    MdRadioGroup.prototype._updateSelectedRadioFromValue = function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected != null && this._selected.value == this._value;
        if (this._radios != null && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(function (radio) {
                radio.checked = _this.value == radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    /** Dispatch change event with current selection and group value. */
    MdRadioGroup.prototype._emitChangeEvent = function () {
        if (this._isInitialized) {
            var event_1 = new MdRadioChange();
            event_1.source = this._selected;
            event_1.value = this._value;
            this.change.emit(event_1);
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    MdRadioGroup.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MdRadioGroup.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MdRadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    MdRadioGroup.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdRadioGroup.prototype, "change", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdRadioButton; })), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdRadioGroup.prototype, "_radios", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdRadioGroup.prototype, "name", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioGroup.prototype, "align", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioGroup.prototype, "labelPosition", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdRadioGroup.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioGroup.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioGroup.prototype, "selected", null);
    MdRadioGroup = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-radio-group, mat-radio-group',
            providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'radiogroup',
                '[class.mat-radio-group]': 'true',
            },
        }), 
        __metadata('design:paramtypes', [])
    ], MdRadioGroup);
    return MdRadioGroup;
}());
/**
 * A radio-button. May be inside of
 */
var MdRadioButton = (function () {
    function MdRadioButton(radioGroup, _elementRef, _renderer, radioDispatcher) {
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.radioDispatcher = radioDispatcher;
        /** Whether this radio is checked. */
        this._checked = false;
        /** The unique ID for the radio button. */
        this.id = "md-radio-" + _uniqueIdCounter++;
        /** Value assigned to this radio.*/
        this._value = null;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.radioGroup = radioGroup;
        radioDispatcher.listen(function (id, name) {
            if (id != _this.id && name == _this.name) {
                _this.checked = false;
            }
        });
    }
    Object.defineProperty(MdRadioButton.prototype, "disableRipple", {
        /** Whether the ripple effect for this radio button is disabled. */
        get: function () { return this._disableRipple; },
        set: function (value) { this._disableRipple = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core_coercion_boolean_property__["a" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<md-radio-button>` */
        get: function () {
            return this.id + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "checked", {
        /** Whether this radio button is checked. */
        get: function () {
            return this._checked;
        },
        set: function (newCheckedState) {
            if (this._checked != newCheckedState) {
                this._checked = newCheckedState;
                if (newCheckedState && this.radioGroup && this.radioGroup.value != this.value) {
                    this.radioGroup.selected = this;
                }
                else if (!newCheckedState && this.radioGroup && this.radioGroup.value == this.value) {
                    // When unchecking the selected radio button, update the selected radio
                    // property on the group.
                    this.radioGroup.selected = null;
                }
                if (newCheckedState) {
                    // Notify all radio buttons with the same name to un-check.
                    this.radioDispatcher.notify(this.id, this.name);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "value", {
        /** The value of this radio button. */
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value != value) {
                this._value = value;
                if (this.radioGroup != null) {
                    if (!this.checked) {
                        // Update checked when the value changed to match the radio group's value
                        this.checked = this.radioGroup.value == value;
                    }
                    if (this.checked) {
                        this.radioGroup.selected = this;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "align", {
        /**
         * Whether or not the radio-button should appear before or after the label.
         * @deprecated
         */
        get: function () {
            // align refers to the checkbox relative to the label, while labelPosition refers to the
            // label relative to the checkbox. As such, they are inverted.
            return this.labelPosition == 'after' ? 'start' : 'end';
        },
        set: function (v) {
            this.labelPosition = (v == 'start') ? 'after' : 'before';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "labelPosition", {
        /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        get: function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "disabled", {
        /** Whether the radio button is disabled. */
        get: function () {
            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
        },
        set: function (value) {
            // The presence of *any* disabled value makes the component disabled, *except* for false.
            this._disabled = (value != null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    MdRadioButton.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    /** Dispatch change event with current value. */
    MdRadioButton.prototype._emitChangeEvent = function () {
        var event = new MdRadioChange();
        event.source = this;
        event.value = this._value;
        this.change.emit(event);
    };
    MdRadioButton.prototype._isRippleDisabled = function () {
        return this.disableRipple || this.disabled;
    };
    /**
     * We use a hidden native input field to handle changes to focus state via keyboard navigation,
     * with visual rendering done separately. The native element is kept in sync with the overall
     * state of the component.
     */
    MdRadioButton.prototype._onInputFocus = function () {
        this._isFocused = true;
    };
    /** Focuses the radio button. */
    MdRadioButton.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
        this._onInputFocus();
    };
    MdRadioButton.prototype._onInputBlur = function () {
        this._isFocused = false;
        if (this.radioGroup) {
            this.radioGroup._touch();
        }
    };
    MdRadioButton.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /**
     * Triggered when the radio button received a click or the input recognized any change.
     * Clicking on a label element, will trigger a change event on the associated input.
     */
    MdRadioButton.prototype._onInputChange = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        var groupValueChanged = this.radioGroup && this.value != this.radioGroup.value;
        this.checked = true;
        this._emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup._controlValueAccessorChangeFn(this.value);
            this.radioGroup._touch();
            if (groupValueChanged) {
                this.radioGroup._emitChangeEvent();
            }
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.mat-radio-focused'), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "_isFocused", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('id'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdRadioButton.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdRadioButton.prototype, "name", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-label'), 
        __metadata('design:type', String)
    ], MdRadioButton.prototype, "ariaLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-labelledby'), 
        __metadata('design:type', String)
    ], MdRadioButton.prototype, "ariaLabelledby", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "disableRipple", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MdRadioButton.prototype, "change", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdRadioButton.prototype, "_inputElement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.mat-radio-checked'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "checked", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioButton.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioButton.prototype, "align", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdRadioButton.prototype, "labelPosition", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.mat-radio-disabled'),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "disabled", null);
    MdRadioButton = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-radio-button, mat-radio-button',
            template: "<label [attr.for]=\"inputId\" class=\"mat-radio-label\" #label><div class=\"mat-radio-container\"><div class=\"mat-radio-outer-circle\"></div><div class=\"mat-radio-inner-circle\"></div><div md-ripple *ngIf=\"!_isRippleDisabled()\" class=\"mat-radio-ripple\" [mdRippleTrigger]=\"label\" [mdRippleCentered]=\"true\" [mdRippleSpeedFactor]=\"0.3\"></div></div><input #input class=\"mat-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onInputChange($event)\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (click)=\"_onInputClick($event)\"><div class=\"mat-radio-label-content\" [class.mat-radio-label-before]=\"labelPosition == 'before'\"><ng-content></ng-content></div></label>",
            styles: [".mat-radio-button{display:inline-block;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-radio-label{cursor:pointer;display:inline-flex;align-items:baseline;white-space:nowrap}.mat-radio-container{box-sizing:border-box;display:inline-block;height:20px;position:relative;width:20px;top:2px}.mat-radio-inner-circle,.mat-radio-outer-circle{box-sizing:border-box;height:20px;left:0;top:0;width:20px;position:absolute;border-radius:50%}.mat-radio-outer-circle{transition:border-color ease 280ms;border-width:2px;border-style:solid}.mat-radio-inner-circle{transition:transform ease 280ms,background-color ease 280ms;transform:scale(0)}.mat-radio-checked .mat-radio-inner-circle{transform:scale(.5)}.mat-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mat-radio-label-content{padding-right:8px;padding-left:0}.mat-radio-label-content.mat-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .mat-radio-label-content.mat-radio-label-before{padding-right:0;padding-left:8px}.mat-radio-disabled,.mat-radio-disabled .mat-radio-label{cursor:default}.mat-radio-ripple{position:absolute;left:-15px;top:-15px;right:-15px;bottom:-15px;border-radius:50%;z-index:1;pointer-events:none}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            host: {
                '[class.mat-radio-button]': 'true',
            }
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [MdRadioGroup, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_3__core__["v" /* UniqueSelectionDispatcher */]])
    ], MdRadioButton);
    return MdRadioButton;
}());
var MdRadioModule = (function () {
    function MdRadioModule() {
    }
    /** @deprecated */
    MdRadioModule.forRoot = function () {
        return {
            ngModule: MdRadioModule,
            providers: [],
        };
    };
    MdRadioModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_3__core__["w" /* MdRippleModule */], __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            exports: [MdRadioGroup, MdRadioButton, __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__core__["x" /* UNIQUE_SELECTION_DISPATCHER_PROVIDER */], __WEBPACK_IMPORTED_MODULE_5__core_overlay_position_viewport_ruler__["b" /* VIEWPORT_RULER_PROVIDER */]],
            declarations: [MdRadioGroup, MdRadioButton],
        }), 
        __metadata('design:paramtypes', [])
    ], MdRadioModule);
    return MdRadioModule;
}());
//# sourceMappingURL=radio.js.map

/***/ }),
/* 372 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_a11y_index__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_a11y_focus_trap__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_keyboard_keycodes__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_overlay_overlay_directives__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_first__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_first__);
/* unused harmony export MdDuplicatedSidenavError */
/* unused harmony export MdSidenavToggleResult */
/* unused harmony export MdSidenav */
/* unused harmony export MdSidenavContainer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSidenavModule; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








/** Exception thrown when two MdSidenav are matching the same side. */
var MdDuplicatedSidenavError = (function (_super) {
    __extends(MdDuplicatedSidenavError, _super);
    function MdDuplicatedSidenavError(align) {
        _super.call(this, "A sidenav was already declared for 'align=\"" + align + "\"'");
    }
    return MdDuplicatedSidenavError;
}(__WEBPACK_IMPORTED_MODULE_2__core__["f" /* MdError */]));
/** Sidenav toggle promise result. */
var MdSidenavToggleResult = (function () {
    function MdSidenavToggleResult(type, animationFinished) {
        this.type = type;
        this.animationFinished = animationFinished;
    }
    return MdSidenavToggleResult;
}());
/**
 * <md-sidenav> component.
 *
 * This component corresponds to the drawer of the sidenav.
 *
 * Please refer to README.md for examples on how to use it.
 */
var MdSidenav = (function () {
    /**
     * @param _elementRef The DOM element reference. Used for transition and width calculation.
     *     If not available we do not hook on transitions.
     */
    function MdSidenav(_elementRef, _renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Alignment of the sidenav (direction neutral); whether 'start' or 'end'. */
        this._align = 'start';
        this._valid = true;
        /** Mode of the sidenav; whether 'over' or 'side'. */
        this.mode = 'over';
        this._disableClose = false;
        /** Whether the sidenav is opened. */
        this._opened = false;
        /** Event emitted when the sidenav is being opened. Use this to synchronize animations. */
        this.onOpenStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the sidenav is fully opened. */
        this.onOpen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the sidenav is being closed. Use this to synchronize animations. */
        this.onCloseStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the sidenav is fully closed. */
        this.onClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the sidenav alignment changes. */
        this.onAlignChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** The current toggle animation promise. `null` if no animation is in progress. */
        this._toggleAnimationPromise = null;
        /**
         * The current toggle animation promise resolution function.
         * `null` if no animation is in progress.
         */
        this._resolveToggleAnimationPromise = null;
        this._elementFocusedBeforeSidenavWasOpened = null;
        this.onOpen.subscribe(function () {
            _this._elementFocusedBeforeSidenavWasOpened = document.activeElement;
            if (!_this.isFocusTrapDisabled) {
                _this._focusTrap.focusFirstTabbableElementWhenReady();
            }
        });
        this.onClose.subscribe(function () {
            if (_this._elementFocusedBeforeSidenavWasOpened instanceof HTMLElement) {
                _this._renderer.invokeElementMethod(_this._elementFocusedBeforeSidenavWasOpened, 'focus');
            }
            else {
                _this._renderer.invokeElementMethod(_this._elementRef.nativeElement, 'blur');
            }
            _this._elementFocusedBeforeSidenavWasOpened = null;
        });
    }
    Object.defineProperty(MdSidenav.prototype, "valid", {
        /** Whether this md-sidenav is part of a valid md-sidenav-container configuration. */
        get: function () { return this._valid; },
        set: function (value) {
            value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["n" /* coerceBooleanProperty */])(value);
            // When the drawers are not in a valid configuration we close them all until they are in a valid
            // configuration again.
            if (!value) {
                this.close();
            }
            this._valid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "align", {
        /** Direction which the sidenav is aligned in. */
        get: function () { return this._align; },
        set: function (value) {
            // Make sure we have a valid value.
            value = (value == 'end') ? 'end' : 'start';
            if (value != this._align) {
                this._align = value;
                this.onAlignChanged.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "disableClose", {
        /** Whether the sidenav can be closed with the escape key or not. */
        get: function () { return this._disableClose; },
        set: function (value) { this._disableClose = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "isFocusTrapDisabled", {
        get: function () {
            // The focus trap is only enabled when the sidenav is open in any mode other than side.
            return !this.opened || this.mode == 'side';
        },
        enumerable: true,
        configurable: true
    });
    MdSidenav.prototype.ngAfterContentInit = function () {
        // This can happen when the sidenav is set to opened in the template and the transition
        // isn't ended.
        if (this._toggleAnimationPromise) {
            this._resolveToggleAnimationPromise(true);
            this._toggleAnimationPromise = this._resolveToggleAnimationPromise = null;
        }
    };
    Object.defineProperty(MdSidenav.prototype, "opened", {
        /**
         * Whether the sidenav is opened. We overload this because we trigger an event when it
         * starts or end.
         */
        get: function () { return this._opened; },
        set: function (v) {
            this.toggle(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["n" /* coerceBooleanProperty */])(v));
        },
        enumerable: true,
        configurable: true
    });
    /** Open this sidenav, and return a Promise that will resolve when it's fully opened (or get
     * rejected if it didn't). */
    MdSidenav.prototype.open = function () {
        return this.toggle(true);
    };
    /**
     * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get
     * rejected if it didn't).
     */
    MdSidenav.prototype.close = function () {
        return this.toggle(false);
    };
    /**
     * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or
     * close() when it's closed.
     * @param isOpen Whether the sidenav should be open.
     * @returns Resolves with the result of whether the sidenav was opened or closed.
     */
    MdSidenav.prototype.toggle = function (isOpen) {
        var _this = this;
        if (isOpen === void 0) { isOpen = !this.opened; }
        if (!this.valid) {
            return Promise.resolve(new MdSidenavToggleResult(isOpen ? 'open' : 'close', true));
        }
        // Shortcut it if we're already opened.
        if (isOpen === this.opened) {
            return this._toggleAnimationPromise ||
                Promise.resolve(new MdSidenavToggleResult(isOpen ? 'open' : 'close', true));
        }
        this._opened = isOpen;
        if (isOpen) {
            this.onOpenStart.emit();
        }
        else {
            this.onCloseStart.emit();
        }
        if (this._toggleAnimationPromise) {
            this._resolveToggleAnimationPromise(false);
        }
        this._toggleAnimationPromise = new Promise(function (resolve) {
            _this._resolveToggleAnimationPromise = function (animationFinished) {
                return resolve(new MdSidenavToggleResult(isOpen ? 'open' : 'close', animationFinished));
            };
        });
        return this._toggleAnimationPromise;
    };
    /**
     * Handles the keyboard events.
     * @docs-private
     */
    MdSidenav.prototype.handleKeydown = function (event) {
        if (event.keyCode === __WEBPACK_IMPORTED_MODULE_5__core_keyboard_keycodes__["k" /* ESCAPE */] && !this.disableClose) {
            this.close();
            event.stopPropagation();
        }
    };
    /**
     * When transition has finished, set the internal state for classes and emit the proper event.
     * The event passed is actually of type TransitionEvent, but that type is not available in
     * Android so we use any.
     */
    MdSidenav.prototype._onTransitionEnd = function (transitionEvent) {
        if (transitionEvent.target == this._elementRef.nativeElement
            && transitionEvent.propertyName.endsWith('transform')) {
            if (this._opened) {
                this.onOpen.emit();
            }
            else {
                this.onClose.emit();
            }
            if (this._toggleAnimationPromise) {
                this._resolveToggleAnimationPromise(true);
                this._toggleAnimationPromise = this._resolveToggleAnimationPromise = null;
            }
        }
    };
    Object.defineProperty(MdSidenav.prototype, "_isClosing", {
        get: function () {
            return !this._opened && !!this._toggleAnimationPromise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isOpening", {
        get: function () {
            return this._opened && !!this._toggleAnimationPromise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isClosed", {
        get: function () {
            return !this._opened && !this._toggleAnimationPromise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isOpened", {
        get: function () {
            return this._opened && !this._toggleAnimationPromise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isEnd", {
        get: function () {
            return this.align == 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_modeSide", {
        get: function () {
            return this.mode == 'side';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_modeOver", {
        get: function () {
            return this.mode == 'over';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_modePush", {
        get: function () {
            return this.mode == 'push';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_width", {
        get: function () {
            if (this._elementRef.nativeElement) {
                return this._elementRef.nativeElement.offsetWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__core_a11y_focus_trap__["a" /* FocusTrap */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_4__core_a11y_focus_trap__["a" /* FocusTrap */])
    ], MdSidenav.prototype, "_focusTrap", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "align", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "mode", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdSidenav.prototype, "disableClose", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('open-start'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onOpenStart", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('open'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('close-start'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onCloseStart", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('close'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('align-changed'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onAlignChanged", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdSidenav.prototype, "opened", null);
    MdSidenav = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-sidenav, mat-sidenav',
            // TODO(mmalerba): move template to separate file.
            template: "<cdk-focus-trap class=\"mat-sidenav-focus-trap\" [disabled]=\"isFocusTrapDisabled\"><ng-content></ng-content></cdk-focus-trap>",
            host: {
                '[class.mat-sidenav]': 'true',
                '(transitionend)': '_onTransitionEnd($event)',
                '(keydown)': 'handleKeydown($event)',
                // must prevent the browser from aligning text based on value
                '[attr.align]': 'null',
                '[class.mat-sidenav-closed]': '_isClosed',
                '[class.mat-sidenav-closing]': '_isClosing',
                '[class.mat-sidenav-end]': '_isEnd',
                '[class.mat-sidenav-opened]': '_isOpened',
                '[class.mat-sidenav-opening]': '_isOpening',
                '[class.mat-sidenav-over]': '_modeOver',
                '[class.mat-sidenav-push]': '_modePush',
                '[class.mat-sidenav-side]': '_modeSide',
                '[class.mat-sidenav-invalid]': '!valid',
                'tabIndex': '-1'
            },
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdSidenav);
    return MdSidenav;
}());
/**
 * <md-sidenav-container> component.
 *
 * This is the parent component to one or two <md-sidenav>s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
var MdSidenavContainer = (function () {
    function MdSidenavContainer(_dir, _element, _renderer, _ngZone) {
        var _this = this;
        this._dir = _dir;
        this._element = _element;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        /** Event emitted when the sidenav backdrop is clicked. */
        this.backdropClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Whether to enable open/close trantions. */
        this._enableTransitions = false;
        // If a `Dir` directive exists up the tree, listen direction changes and update the left/right
        // properties to point to the proper start/end.
        if (_dir != null) {
            _dir.dirChange.subscribe(function () { return _this._validateDrawers(); });
        }
    }
    Object.defineProperty(MdSidenavContainer.prototype, "start", {
        /** The sidenav child with the `start` alignment. */
        get: function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenavContainer.prototype, "end", {
        /** The sidenav child with the `end` alignment. */
        get: function () { return this._end; },
        enumerable: true,
        configurable: true
    });
    MdSidenavContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        // On changes, assert on consistency.
        this._sidenavs.changes.subscribe(function () { return _this._validateDrawers(); });
        this._sidenavs.forEach(function (sidenav) {
            _this._watchSidenavToggle(sidenav);
            _this._watchSidenavAlign(sidenav);
        });
        this._validateDrawers();
        // Give the view a chance to render the initial state, then enable transitions.
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () { return _this._enableTransitions = true; });
    };
    /**
     * Subscribes to sidenav events in order to set a class on the main container element when the
     * sidenav is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     */
    MdSidenavContainer.prototype._watchSidenavToggle = function (sidenav) {
        var _this = this;
        if (!sidenav || sidenav.mode === 'side') {
            return;
        }
        sidenav.onOpen.subscribe(function () { return _this._setContainerClass(sidenav, true); });
        sidenav.onClose.subscribe(function () { return _this._setContainerClass(sidenav, false); });
    };
    /**
     * Subscribes to sidenav onAlignChanged event in order to re-validate drawers when the align
     * changes.
     */
    MdSidenavContainer.prototype._watchSidenavAlign = function (sidenav) {
        var _this = this;
        if (!sidenav) {
            return;
        }
        sidenav.onAlignChanged.subscribe(function () { return _this._validateDrawers(); });
    };
    /** Toggles the 'mat-sidenav-opened' class on the main 'md-sidenav-container' element. */
    MdSidenavContainer.prototype._setContainerClass = function (sidenav, bool) {
        this._renderer.setElementClass(this._element.nativeElement, 'mat-sidenav-opened', bool);
    };
    /** Sets the valid state of the drawers. */
    MdSidenavContainer.prototype._setDrawersValid = function (valid) {
        this._sidenavs.forEach(function (sidenav) {
            sidenav.valid = valid;
        });
        if (!valid) {
            this._start = this._end = this._left = this._right = null;
        }
    };
    /** Validate the state of the sidenav children components. */
    MdSidenavContainer.prototype._validateDrawers = function () {
        this._start = this._end = null;
        // Ensure that we have at most one start and one end sidenav.
        // NOTE: We must call toArray on _sidenavs even though it's iterable
        // (see https://github.com/Microsoft/TypeScript/issues/3164).
        for (var _i = 0, _a = this._sidenavs.toArray(); _i < _a.length; _i++) {
            var sidenav = _a[_i];
            if (sidenav.align == 'end') {
                if (this._end != null) {
                    this._setDrawersValid(false);
                    return;
                }
                this._end = sidenav;
            }
            else {
                if (this._start != null) {
                    this._setDrawersValid(false);
                    return;
                }
                this._start = sidenav;
            }
        }
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (this._dir == null || this._dir.value == 'ltr') {
            this._left = this._start;
            this._right = this._end;
        }
        else {
            this._left = this._end;
            this._right = this._start;
        }
        this._setDrawersValid(true);
    };
    MdSidenavContainer.prototype._onBackdropClicked = function () {
        this.backdropClick.emit();
        this._closeModalSidenav();
    };
    MdSidenavContainer.prototype._closeModalSidenav = function () {
        // Close all open sidenav's where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter(function (sidenav) { return sidenav && !sidenav.disableClose && sidenav.mode !== 'side'; })
            .forEach(function (sidenav) { return sidenav.close(); });
    };
    MdSidenavContainer.prototype._isShowingBackdrop = function () {
        return (this._isSidenavOpen(this._start) && this._start.mode != 'side')
            || (this._isSidenavOpen(this._end) && this._end.mode != 'side');
    };
    MdSidenavContainer.prototype._isSidenavOpen = function (side) {
        return side != null && side.opened;
    };
    /**
     * Return the width of the sidenav, if it's in the proper mode and opened.
     * This may relayout the view, so do not call this often.
     * @param sidenav
     * @param mode
     */
    MdSidenavContainer.prototype._getSidenavEffectiveWidth = function (sidenav, mode) {
        return (this._isSidenavOpen(sidenav) && sidenav.mode == mode) ? sidenav._width : 0;
    };
    MdSidenavContainer.prototype._getMarginLeft = function () {
        return this._getSidenavEffectiveWidth(this._left, 'side');
    };
    MdSidenavContainer.prototype._getMarginRight = function () {
        return this._getSidenavEffectiveWidth(this._right, 'side');
    };
    MdSidenavContainer.prototype._getPositionLeft = function () {
        return this._getSidenavEffectiveWidth(this._left, 'push');
    };
    MdSidenavContainer.prototype._getPositionRight = function () {
        return this._getSidenavEffectiveWidth(this._right, 'push');
    };
    /**
     * Returns the horizontal offset for the content area.  There should never be a value for both
     * left and right, so by subtracting the right value from the left value, we should always get
     * the appropriate offset.
     */
    MdSidenavContainer.prototype._getPositionOffset = function () {
        return this._getPositionLeft() - this._getPositionRight();
    };
    /**
     * This is using [ngStyle] rather than separate [style...] properties because [style.transform]
     * doesn't seem to work right now.
     */
    MdSidenavContainer.prototype._getStyles = function () {
        return {
            marginLeft: this._getMarginLeft() + "px",
            marginRight: this._getMarginRight() + "px",
            transform: "translate3d(" + this._getPositionOffset() + "px, 0, 0)"
        };
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(MdSidenav), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdSidenavContainer.prototype, "_sidenavs", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdSidenavContainer.prototype, "backdropClick", void 0);
    MdSidenavContainer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-sidenav-container, mat-sidenav-container',
            // Do not use ChangeDetectionStrategy.OnPush. It does not work for this component because
            // technically it is a sibling of MdSidenav (on the content tree) and isn't updated when MdSidenav
            // changes its state.
            template: "<div class=\"mat-sidenav-backdrop\" (click)=\"_onBackdropClicked()\" [class.mat-sidenav-shown]=\"_isShowingBackdrop()\"></div><ng-content select=\"md-sidenav, mat-sidenav\"></ng-content><div class=\"mat-sidenav-content\" [ngStyle]=\"_getStyles()\" cdk-scrollable><ng-content></ng-content></div>",
            styles: [".mat-sidenav-container{position:relative;transform:translate3d(0,0,0);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-sidenav-backdrop,.mat-sidenav-container[fullscreen]{position:absolute;top:0;bottom:0;right:0;left:0}.mat-sidenav-container[fullscreen].mat-sidenav-opened{overflow:hidden}.mat-sidenav-backdrop{display:block;z-index:2;visibility:hidden}.mat-sidenav-backdrop.mat-sidenav-shown{visibility:visible}.mat-sidenav.mat-sidenav-closed,.mat-sidenav.mat-sidenav-end.mat-sidenav-closed,[dir=rtl] .mat-sidenav.mat-sidenav-closed,[dir=rtl] .mat-sidenav.mat-sidenav-end.mat-sidenav-closed{visibility:hidden}@media screen and (-ms-high-contrast:active){.mat-sidenav-backdrop{opacity:.5}}.mat-sidenav-content{position:relative;transform:translate3d(0,0,0);display:block;height:100%;overflow:auto}.mat-sidenav{display:block;position:absolute;top:0;bottom:0;z-index:3;min-width:5%;outline:0;transform:translate3d(-100%,0,0)}.mat-sidenav.mat-sidenav-opened,.mat-sidenav.mat-sidenav-opening{transform:translate3d(0,0,0)}.mat-sidenav.mat-sidenav-side{z-index:1}.mat-sidenav.mat-sidenav-end{right:0;transform:translate3d(100%,0,0)}.mat-sidenav.mat-sidenav-end.mat-sidenav-opened,.mat-sidenav.mat-sidenav-end.mat-sidenav-opening{transform:translate3d(0,0,0)}[dir=rtl] .mat-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .mat-sidenav.mat-sidenav-opened,[dir=rtl] .mat-sidenav.mat-sidenav-opening{transform:translate3d(0,0,0)}[dir=rtl] .mat-sidenav.mat-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}[dir=rtl] .mat-sidenav.mat-sidenav-end.mat-sidenav-opened,[dir=rtl] .mat-sidenav.mat-sidenav-end.mat-sidenav-opening{transform:translate3d(0,0,0)}.mat-sidenav.mat-sidenav-opened:not(.mat-sidenav-side),.mat-sidenav.mat-sidenav-opening:not(.mat-sidenav-side){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-sidenav-focus-trap{height:100%}.mat-sidenav-focus-trap>.cdk-focus-trap-content{box-sizing:border-box;height:100%;overflow-y:auto;transform:translateZ(0)}.mat-sidenav-invalid{display:none}",
".mat-sidenav-transition .mat-sidenav{transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-sidenav-transition .mat-sidenav-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-sidenav-transition .mat-sidenav-backdrop.mat-sidenav-shown{transition:background-color .4s cubic-bezier(.25,.8,.25,1)}"],
            host: {
                '[class.mat-sidenav-container]': 'true',
                '[class.mat-sidenav-transition]': '_enableTransitions',
            },
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__core__["k" /* Dir */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], MdSidenavContainer);
    return MdSidenavContainer;
}());
var MdSidenavModule = (function () {
    function MdSidenavModule() {
    }
    /** @deprecated */
    MdSidenavModule.forRoot = function () {
        return {
            ngModule: MdSidenavModule,
            providers: []
        };
    };
    MdSidenavModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__core__["e" /* CompatibilityModule */], __WEBPACK_IMPORTED_MODULE_3__core_a11y_index__["a" /* A11yModule */], __WEBPACK_IMPORTED_MODULE_6__core_overlay_overlay_directives__["a" /* OverlayModule */]],
            exports: [MdSidenavContainer, MdSidenav, __WEBPACK_IMPORTED_MODULE_2__core__["e" /* CompatibilityModule */]],
            declarations: [MdSidenavContainer, MdSidenav],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSidenavModule);
    return MdSidenavModule;
}());
//# sourceMappingURL=sidenav.js.map

/***/ }),
/* 373 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* unused harmony export MD_SLIDE_TOGGLE_VALUE_ACCESSOR */
/* unused harmony export MdSlideToggleChange */
/* unused harmony export MdSlideToggle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSlideToggleModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MD_SLIDE_TOGGLE_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdSlideToggle; }),
    multi: true
};
// A simple change event emitted by the MdSlideToggle component.
var MdSlideToggleChange = (function () {
    function MdSlideToggleChange() {
    }
    return MdSlideToggleChange;
}());
// Increasing integer for generating unique ids for slide-toggle components.
var nextId = 0;
/**
 * Two-state control, which can be also called `switch`.
 */
var MdSlideToggle = (function () {
    function MdSlideToggle(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // A unique id for the slide-toggle. By default the id is auto-generated.
        this._uniqueId = "md-slide-toggle-" + ++nextId;
        this._checked = false;
        this._isMousedown = false;
        this._slideRenderer = null;
        this._disabled = false;
        this._required = false;
        // Needs to be public to support AOT compilation (as host binding).
        this._hasFocus = false;
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        /** Used to specify the tabIndex value for the underlying input element. */
        this.tabIndex = 0;
        /** Whether the label should appear after or before the slide-toggle. Defaults to 'after' */
        this.labelPosition = 'after';
        /** Used to set the aria-label attribute on the underlying input element. */
        this.ariaLabel = null;
        /** Used to set the aria-labelledby attribute on the underlying input element. */
        this.ariaLabelledby = null;
        this._change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** An event will be dispatched each time the slide-toggle changes its value. */
        this.change = this._change.asObservable();
    }
    Object.defineProperty(MdSlideToggle.prototype, "disabled", {
        /** Whether the slide-toggle is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlideToggle.prototype, "required", {
        /** Whether the slide-toggle is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlideToggle.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    MdSlideToggle.prototype.ngAfterContentInit = function () {
        this._slideRenderer = new SlideToggleRenderer(this._elementRef);
    };
    /**
     * The onChangeEvent method will be also called on click.
     * This is because everything for the slide-toggle is wrapped inside of a label,
     * which triggers a onChange event on click.
     */
    MdSlideToggle.prototype._onChangeEvent = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the component's `change` output.
        event.stopPropagation();
        // Once a drag is currently in progress, we do not want to toggle the slide-toggle on a click.
        if (!this.disabled && !this._slideRenderer.isDragging()) {
            this.toggle();
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
    };
    MdSlideToggle.prototype._onInputClick = function (event) {
        this.onTouched();
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    MdSlideToggle.prototype._setMousedown = function () {
        var _this = this;
        // We only *show* the focus style when focus has come to the button via the keyboard.
        // The Material Design spec is silent on this topic, and without doing this, the
        // button continues to look :active after clicking.
        // @see http://marcysutton.com/button-focus-hell/
        this._isMousedown = true;
        setTimeout(function () { return _this._isMousedown = false; }, 100);
    };
    MdSlideToggle.prototype._onInputFocus = function () {
        // Only show the focus / ripple indicator when the focus was not triggered by a mouse
        // interaction on the component.
        if (!this._isMousedown) {
            this._hasFocus = true;
        }
    };
    MdSlideToggle.prototype._onInputBlur = function () {
        this._hasFocus = false;
        this.onTouched();
    };
    /** Implemented as part of ControlValueAccessor. */
    MdSlideToggle.prototype.writeValue = function (value) {
        this.checked = value;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdSlideToggle.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdSlideToggle.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /** Implemented as a part of ControlValueAccessor. */
    MdSlideToggle.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** Focuses the slide-toggle. */
    MdSlideToggle.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
        this._onInputFocus();
    };
    Object.defineProperty(MdSlideToggle.prototype, "checked", {
        /** Whether the slide-toggle is checked. */
        get: function () { return !!this._checked; },
        set: function (value) {
            if (this.checked !== !!value) {
                this._checked = value;
                this.onChange(this._checked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlideToggle.prototype, "color", {
        /** The color of the slide-toggle. Can be primary, accent, or warn. */
        get: function () { return this._color; },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Toggles the checked state of the slide-toggle. */
    MdSlideToggle.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    MdSlideToggle.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdSlideToggle.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    /** Emits the change event to the `change` output EventEmitter */
    MdSlideToggle.prototype._emitChangeEvent = function () {
        var event = new MdSlideToggleChange();
        event.source = this;
        event.checked = this.checked;
        this._change.emit(event);
    };
    MdSlideToggle.prototype._onDragStart = function () {
        if (!this.disabled) {
            this._slideRenderer.startThumbDrag(this.checked);
        }
    };
    MdSlideToggle.prototype._onDrag = function (event) {
        if (this._slideRenderer.isDragging()) {
            this._slideRenderer.updateThumbPosition(event.deltaX);
        }
    };
    MdSlideToggle.prototype._onDragEnd = function () {
        var _this = this;
        if (!this._slideRenderer.isDragging()) {
            return;
        }
        // Notice that we have to stop outside of the current event handler,
        // because otherwise the click event will be fired and will reset the new checked variable.
        setTimeout(function () {
            _this.checked = _this._slideRenderer.stopThumbDrag();
            _this._emitChangeEvent();
        }, 0);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdSlideToggle.prototype, "name", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdSlideToggle.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MdSlideToggle.prototype, "tabIndex", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlideToggle.prototype, "labelPosition", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-label'), 
        __metadata('design:type', String)
    ], MdSlideToggle.prototype, "ariaLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aria-labelledby'), 
        __metadata('design:type', String)
    ], MdSlideToggle.prototype, "ariaLabelledby", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdSlideToggle.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdSlideToggle.prototype, "required", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"])
    ], MdSlideToggle.prototype, "change", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdSlideToggle.prototype, "_inputElement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlideToggle.prototype, "checked", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdSlideToggle.prototype, "color", null);
    MdSlideToggle = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-slide-toggle, mat-slide-toggle',
            host: {
                '[class.mat-slide-toggle]': 'true',
                '[class.mat-checked]': 'checked',
                '[class.mat-disabled]': 'disabled',
                // This mat-slide-toggle prefix will change, once the temporary ripple is removed.
                '[class.mat-slide-toggle-focused]': '_hasFocus',
                '[class.mat-slide-toggle-label-before]': 'labelPosition == "before"',
                '(mousedown)': '_setMousedown()'
            },
            template: "<label class=\"mat-slide-toggle-label\"><div class=\"mat-slide-toggle-container\"><div class=\"mat-slide-toggle-bar\"></div><div class=\"mat-slide-toggle-thumb-container\" (slidestart)=\"_onDragStart()\" (slide)=\"_onDrag($event)\" (slideend)=\"_onDragEnd()\"><div class=\"mat-slide-toggle-thumb\"><div class=\"mat-ink-ripple\"></div></div></div><input #input class=\"mat-slide-toggle-input cdk-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [tabIndex]=\"tabIndex\" [checked]=\"checked\" [disabled]=\"disabled\" [attr.name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (blur)=\"_onInputBlur()\" (focus)=\"_onInputFocus()\" (change)=\"_onChangeEvent($event)\" (click)=\"_onInputClick($event)\"></div><span class=\"mat-slide-toggle-content\"><ng-content></ng-content></span></label>",
            styles: [".mat-slide-toggle{display:flex;height:24px;margin:16px 0;line-height:24px;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(100%,0,0)}.mat-slide-toggle .mat-ink-ripple{border-radius:50%;opacity:0;height:48px;left:50%;overflow:hidden;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);transition:opacity ease 280ms,background-color ease 280ms;width:48px}.mat-slide-toggle.mat-slide-toggle-focused .mat-ink-ripple{opacity:1}.mat-slide-toggle.mat-slide-toggle-disabled .mat-ink-ripple{background-color:#000}.mat-slide-toggle.mat-disabled .mat-slide-toggle-container,.mat-slide-toggle.mat-disabled .mat-slide-toggle-label{cursor:default}.mat-slide-toggle-content{font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500}.mat-slide-toggle-label{display:flex;flex:1;cursor:pointer}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-container{order:2}.mat-slide-toggle-container{cursor:-webkit-grab;cursor:grab;width:36px;height:24px;position:relative}.mat-slide-toggle-container,[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-container{margin-right:8px;margin-left:0}.mat-slide-toggle-label-before .mat-slide-toggle-container,[dir=rtl] .mat-slide-toggle-container{margin-left:8px;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;top:2px;left:0;z-index:1;width:16px;transform:translate3d(0,0,0);transition:all 80ms linear;transition-property:transform}.mat-slide-toggle-thumb-container.mat-dragging{transition-duration:0s}.mat-slide-toggle-thumb{position:absolute;margin:0;left:0;top:0;height:20px;width:20px;border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-slide-toggle-thumb{background:#fff;border:1px solid #000}.mat-slide-toggle-bar{background:#fff}}.mat-slide-toggle-bar{position:absolute;left:1px;top:5px;width:34px;height:14px;border-radius:8px}.mat-slide-toggle-input{bottom:0;left:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}"],
            providers: [MD_SLIDE_TOGGLE_VALUE_ACCESSOR],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdSlideToggle);
    return MdSlideToggle;
}());
/**
 * Renderer for the Slide Toggle component, which separates DOM modification in its own class
 */
var SlideToggleRenderer = (function () {
    function SlideToggleRenderer(_elementRef) {
        this._elementRef = _elementRef;
        this._thumbEl = _elementRef.nativeElement.querySelector('.mat-slide-toggle-thumb-container');
        this._thumbBarEl = _elementRef.nativeElement.querySelector('.mat-slide-toggle-bar');
    }
    /** Whether the slide-toggle is currently dragging. */
    SlideToggleRenderer.prototype.isDragging = function () {
        return !!this._thumbBarWidth;
    };
    /** Initializes the drag of the slide-toggle. */
    SlideToggleRenderer.prototype.startThumbDrag = function (checked) {
        if (!this.isDragging()) {
            this._thumbBarWidth = this._thumbBarEl.clientWidth - this._thumbEl.clientWidth;
            this._checked = checked;
            this._thumbEl.classList.add('mat-dragging');
        }
    };
    /** Stops the current drag and returns the new checked value. */
    SlideToggleRenderer.prototype.stopThumbDrag = function () {
        if (this.isDragging()) {
            this._thumbBarWidth = null;
            this._thumbEl.classList.remove('mat-dragging');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["s" /* applyCssTransform */])(this._thumbEl, '');
            return this._percentage > 50;
        }
    };
    /** Updates the thumb containers position from the specified distance. */
    SlideToggleRenderer.prototype.updateThumbPosition = function (distance) {
        this._percentage = this._getThumbPercentage(distance);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["s" /* applyCssTransform */])(this._thumbEl, "translate3d(" + this._percentage + "%, 0, 0)");
    };
    /** Retrieves the percentage of thumb from the moved distance. */
    SlideToggleRenderer.prototype._getThumbPercentage = function (distance) {
        var percentage = (distance / this._thumbBarWidth) * 100;
        // When the toggle was initially checked, then we have to start the drag at the end.
        if (this._checked) {
            percentage += 100;
        }
        return Math.max(0, Math.min(percentage, 100));
    };
    return SlideToggleRenderer;
}());
var MdSlideToggleModule = (function () {
    function MdSlideToggleModule() {
    }
    /** @deprecated */
    MdSlideToggleModule.forRoot = function () {
        return {
            ngModule: MdSlideToggleModule,
            providers: []
        };
    };
    MdSlideToggleModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            exports: [MdSlideToggle, __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            declarations: [MdSlideToggle],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["HAMMER_GESTURE_CONFIG"], useClass: __WEBPACK_IMPORTED_MODULE_3__core__["t" /* GestureConfig */] }],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSlideToggleModule);
    return MdSlideToggleModule;
}());
//# sourceMappingURL=slide-toggle.js.map

/***/ }),
/* 374 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__ = __webpack_require__(230);
/* unused harmony export MD_SLIDER_VALUE_ACCESSOR */
/* unused harmony export MdSliderChange */
/* unused harmony export MdSlider */
/* unused harmony export SliderRenderer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSliderModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
var MIN_AUTO_TICK_SEPARATION = 30;
/** The thumb gap size for a disabled slider. */
var DISABLED_THUMB_GAP = 7;
/** The thumb gap size for a non-active slider at its minimum value. */
var MIN_VALUE_NONACTIVE_THUMB_GAP = 7;
/** The thumb gap size for an active slider at its minimum value. */
var MIN_VALUE_ACTIVE_THUMB_GAP = 10;
/**
 * Provider Expression that allows md-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
var MD_SLIDER_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MdSlider; }),
    multi: true
};
/** A simple change event emitted by the MdSlider component. */
var MdSliderChange = (function () {
    function MdSliderChange() {
    }
    return MdSliderChange;
}());
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
var MdSlider = (function () {
    function MdSlider(_dir, elementRef) {
        this._dir = _dir;
        /** A renderer to handle updating the slider's thumb and fill track. */
        this._renderer = null;
        /** The dimensions of the slider. */
        this._sliderDimensions = null;
        this._disabled = false;
        this._thumbLabel = false;
        this._controlValueAccessorChangeFn = function () { };
        /** The last values for which a change or input event was emitted. */
        this._lastChangeValue = null;
        this._lastInputValue = null;
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = function () { };
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         */
        this._isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         */
        this._isActive = false;
        this._step = 1;
        this._tickInterval = 0;
        this._tickIntervalPercent = 0;
        this._percent = 0;
        this._value = null;
        this._min = 0;
        this._max = 100;
        this._invert = false;
        this._vertical = false;
        /** Event emitted when the slider value has changed. */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** Event emitted when the slider thumb moves. */
        this.input = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._renderer = new SliderRenderer(elementRef);
    }
    Object.defineProperty(MdSlider.prototype, "disabled", {
        /** Whether or not the slider is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "thumbLabel", {
        /** Whether or not to show the thumb label. */
        get: function () { return this._thumbLabel; },
        set: function (value) { this._thumbLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_thumbLabelDeprecated", {
        /** @deprecated */
        get: function () { return this._thumbLabel; },
        set: function (value) { this._thumbLabel = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "step", {
        /** The values at which the thumb will snap. */
        get: function () { return this._step; },
        set: function (v) {
            this._step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["u" /* coerceNumberProperty */])(v, this._step);
            if (this._step % 1 !== 0) {
                this._roundLabelTo = this._step.toString().split('.').pop().length;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "tickInterval", {
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         */
        get: function () { return this._tickInterval; },
        set: function (v) {
            this._tickInterval = (v == 'auto') ? v : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["u" /* coerceNumberProperty */])(v, this._tickInterval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_tickIntervalDeprecated", {
        /** @deprecated */
        get: function () { return this.tickInterval; },
        set: function (v) { this.tickInterval = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "tickIntervalPercent", {
        /** The size of a tick interval as a percentage of the size of the track. */
        get: function () { return this._tickIntervalPercent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "percent", {
        /** The percentage of the slider that coincides with the value. */
        get: function () { return this._clamp(this._percent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "value", {
        /** Value of the slider. */
        get: function () {
            // If the value needs to be read and it is still uninitialized, initialize it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            return this._value;
        },
        set: function (v) {
            this._value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["u" /* coerceNumberProperty */])(v, this._value);
            this._percent = this._calculatePercentage(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "min", {
        /** The minimum value that the slider can have. */
        get: function () {
            return this._min;
        },
        set: function (v) {
            this._min = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["u" /* coerceNumberProperty */])(v, this._min);
            // If the value wasn't explicitly set by the user, set it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            this._percent = this._calculatePercentage(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "max", {
        /** The maximum value that the slider can have. */
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["u" /* coerceNumberProperty */])(v, this._max);
            this._percent = this._calculatePercentage(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "invert", {
        /** Whether the slider is inverted. */
        get: function () { return this._invert; },
        set: function (value) { this._invert = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "vertical", {
        /** Whether the slider is vertical. */
        get: function () { return this._vertical; },
        set: function (value) { this._vertical = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "displayValue", {
        /** The value to be used for display purposes. */
        get: function () {
            // Note that this could be improved further by rounding something like 0.999 to 1 or
            // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
            // every change detection cycle.
            if (this._roundLabelTo && this.value % 1 !== 0) {
                return this.value.toFixed(this._roundLabelTo);
            }
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "invertAxis", {
        /**
         * Whether the axis of the slider is inverted.
         * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
         */
        get: function () {
            // Standard non-inverted mode for a vertical slider should be dragging the thumb from bottom to
            // top. However from a y-axis standpoint this is inverted.
            return this.vertical ? !this.invert : this.invert;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "invertMouseCoords", {
        /**
         * Whether mouse events should be converted to a slider position by calculating their distance
         * from the right or bottom edge of the slider as opposed to the top or left.
         */
        get: function () {
            return (this.direction == 'rtl' && !this.vertical) ? !this.invertAxis : this.invertAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_isMinValue", {
        /** Whether the slider is at its minimum value. */
        get: function () {
            return this.percent === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_thumbGap", {
        /**
         * The amount of space to leave between the slider thumb and the track fill & track background
         * elements.
         */
        get: function () {
            if (this.disabled) {
                return DISABLED_THUMB_GAP;
            }
            if (this._isMinValue && !this.thumbLabel) {
                return this._isActive ? MIN_VALUE_ACTIVE_THUMB_GAP : MIN_VALUE_NONACTIVE_THUMB_GAP;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "trackBackgroundStyles", {
        /** CSS styles for the track background element. */
        get: function () {
            var axis = this.vertical ? 'Y' : 'X';
            var sign = this.invertMouseCoords ? '-' : '';
            return {
                'transform': "translate" + axis + "(" + sign + this._thumbGap + "px) scale" + axis + "(" + (1 - this.percent) + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "trackFillStyles", {
        /** CSS styles for the track fill element. */
        get: function () {
            var axis = this.vertical ? 'Y' : 'X';
            var sign = this.invertMouseCoords ? '' : '-';
            return {
                'transform': "translate" + axis + "(" + sign + this._thumbGap + "px) scale" + axis + "(" + this.percent + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "ticksContainerStyles", {
        /** CSS styles for the ticks container element. */
        get: function () {
            var axis = this.vertical ? 'Y' : 'X';
            // For a horizontal slider in RTL languages we push the ticks container off the left edge
            // instead of the right edge to avoid causing a horizontal scrollbar to appear.
            var sign = !this.vertical && this.direction == 'rtl' ? '' : '-';
            var offset = this.tickIntervalPercent / 2 * 100;
            return {
                'transform': "translate" + axis + "(" + sign + offset + "%)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "ticksStyles", {
        /** CSS styles for the ticks element. */
        get: function () {
            var tickSize = this.tickIntervalPercent * 100;
            var backgroundSize = this.vertical ? "2px " + tickSize + "%" : tickSize + "% 2px";
            var axis = this.vertical ? 'Y' : 'X';
            // Depending on the direction we pushed the ticks container, push the ticks the opposite
            // direction to re-center them but clip off the end edge. In RTL languages we need to flip the
            // ticks 180 degrees so we're really cutting off the end edge abd not the start.
            var sign = !this.vertical && this.direction == 'rtl' ? '-' : '';
            var rotate = !this.vertical && this.direction == 'rtl' ? ' rotate(180deg)' : '';
            var styles = {
                'backgroundSize': backgroundSize,
                // Without translateZ ticks sometimes jitter as the slider moves on Chrome & Firefox.
                'transform': "translateZ(0) translate" + axis + "(" + sign + tickSize / 2 + "%)" + rotate
            };
            if (this._isMinValue && this._thumbGap) {
                var side = this.vertical ?
                    (this.invertAxis ? 'Bottom' : 'Top') :
                    (this.invertAxis ? 'Right' : 'Left');
                styles[("padding" + side)] = this._thumbGap + "px";
            }
            return styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "thumbContainerStyles", {
        get: function () {
            var axis = this.vertical ? 'Y' : 'X';
            // For a horizontal slider in RTL languages we push the thumb container off the left edge
            // instead of the right edge to avoid causing a horizontal scrollbar to appear.
            var invertOffset = (this.direction == 'rtl' && !this.vertical) ? !this.invertAxis : this.invertAxis;
            var offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
            return {
                'transform': "translate" + axis + "(-" + offset + "%)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "direction", {
        /** The language direction for this slider element. */
        get: function () {
            return (this._dir && this._dir.value == 'rtl') ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    MdSlider.prototype._onMouseenter = function () {
        if (this.disabled) {
            return;
        }
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    };
    MdSlider.prototype._onClick = function (event) {
        if (this.disabled) {
            return;
        }
        this._isActive = true;
        this._isSliding = false;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.clientX, y: event.clientY });
        /* Emits a change and input event if the value changed. */
        this._emitInputEvent();
        this._emitValueIfChanged();
    };
    MdSlider.prototype._onSlide = function (event) {
        if (this.disabled) {
            return;
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
        // Native range elements always emit `input` events when the value changed while sliding.
        this._emitInputEvent();
    };
    MdSlider.prototype._onSlideStart = function (event) {
        if (this.disabled) {
            return;
        }
        // Simulate mouseenter in case this is a mobile device.
        this._onMouseenter();
        event.preventDefault();
        this._isSliding = true;
        this._isActive = true;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
    };
    MdSlider.prototype._onSlideEnd = function () {
        this._isSliding = false;
        this._emitValueIfChanged();
    };
    MdSlider.prototype._onBlur = function () {
        this._isActive = false;
        this.onTouched();
    };
    MdSlider.prototype._onKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["e" /* PAGE_UP */]:
                this._increment(10);
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["f" /* PAGE_DOWN */]:
                this._increment(-10);
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["g" /* END */]:
                this.value = this.max;
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["h" /* HOME */]:
                this.value = this.min;
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["d" /* LEFT_ARROW */]:
                // NOTE: For a sighted user it would make more sense that when they press an arrow key on an
                // inverted slider the thumb moves in that direction. However for a blind user, nothing
                // about the slider indicates that it is inverted. They will expect left to be decrement,
                // regardless of how it appears on the screen. For speakers ofRTL languages, they probably
                // expect left to mean increment. Therefore we flip the meaning of the side arrow keys for
                // RTL. For inverted sliders we prefer a good a11y experience to having it "look right" for
                // sighted users, therefore we do not swap the meaning.
                this._increment(this.direction == 'rtl' ? 1 : -1);
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["i" /* UP_ARROW */]:
                this._increment(1);
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["c" /* RIGHT_ARROW */]:
                // See comment on LEFT_ARROW about the conditions under which we flip the meaning.
                this._increment(this.direction == 'rtl' ? -1 : 1);
                break;
            case __WEBPACK_IMPORTED_MODULE_6__core_keyboard_keycodes__["j" /* DOWN_ARROW */]:
                this._increment(-1);
                break;
            default:
                // Return if the key is not one that we explicitly handle to avoid calling preventDefault on
                // it.
                return;
        }
        this._isSliding = true;
        event.preventDefault();
    };
    MdSlider.prototype._onKeyup = function () {
        this._isSliding = false;
    };
    /** Increments the slider by the given number of steps (negative number decrements). */
    MdSlider.prototype._increment = function (numSteps) {
        this.value = this._clamp(this.value + this.step * numSteps, this.min, this.max);
        this._emitInputEvent();
        this._emitValueIfChanged();
    };
    /** Calculate the new value from the new physical location. The value will always be snapped. */
    MdSlider.prototype._updateValueFromPosition = function (pos) {
        if (!this._sliderDimensions) {
            return;
        }
        var offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
        var size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
        var posComponent = this.vertical ? pos.y : pos.x;
        // The exact value is calculated from the event and used to find the closest snap value.
        var percent = this._clamp((posComponent - offset) / size);
        if (this.invertMouseCoords) {
            percent = 1 - percent;
        }
        var exactValue = this._calculateValue(percent);
        // This calculation finds the closest step by finding the closest whole number divisible by the
        // step relative to the min.
        var closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        // The value needs to snap to the min and max.
        this.value = this._clamp(closestValue, this.min, this.max);
    };
    /** Emits a change event if the current value is different from the last emitted value. */
    MdSlider.prototype._emitValueIfChanged = function () {
        if (this.value != this._lastChangeValue) {
            var event_1 = this._createChangeEvent();
            this._lastChangeValue = this.value;
            this._controlValueAccessorChangeFn(this.value);
            this.change.emit(event_1);
        }
    };
    /** Emits an input event when the current value is different from the last emitted value. */
    MdSlider.prototype._emitInputEvent = function () {
        if (this.value != this._lastInputValue) {
            var event_2 = this._createChangeEvent();
            this._lastInputValue = this.value;
            this.input.emit(event_2);
        }
    };
    /** Updates the amount of space between ticks as a percentage of the width of the slider. */
    MdSlider.prototype._updateTickIntervalPercent = function () {
        if (!this.tickInterval) {
            return;
        }
        if (this.tickInterval == 'auto') {
            var trackSize = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
            var pixelsPerStep = trackSize * this.step / (this.max - this.min);
            var stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            var pixelsPerTick = stepsPerTick * this.step;
            this._tickIntervalPercent = pixelsPerTick / trackSize;
        }
        else {
            this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
        }
    };
    /** Creates a slider change object from the specified value. */
    MdSlider.prototype._createChangeEvent = function (value) {
        if (value === void 0) { value = this.value; }
        var event = new MdSliderChange();
        event.source = this;
        event.value = value;
        return event;
    };
    /** Calculates the percentage of the slider that a value is. */
    MdSlider.prototype._calculatePercentage = function (value) {
        return (value - this.min) / (this.max - this.min);
    };
    /** Calculates the value a percentage of the slider corresponds to. */
    MdSlider.prototype._calculateValue = function (percentage) {
        return this.min + percentage * (this.max - this.min);
    };
    /** Return a number between two numbers. */
    MdSlider.prototype._clamp = function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    MdSlider.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Registers a callback to eb triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MdSlider.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MdSlider.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    MdSlider.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdSlider.prototype, "disabled", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('thumbLabel'), 
        __metadata('design:type', Boolean)
    ], MdSlider.prototype, "thumbLabel", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('thumb-label'), 
        __metadata('design:type', Boolean)
    ], MdSlider.prototype, "_thumbLabelDeprecated", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "step", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "tickInterval", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tick-interval'), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "_tickIntervalDeprecated", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "value", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "min", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "max", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "invert", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "vertical", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "change", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "input", void 0);
    MdSlider = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-slider, mat-slider',
            providers: [MD_SLIDER_VALUE_ACCESSOR],
            host: {
                '[class.mat-slider]': 'true',
                '(blur)': '_onBlur()',
                '(click)': '_onClick($event)',
                '(keydown)': '_onKeydown($event)',
                '(keyup)': '_onKeyup()',
                '(mouseenter)': '_onMouseenter()',
                '(slide)': '_onSlide($event)',
                '(slideend)': '_onSlideEnd()',
                '(slidestart)': '_onSlideStart($event)',
                'role': 'slider',
                'tabindex': '0',
                '[attr.aria-disabled]': 'disabled',
                '[attr.aria-valuemax]': 'max',
                '[attr.aria-valuemin]': 'min',
                '[attr.aria-valuenow]': 'value',
                '[class.mat-slider-active]': '_isActive',
                '[class.mat-slider-disabled]': 'disabled',
                '[class.mat-slider-has-ticks]': 'tickInterval',
                '[class.mat-slider-horizontal]': '!vertical',
                '[class.mat-slider-axis-inverted]': 'invertAxis',
                '[class.mat-slider-sliding]': '_isSliding',
                '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
                '[class.mat-slider-vertical]': 'vertical',
                '[class.mat-slider-min-value]': '_isMinValue',
                '[class.mat-slider-hide-last-tick]': '_isMinValue && _thumbGap && invertAxis',
            },
            template: "<div class=\"mat-slider-wrapper\"><div class=\"mat-slider-track-wrapper\"><div class=\"mat-slider-track-background\" [ngStyle]=\"trackBackgroundStyles\"></div><div class=\"mat-slider-track-fill\" [ngStyle]=\"trackFillStyles\"></div></div><div class=\"mat-slider-ticks-container\" [ngStyle]=\"ticksContainerStyles\"><div class=\"mat-slider-ticks\" [ngStyle]=\"ticksStyles\"></div></div><div class=\"mat-slider-thumb-container\" [ngStyle]=\"thumbContainerStyles\"><div class=\"mat-slider-thumb\"></div><div class=\"mat-slider-thumb-label\"><span class=\"mat-slider-thumb-label-text\">{{displayValue}}</span></div></div></div>",
            styles: [".mat-slider-track-background,.mat-slider-track-fill{transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:0;vertical-align:middle}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0}.mat-slider-track-background{position:absolute;transform-origin:100% 100%}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{box-sizing:border-box;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-disabled .mat-slider-ticks{opacity:0}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(.7);transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),border-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform .4s cubic-bezier(.25,.8,.25,1),border-radius .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label-text{z-index:1;font-size:12px;font-weight:700;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-sliding .mat-slider-thumb-container,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-track-fill{transition-duration:0s}.mat-slider-has-ticks .mat-slider-wrapper::after{content:'';position:absolute;border:0 solid rgba(0,0,0,.6);opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-active .mat-slider-thumb-label-text,.mat-slider-has-ticks.mat-slider-active .mat-slider-ticks,.mat-slider-has-ticks.mat-slider-active:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.mat-slider-active .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-active.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.mat-slider-active .mat-slider-thumb-label{border-radius:50% 50% 0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.mat-slider-horizontal .mat-slider-ticks{background:repeating-linear-gradient(to right,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent);background:-moz-repeating-linear-gradient(.0001deg,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent);background-clip:content-box;height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.mat-slider-active .mat-slider-thumb-label{transform:rotate(45deg)}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.mat-slider-vertical .mat-slider-ticks{background:repeating-linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent);background-clip:content-box;width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.mat-slider-active .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background,[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%}"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__["a" /* Dir */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], MdSlider);
    return MdSlider;
}());
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 * @docs-private
 */
var SliderRenderer = (function () {
    function SliderRenderer(elementRef) {
        this._sliderElement = elementRef.nativeElement;
    }
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     */
    SliderRenderer.prototype.getSliderDimensions = function () {
        var wrapperElement = this._sliderElement.querySelector('.mat-slider-wrapper');
        return wrapperElement.getBoundingClientRect();
    };
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     */
    SliderRenderer.prototype.addFocus = function () {
        this._sliderElement.focus();
    };
    return SliderRenderer;
}());
var MdSliderModule = (function () {
    function MdSliderModule() {
    }
    /** @deprecated */
    MdSliderModule.forRoot = function () {
        return {
            ngModule: MdSliderModule,
            providers: []
        };
    };
    MdSliderModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_5__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            exports: [MdSlider, __WEBPACK_IMPORTED_MODULE_3__core__["e" /* CompatibilityModule */]],
            declarations: [MdSlider],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["HAMMER_GESTURE_CONFIG"], useClass: __WEBPACK_IMPORTED_MODULE_3__core__["t" /* GestureConfig */] }]
        }), 
        __metadata('design:paramtypes', [])
    ], MdSliderModule);
    return MdSliderModule;
}());
//# sourceMappingURL=slider.js.map

/***/ }),
/* 375 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdSnackBarContentAlreadyAttached; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Error that is thrown when attempting to attach a snack bar that is already attached.
 * @docs-private
 */
var MdSnackBarContentAlreadyAttached = (function (_super) {
    __extends(MdSnackBarContentAlreadyAttached, _super);
    function MdSnackBarContentAlreadyAttached() {
        _super.call(this, 'Attempting to attach snack bar content after content is already attached');
    }
    return MdSnackBarContentAlreadyAttached;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
//# sourceMappingURL=snack-bar-errors.js.map

/***/ }),
/* 376 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_label__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tab_label_wrapper__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ink_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_ripple_ripple__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_observe_content_observe_content__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tab__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tab_body__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__core_overlay_position_viewport_ruler__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__tab_header__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__core_overlay_scroll_scroll_dispatcher__ = __webpack_require__(232);
/* unused harmony export MdTabChangeEvent */
/* unused harmony export MdTabGroup */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTabsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
var MdTabChangeEvent = (function () {
    function MdTabChangeEvent() {
    }
    return MdTabChangeEvent;
}());
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
var MdTabGroup = (function () {
    function MdTabGroup(_renderer) {
        this._renderer = _renderer;
        /** Whether this component has been initialized. */
        this._isInitialized = false;
        /** The tab index that should be selected after the content has been checked. */
        this._indexToSelect = 0;
        /** Snapshot of the height of the tab body wrapper before another tab is activated. */
        this._tabBodyWrapperHeight = null;
        /** Whether the tab group should grow to the size of the active tab */
        this._dynamicHeight = false;
        this._selectedIndex = null;
        /** Position of the tab header. */
        this.headerPosition = 'above';
        this._onFocusChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._onSelectChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        this._groupId = nextId++;
    }
    Object.defineProperty(MdTabGroup.prototype, "dynamicHeight", {
        get: function () { return this._dynamicHeight; },
        set: function (value) { this._dynamicHeight = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core__["n" /* coerceBooleanProperty */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "_dynamicHeightDeprecated", {
        /** @deprecated */
        get: function () { return this._dynamicHeight; },
        set: function (value) { this._dynamicHeight = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectedIndex", {
        get: function () { return this._selectedIndex; },
        /** The index of the active tab. */
        set: function (value) { this._indexToSelect = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectedIndexChange", {
        /** Output to enable support for two-way binding on `selectedIndex`. */
        get: function () {
            return this.selectChange.map(function (event) { return event.index; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusChange", {
        /** Event emitted when focus has changed within a tab group. */
        get: function () {
            return this._onFocusChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectChange", {
        /** Event emitted when the tab selection has changed. */
        get: function () {
            return this._onSelectChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    MdTabGroup.prototype.ngAfterContentChecked = function () {
        var _this = this;
        // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
        // ensures that values like NaN can't get through and which would otherwise throw the
        // component into an infinite loop (since Math.max(NaN, 0) === NaN).
        this._indexToSelect =
            Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex != this._indexToSelect && this._selectedIndex != null) {
            this._onSelectChange.emit(this._createChangeEvent(this._indexToSelect));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this._tabs.forEach(function (tab, index) {
            tab.position = index - _this._indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position == 0 && !tab.origin) {
                tab.origin = _this._indexToSelect - _this._selectedIndex;
            }
        });
        this._selectedIndex = this._indexToSelect;
    };
    /**
     * Waits one frame for the view to update, then updates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop.
     */
    MdTabGroup.prototype.ngAfterViewChecked = function () {
        this._isInitialized = true;
    };
    MdTabGroup.prototype._focusChanged = function (index) {
        this._onFocusChange.emit(this._createChangeEvent(index));
    };
    MdTabGroup.prototype._createChangeEvent = function (index) {
        var event = new MdTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    };
    /** Returns a unique id for each tab label element */
    MdTabGroup.prototype._getTabLabelId = function (i) {
        return "md-tab-label-" + this._groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    MdTabGroup.prototype._getTabContentId = function (i) {
        return "md-tab-content-" + this._groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    MdTabGroup.prototype._setTabBodyWrapperHeight = function (tabHeight) {
        if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
            return;
        }
        this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', this._tabBodyWrapperHeight + 'px');
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._tabBodyWrapper.nativeElement.offsetHeight) {
            this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', tabHeight + 'px');
        }
    };
    /** Removes the height of the tab body wrapper. */
    MdTabGroup.prototype._removeTabBodyWrapperHeight = function () {
        this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight;
        this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', '');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_11__tab__["a" /* MdTab */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], MdTabGroup.prototype, "_tabs", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tabBodyWrapper'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MdTabGroup.prototype, "_tabBodyWrapper", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MdTabGroup.prototype, "dynamicHeight", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('md-dynamic-height'), 
        __metadata('design:type', Boolean)
    ], MdTabGroup.prototype, "_dynamicHeightDeprecated", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabGroup.prototype, "selectedIndex", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdTabGroup.prototype, "headerPosition", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"])
    ], MdTabGroup.prototype, "selectedIndexChange", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"])
    ], MdTabGroup.prototype, "focusChange", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"])
    ], MdTabGroup.prototype, "selectChange", null);
    MdTabGroup = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-tab-group, mat-tab-group',
            template: "<md-tab-header [selectedIndex]=\"selectedIndex\" #tabHeader (indexFocused)=\"_focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div class=\"mat-tab-label\" role=\"tab\" md-tab-label-wrapper md-ripple *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.mat-tab-label-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" (click)=\"tabHeader.focusIndex = selectedIndex = i\"><template [ngIf]=\"tab.templateLabel\"><template [cdkPortalHost]=\"tab.templateLabel\"></template></template><template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</template></div></md-tab-header><div class=\"mat-tab-body-wrapper\" #tabBodyWrapper><md-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.mat-tab-body-active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" (onCentered)=\"_removeTabBodyWrapperHeight()\" (onCentering)=\"_setTabBodyWrapperHeight($event)\"></md-tab-body></div>",
            styles: [":host{display:flex;flex-direction:column;font-family:Roboto,\"Helvetica Neue\",sans-serif}:host.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{line-height:48px;height:48px;padding:0 12px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;cursor:pointer;box-sizing:border-box;color:currentColor;opacity:.6;min-width:160px;text-align:center;position:relative}.mat-tab-label:focus{outline:0;opacity:1}@media (max-width:600px){.mat-tab-label{min-width:72px}}:host[mat-stretch-tabs] .mat-tab-label,:host[md-stretch-tabs] .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{position:absolute;top:0;left:0;right:0;bottom:0;display:block;overflow:hidden}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}:host.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}.mat-tab-disabled{cursor:default;pointer-events:none}"],
            host: {
                '[class.mat-tab-group-dynamic-height]': 'dynamicHeight',
                '[class.mat-tab-group-inverted-header]': 'headerPosition === "below"',
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdTabGroup);
    return MdTabGroup;
}());
var MdTabsModule = (function () {
    function MdTabsModule() {
    }
    /** @deprecated */
    MdTabsModule.forRoot = function () {
        return {
            ngModule: MdTabsModule,
            providers: []
        };
    };
    MdTabsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__core__["o" /* PortalModule */], __WEBPACK_IMPORTED_MODULE_9__core_ripple_ripple__["a" /* MdRippleModule */], __WEBPACK_IMPORTED_MODULE_10__core_observe_content_observe_content__["a" /* ObserveContentModule */]],
            // Don't export all components because some are only to be used internally.
            exports: [MdTabGroup, __WEBPACK_IMPORTED_MODULE_3__tab_label__["a" /* MdTabLabel */], __WEBPACK_IMPORTED_MODULE_11__tab__["a" /* MdTab */], __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__["a" /* MdTabNavBar */], __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__["b" /* MdTabLink */], __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__["c" /* MdTabLinkRipple */]],
            declarations: [MdTabGroup, __WEBPACK_IMPORTED_MODULE_3__tab_label__["a" /* MdTabLabel */], __WEBPACK_IMPORTED_MODULE_11__tab__["a" /* MdTab */], __WEBPACK_IMPORTED_MODULE_6__ink_bar__["a" /* MdInkBar */], __WEBPACK_IMPORTED_MODULE_4__tab_label_wrapper__["a" /* MdTabLabelWrapper */],
                __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__["a" /* MdTabNavBar */], __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__["b" /* MdTabLink */], __WEBPACK_IMPORTED_MODULE_12__tab_body__["a" /* MdTabBody */], __WEBPACK_IMPORTED_MODULE_5__tab_nav_bar_tab_nav_bar__["c" /* MdTabLinkRipple */], __WEBPACK_IMPORTED_MODULE_14__tab_header__["a" /* MdTabHeader */]],
            providers: [__WEBPACK_IMPORTED_MODULE_13__core_overlay_position_viewport_ruler__["b" /* VIEWPORT_RULER_PROVIDER */], __WEBPACK_IMPORTED_MODULE_15__core_overlay_scroll_scroll_dispatcher__["b" /* SCROLL_DISPATCHER_PROVIDER */]],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTabsModule);
    return MdTabsModule;
}());
//# sourceMappingURL=tab-group.js.map

/***/ }),
/* 377 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_nav_bar__ = __webpack_require__(324);
/* unused harmony namespace reexport */

//# sourceMappingURL=index.js.map

/***/ }),
/* 378 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* unused harmony export MdToolbarRow */
/* unused harmony export MdToolbar */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdToolbarModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MdToolbarRow = (function () {
    function MdToolbarRow() {
    }
    MdToolbarRow = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'md-toolbar-row, mat-toolbar-row',
            host: {
                '[class.mat-toolbar-row]': 'true',
            },
        }), 
        __metadata('design:paramtypes', [])
    ], MdToolbarRow);
    return MdToolbarRow;
}());
var MdToolbar = (function () {
    function MdToolbar(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(MdToolbar.prototype, "color", {
        /** The color of the toolbar. Can be primary, accent, or warn. */
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    MdToolbar.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdToolbar.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this.renderer.setElementClass(this.elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MdToolbar.prototype, "color", null);
    MdToolbar = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-toolbar, mat-toolbar',
            template: "<div class=\"mat-toolbar-layout\"><md-toolbar-row><ng-content></ng-content></md-toolbar-row><ng-content select=\"md-toolbar-row, mat-toolbar-row\"></ng-content></div>",
            styles: [".mat-toolbar,.mat-toolbar .mat-toolbar-row{display:flex;box-sizing:border-box;width:100%}.mat-toolbar{font-size:20px;font-weight:500;font-family:Roboto,\"Helvetica Neue\",sans-serif;padding:0 16px;flex-direction:column;min-height:64px}.mat-toolbar .mat-toolbar-row{flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-row{height:64px}@media (max-width:600px) and (orientation:portrait){.mat-toolbar{min-height:56px}.mat-toolbar-row{height:56px}}@media (max-width:960px) and (orientation:landscape){.mat-toolbar{min-height:48px}.mat-toolbar-row{height:48px}}"],
            host: {
                '[class.mat-toolbar]': 'true',
                'role': 'toolbar'
            },
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], MdToolbar);
    return MdToolbar;
}());
var MdToolbarModule = (function () {
    function MdToolbarModule() {
    }
    /** @deprecated */
    MdToolbarModule.forRoot = function () {
        return {
            ngModule: MdToolbarModule,
            providers: []
        };
    };
    MdToolbarModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            exports: [MdToolbar, MdToolbarRow, __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            declarations: [MdToolbar, MdToolbarRow],
        }), 
        __metadata('design:paramtypes', [])
    ], MdToolbarModule);
    return MdToolbarModule;
}());
//# sourceMappingURL=toolbar.js.map

/***/ }),
/* 379 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTooltipInvalidPositionError; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Exception thrown when a tooltip has an invalid position.
 * @docs-private
 */
var MdTooltipInvalidPositionError = (function (_super) {
    __extends(MdTooltipInvalidPositionError, _super);
    function MdTooltipInvalidPositionError(position) {
        _super.call(this, "Tooltip position \"" + position + "\" is invalid.");
    }
    return MdTooltipInvalidPositionError;
}(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* MdError */]));
//# sourceMappingURL=tooltip-errors.js.map

/***/ }),
/* 380 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_errors__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_first__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_overlay_scroll_scroll_dispatcher__ = __webpack_require__(232);
/* unused harmony export TOUCHEND_HIDE_DELAY */
/* unused harmony export SCROLL_THROTTLE_MS */
/* unused harmony export MdTooltip */
/* unused harmony export TooltipComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdTooltipModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







/** Time in ms to delay before changing the tooltip visibility to hidden */
var TOUCHEND_HIDE_DELAY = 1500;
/** Time in ms to throttle repositioning after scroll events. */
var SCROLL_THROTTLE_MS = 20;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
var MdTooltip = (function () {
    function MdTooltip(_overlay, _scrollDispatcher, _elementRef, _viewContainerRef, _ngZone, _dir) {
        this._overlay = _overlay;
        this._scrollDispatcher = _scrollDispatcher;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._position = 'below';
        /** The default delay in ms before showing the tooltip after show is called */
        this.showDelay = 0;
        /** The default delay in ms before hiding the tooltip after hide is called */
        this.hideDelay = 0;
    }
    Object.defineProperty(MdTooltip.prototype, "position", {
        /** Allows the user to define the position of the tooltip relative to the parent element */
        get: function () { return this._position; },
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_positionDeprecated", {
        /** @deprecated */
        get: function () { return this._position; },
        set: function (value) { this._position = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "message", {
        /** The message to be displayed in the tooltip */
        get: function () { return this._message; },
        set: function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_deprecatedMessage", {
        /** @deprecated */
        get: function () { return this.message; },
        set: function (v) { this.message = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matMessage", {
        // Properties with `mat-` prefix for noconflict mode.
        get: function () { return this.message; },
        set: function (v) { this.message = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matPosition", {
        // Properties with `mat-` prefix for noconflict mode.
        get: function () { return this.position; },
        set: function (v) { this.position = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matHideDelay", {
        // Properties with `mat-` prefix for noconflict mode.
        get: function () { return this.hideDelay; },
        set: function (v) { this.hideDelay = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matShowDelay", {
        // Properties with `mat-` prefix for noconflict mode.
        get: function () { return this.showDelay; },
        set: function (v) { this.showDelay = v; },
        enumerable: true,
        configurable: true
    });
    MdTooltip.prototype.ngOnInit = function () {
        var _this = this;
        // When a scroll on the page occurs, update the position in case this tooltip needs
        // to be repositioned.
        this.scrollSubscription = this._scrollDispatcher.scrolled(SCROLL_THROTTLE_MS).subscribe(function () {
            if (_this._overlayRef) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    /**
     * Dispose the tooltip when destroyed.
     */
    MdTooltip.prototype.ngOnDestroy = function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
        this.scrollSubscription.unsubscribe();
    };
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    MdTooltip.prototype.show = function (delay) {
        if (delay === void 0) { delay = this.showDelay; }
        if (!this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    };
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    MdTooltip.prototype.hide = function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    MdTooltip.prototype.toggle = function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    MdTooltip.prototype._isTooltipVisible = function () {
        return this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /** Create the tooltip to display */
    MdTooltip.prototype._createTooltip = function () {
        var _this = this;
        this._createOverlay();
        var portal = new __WEBPACK_IMPORTED_MODULE_1__core__["a" /* ComponentPortal */](TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            // Check first if the tooltip has already been removed through this components destroy.
            if (_this._tooltipInstance) {
                _this._disposeTooltip();
            }
        });
    };
    /** Create the overlay config and position strategy */
    MdTooltip.prototype._createOverlay = function () {
        var _this = this;
        var origin = this._getOrigin();
        var position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(function (change) {
            if (change.scrollableViewProperties.isOverlayClipped &&
                _this._tooltipInstance && _this._tooltipInstance.isVisible()) {
                _this.hide(0);
            }
        });
        var config = new __WEBPACK_IMPORTED_MODULE_1__core__["b" /* OverlayState */]();
        config.positionStrategy = strategy;
        this._overlayRef = this._overlay.create(config);
    };
    /** Disposes the current tooltip and the overlay it is attached to */
    MdTooltip.prototype._disposeTooltip = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /** Returns the origin position based on the user's position preference */
    MdTooltip.prototype._getOrigin = function () {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        var isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throw new __WEBPACK_IMPORTED_MODULE_2__tooltip_errors__["a" /* MdTooltipInvalidPositionError */](this.position);
    };
    /** Returns the overlay position based on the user's preference */
    MdTooltip.prototype._getOverlayPosition = function () {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        var isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throw new __WEBPACK_IMPORTED_MODULE_2__tooltip_errors__["a" /* MdTooltipInvalidPositionError */](this.position);
    };
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    MdTooltip.prototype._setTooltipMessage = function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdTooltipPosition'), 
        __metadata('design:type', String)
    ], MdTooltip.prototype, "position", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tooltip-position'), 
        __metadata('design:type', String)
    ], MdTooltip.prototype, "_positionDeprecated", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdTooltipShowDelay'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "showDelay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdTooltipHideDelay'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "hideDelay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mdTooltip'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "message", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('md-tooltip'), 
        __metadata('design:type', String)
    ], MdTooltip.prototype, "_deprecatedMessage", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('matTooltip'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "_matMessage", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('matTooltipPosition'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "_matPosition", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('matTooltipHideDelay'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "_matHideDelay", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('matTooltipShowDelay'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "_matShowDelay", null);
    MdTooltip = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[md-tooltip], [mdTooltip], [mat-tooltip], [matTooltip]',
            host: {
                '(longpress)': 'show()',
                '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()',
            },
            exportAs: 'mdTooltip',
        }),
        __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__core__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_6__core_overlay_scroll_scroll_dispatcher__["a" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__["a" /* Dir */]])
    ], MdTooltip);
    return MdTooltip;
}());
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
var TooltipComponent = (function () {
    function TooltipComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /** Property watched by the animation framework to show or hide the tooltip */
        this._visibility = 'initial';
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** The transform origin used in the animation for showing and hiding the tooltip */
        this._transformOrigin = 'bottom';
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    TooltipComponent.prototype.show = function (position, delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._changeDetectorRef.markForCheck();
            setTimeout(function () { _this._closeOnInteraction = true; }, 0);
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    TooltipComponent.prototype.hide = function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._changeDetectorRef.markForCheck();
        }, delay);
    };
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    TooltipComponent.prototype.afterHidden = function () {
        return this._onHide.asObservable();
    };
    /**
     * Whether the tooltip is being displayed
     */
    TooltipComponent.prototype.isVisible = function () {
        return this._visibility === 'visible';
    };
    /** Sets the tooltip transform origin according to the tooltip position */
    TooltipComponent.prototype._setTransformOrigin = function (value) {
        var isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throw new __WEBPACK_IMPORTED_MODULE_2__tooltip_errors__["a" /* MdTooltipInvalidPositionError */](value);
        }
    };
    TooltipComponent.prototype._afterVisibilityAnimation = function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    TooltipComponent.prototype._handleBodyInteraction = function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    TooltipComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({selector: 'md-tooltip-component, mat-tooltip-component',
            template: "<div class=\"mat-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\">{{message}}</div>",
            styles: [":host{pointer-events:none}.mat-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;margin:14px;max-width:250px}@media screen and (-ms-high-contrast:active){.mat-tooltip{outline:solid 1px}}"],
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('state', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('void', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'scale(0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('initial', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'scale(0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'scale(1)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('hidden', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'scale(0)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => visible', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => hidden', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                ])
            ],
            host: {
                '(body:click)': 'this._handleBodyInteraction()'
            }
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_4__core_rtl_dir__["a" /* Dir */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], TooltipComponent);
    return TooltipComponent;
}());
var MdTooltipModule = (function () {
    function MdTooltipModule() {
    }
    /** @deprecated */
    MdTooltipModule.forRoot = function () {
        return {
            ngModule: MdTooltipModule,
            providers: []
        };
    };
    MdTooltipModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__core__["d" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            exports: [MdTooltip, TooltipComponent, __WEBPACK_IMPORTED_MODULE_1__core__["e" /* CompatibilityModule */]],
            declarations: [MdTooltip, TooltipComponent],
            entryComponents: [TooltipComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTooltipModule);
    return MdTooltipModule;
}());
//# sourceMappingURL=tooltip.js.map

/***/ }),
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__attack_patterns_routes__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__attack_patterns_component__ = __webpack_require__(329);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttackPatternsModule; });








console.log('`Detail` bundle loaded asynchronously');
var AttackPatternsModule = (function () {
    function AttackPatternsModule() {
    }
    return AttackPatternsModule;
}());
AttackPatternsModule.routes = __WEBPACK_IMPORTED_MODULE_6__attack_patterns_routes__["a" /* routes */];
AttackPatternsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_7__attack_patterns_component__["a" /* AttackPatternsComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_6__attack_patterns_routes__["a" /* routes */]),
        ],
    })
], AttackPatternsModule);



/***/ }),
/* 385 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attack_patterns_component__ = __webpack_require__(329);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__attack_patterns_component__["a" /* AttackPatternsComponent */] },
            { path: 'new', loadChildren: function() { return __webpack_require__.e/* import() */(12).then(__webpack_require__.bind(null, 383))  .then( function(module) { return module['AttackPatternNewModule']; } ); } }
        ] },
];


/***/ }),
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>Attack Patterns</p>\n        <div class=\"button-row\">\n            <a md-raised-button routerLink=\"./new\"><md-icon>check</md-icon>NEW</a>\n            <a md-raised-button (click)=\"download()\">DOWNLOAD</a>            \n        </div>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(405);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(410);

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(418);

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(430);

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(436);

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(453);

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(459);

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(460);

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(499);

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(3))(507);

/***/ })
]));
//# sourceMappingURL=0.chunk.js.map