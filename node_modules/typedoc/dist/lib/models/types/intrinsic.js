"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_1 = require("./abstract");
var IntrinsicType = (function (_super) {
    __extends(IntrinsicType, _super);
    function IntrinsicType(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    IntrinsicType.prototype.clone = function () {
        var clone = new IntrinsicType(this.name);
        clone.isArray = this.isArray;
        return clone;
    };
    IntrinsicType.prototype.equals = function (type) {
        return type instanceof IntrinsicType &&
            type.isArray === this.isArray &&
            type.name === this.name;
    };
    IntrinsicType.prototype.toObject = function () {
        var result = _super.prototype.toObject.call(this);
        result.type = 'instrinct';
        result.name = this.name;
        return result;
    };
    IntrinsicType.prototype.toString = function () {
        return this.name + (this.isArray ? '[]' : '');
    };
    return IntrinsicType;
}(abstract_1.Type));
exports.IntrinsicType = IntrinsicType;
//# sourceMappingURL=intrinsic.js.map