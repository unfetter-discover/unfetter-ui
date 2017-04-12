"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compiler_cli_1 = require('@angular/compiler-cli');
var webpack_resource_loader_1 = require('./webpack-resource-loader');
var WebpackChainModuleResolutionHostAdapter = (function (_super) {
    __extends(WebpackChainModuleResolutionHostAdapter, _super);
    function WebpackChainModuleResolutionHostAdapter(host, webpackWrapper) {
        _super.call(this, host);
        this.webpackWrapper = webpackWrapper;
        this._loader = new webpack_resource_loader_1.WebpackResourceLoader(this.webpackWrapper.compiler.createCompilation());
    }
    WebpackChainModuleResolutionHostAdapter.prototype.readResource = function (path) {
        var newPath = this.webpackWrapper.pathTransformer(path);
        if (newPath === '') {
            return Promise.resolve(newPath);
        }
        else if (!this.fileExists(newPath)) {
            throw new Error("Compilation failed. Resource file not found: " + newPath);
        }
        else {
            return this._loader.get(newPath);
        }
    };
    return WebpackChainModuleResolutionHostAdapter;
}(compiler_cli_1.ModuleResolutionHostAdapter));
exports.WebpackChainModuleResolutionHostAdapter = WebpackChainModuleResolutionHostAdapter;
//# sourceMappingURL=webpack-chain-module-resolution-host-adapter.js.map