webpackJsonpac__name_([1],{

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sightings_module__ = __webpack_require__(412);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SightingsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__sightings_module__["a"]; });



/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SightingsComponent; });


var SightingsComponent = (function () {
    function SightingsComponent() {
        console.log('Initial SightingsComponent');
    }
    SightingsComponent.prototype.ngOnInit = function () {
        console.log('Initial SightingsComponent');
    };
    return SightingsComponent;
}());
SightingsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'sightings',
        styles: [__webpack_require__(447)],
        template: __webpack_require__(436)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], SightingsComponent);



/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sightings_routes__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sightings_component__ = __webpack_require__(391);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SightingsModule; });







console.log('`Sightings` bundle loaded asynchronously');
var SightingsModule = (function () {
    function SightingsModule() {
    }
    return SightingsModule;
}());
SightingsModule.routes = __WEBPACK_IMPORTED_MODULE_5__sightings_routes__["a" /* routes */];
SightingsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_6__sightings_component__["a" /* SightingsComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_5__sightings_routes__["a" /* routes */]),
        ],
    })
], SightingsModule);



/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sightings_component__ = __webpack_require__(391);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__sightings_component__["a" /* SightingsComponent */] },
        ] },
];


/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 436:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>sightings</p>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(425);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=1.chunk.js.map