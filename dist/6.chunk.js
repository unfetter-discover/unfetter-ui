webpackJsonpac__name_([6],{

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__indentities_module__ = __webpack_require__(402);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndentitiesModule", function() { return __WEBPACK_IMPORTED_MODULE_0__indentities_module__["a"]; });



/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndentitiesComponent; });


var IndentitiesComponent = (function () {
    function IndentitiesComponent() {
        console.log('Initial IndentitiesComponent');
    }
    IndentitiesComponent.prototype.ngOnInit = function () {
        console.log('Initial IndentitiesComponent');
    };
    return IndentitiesComponent;
}());
IndentitiesComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'indentities',
        styles: [__webpack_require__(442)],
        template: __webpack_require__(431)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], IndentitiesComponent);



/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__indentities_routes__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__indentities_component__ = __webpack_require__(386);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndentitiesModule; });







console.log('`IndentitiesComponent` bundle loaded asynchronously');
var IndentitiesModule = (function () {
    function IndentitiesModule() {
    }
    return IndentitiesModule;
}());
IndentitiesModule.routes = __WEBPACK_IMPORTED_MODULE_5__indentities_routes__["a" /* routes */];
IndentitiesModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_6__indentities_component__["a" /* IndentitiesComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_5__indentities_routes__["a" /* routes */]),
        ],
    })
], IndentitiesModule);



/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__indentities_component__ = __webpack_require__(386);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__indentities_component__["a" /* IndentitiesComponent */] },
        ] },
];


/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 431:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>IndentitiesComponent</p>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(420);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=6.chunk.js.map