"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.onSelect = function (date) {
        console.log("onSelect: ", date);
    };
    AppComponent.prototype.clearDate = function () {
        this.date = null;
    };
    AppComponent.prototype.setToday = function () {
        this.date = new Date();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n      <material-datepicker\n        [(date)]=\"date\"\n        (onSelect)=\"onSelect($event)\"\n        dateFormat=\"YYYY-MM-DD\"\n      ></material-datepicker>\n\n      <button (click)=\"setToday()\">today</button>\n      <button (click)=\"clearDate()\">reset</button>\n      <hr>\n      {{ date }}\n      <p>\n      Mirror(disabled, DD-MM-YYYY):\n      <material-datepicker\n        placeholder=\"nothing is selected\"\n        disabled=\"true\"\n        [(date)]=\"date\"\n        dateFormat=\"DD-MM-YYYY\"\n      ></material-datepicker>\n\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map