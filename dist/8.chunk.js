webpackJsonpac__name_([8],{

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__campaigns_module__ = __webpack_require__(398);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__campaigns_module__["a"]; });



/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampaignsComponent; });


var CampaignsComponent = (function () {
    function CampaignsComponent() {
        console.log('Initial CampaignsComponent');
    }
    CampaignsComponent.prototype.ngOnInit = function () {
        console.log('Initial CampaignsComponent');
    };
    return CampaignsComponent;
}());
CampaignsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'campaigns',
        styles: [__webpack_require__(440)],
        template: __webpack_require__(429)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], CampaignsComponent);



/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__campaigns_routes__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__campaigns_component__ = __webpack_require__(384);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampaignsModule; });







var CampaignsModule = (function () {
    function CampaignsModule() {
    }
    return CampaignsModule;
}());
CampaignsModule.routes = __WEBPACK_IMPORTED_MODULE_5__campaigns_routes__["a" /* routes */];
CampaignsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_6__campaigns_component__["a" /* CampaignsComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_5__campaigns_routes__["a" /* routes */]),
        ],
    })
], CampaignsModule);



/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__campaigns_component__ = __webpack_require__(384);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });

var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__campaigns_component__["a" /* CampaignsComponent */] },
        ] },
];


/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 429:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"container\">\n        <p>Campaigns Components</p>\n    </div>\n</div>\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(418);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=8.chunk.js.map