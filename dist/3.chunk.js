webpackJsonpac__name_([3],{

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__relationships_module__ = __webpack_require__(408);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RelationshipsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__relationships_module__["a"]; });



/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelationshipsComponent; });


var RelationshipsComponent = (function () {
    function RelationshipsComponent() {
        console.log('Initial RelationshipsComponent');
    }
    RelationshipsComponent.prototype.ngOnInit = function () {
        console.log('Initial RelationshipsComponent');
    };
    return RelationshipsComponent;
}());
RelationshipsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'relationships',
        styles: [__webpack_require__(445)],
        template: __webpack_require__(434)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], RelationshipsComponent);



/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__relationships_routes__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__relationships_component__ = __webpack_require__(389);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelationshipsModule; });







console.log('`Detail` bundle loaded asynchronously');
var RelationshipsModule = (function () {
    function RelationshipsModule() {
    }
    return RelationshipsModule;
}());
RelationshipsModule.routes = __WEBPACK_IMPORTED_MODULE_5__relationships_routes__["a" /* routes */];
RelationshipsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_6__relationships_component__["a" /* RelationshipsComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_5__relationships_routes__["a" /* routes */]),
        ],
    })
], RelationshipsModule);



/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__relationships_component__ = __webpack_require__(389);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__relationships_component__["a" /* RelationshipsComponent */] },
        ] },
];


/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 434:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>RelationshipsComponent</p>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(423);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=3.chunk.js.map