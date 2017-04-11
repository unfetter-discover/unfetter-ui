webpackJsonpac__name_([0],{

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__threat_actors_module__ = __webpack_require__(414);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ThreatActorsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__threat_actors_module__["a"]; });



/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatActorsComponent; });


var ThreatActorsComponent = (function () {
    function ThreatActorsComponent() {
        console.log('Initial ThreatActorsComponent');
    }
    ThreatActorsComponent.prototype.ngOnInit = function () {
        console.log('Initial ThreatActorsComponent');
    };
    return ThreatActorsComponent;
}());
ThreatActorsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'threat-actors',
        styles: [__webpack_require__(448)],
        template: __webpack_require__(437)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], ThreatActorsComponent);



/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__threat_actors_routes__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__threat_actors_component__ = __webpack_require__(392);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreatActorsModule; });







console.log('`Detail` bundle loaded asynchronously');
var ThreatActorsModule = (function () {
    function ThreatActorsModule() {
    }
    return ThreatActorsModule;
}());
ThreatActorsModule.routes = __WEBPACK_IMPORTED_MODULE_5__threat_actors_routes__["a" /* routes */];
ThreatActorsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_6__threat_actors_component__["a" /* ThreatActorsComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_5__threat_actors_routes__["a" /* routes */]),
        ],
    })
], ThreatActorsModule);



/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__threat_actors_component__ = __webpack_require__(392);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__threat_actors_component__["a" /* ThreatActorsComponent */] },
        ] },
];


/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 437:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>Threat Actors Component</p>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(426);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=0.chunk.js.map