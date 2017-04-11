webpackJsonpac__name_([5],{

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__indicators_module__ = __webpack_require__(404);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__indicators_module__["a"]; });



/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorsComponent; });


var IndicatorsComponent = (function () {
    function IndicatorsComponent() {
        console.log('Initial IndicatorsComponent');
    }
    IndicatorsComponent.prototype.ngOnInit = function () {
        console.log('Initial IndicatorsComponent');
    };
    return IndicatorsComponent;
}());
IndicatorsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'indicators',
        styles: [__webpack_require__(443)],
        template: __webpack_require__(432)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], IndicatorsComponent);



/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__indicators_routes__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__indicators_component__ = __webpack_require__(387);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorsModule; });







console.log('`IndicatorsComponent` bundle loaded asynchronously');
var IndicatorsModule = (function () {
    function IndicatorsModule() {
    }
    return IndicatorsModule;
}());
IndicatorsModule.routes = __WEBPACK_IMPORTED_MODULE_5__indicators_routes__["a" /* routes */];
IndicatorsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_6__indicators_component__["a" /* IndicatorsComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_5__indicators_routes__["a" /* routes */]),
        ],
    })
], IndicatorsModule);



/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__indicators_component__ = __webpack_require__(387);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__indicators_component__["a" /* IndicatorsComponent */] },
        ] },
];


/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 432:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>Indicators Component</p>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(421);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=5.chunk.js.map