"use strict";
var Path = require('path');
var tsc_wrapped_1 = require('@angular/tsc-wrapped');
var main_1 = require('./main');
var webpack_wrapper_1 = require("./webpack-wrapper");
var NgcWebpackPlugin = (function () {
    function NgcWebpackPlugin(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.debug = true;
    }
    NgcWebpackPlugin.prototype.apply = function (compiler) {
        var _this = this;
        if (this.options.disabled === true)
            return;
        this.compiler = compiler;
        this.webpackWrapper = webpack_wrapper_1.WebpackWrapper.fromCompiler(this.compiler);
        this.aotPass = true;
        compiler.plugin('run', function (compiler, next) { return _this.run(next); });
        compiler.plugin('watch-run', function (compiler, next) { return _this.run(next); });
        compiler.plugin("normal-module-factory", function (nmf) {
            nmf.plugin('before-resolve', function (result, callback) { return _this.beforeResolve(result, callback); });
            nmf.plugin('after-resolve', function (result, callback) { return _this.afterResolve(result, callback); });
        });
    };
    NgcWebpackPlugin.prototype.run = function (next) {
        var _this = this;
        if (this.options.tsConfig) {
            if (this.debug) {
                console.log('Starting compilation using the angular compiler.');
            }
            main_1.run(this.options.tsConfig, new tsc_wrapped_1.NgcCliOptions({}), this.webpackWrapper)
                .then(function () { return undefined; }) // ensure the last then get's undefined if no error.
                .catch(function (err) { return err; })
                .then(function (err) {
                if (_this.debug) {
                    console.log('Angular compilation done, starting webpack bundling.');
                }
                _this.aotPass = false;
                next(err);
            });
        }
        else {
            next();
        }
    };
    NgcWebpackPlugin.prototype.beforeResolve = function (result, callback) {
        if (!this.aotPass && this.options.resourceOverride && this.webpackWrapper.aotResources[result.request] === true) {
            result.request = this.options.resourceOverride;
        }
        callback(null, result);
    };
    NgcWebpackPlugin.prototype.afterResolve = function (result, callback) {
        if (!this.aotPass && this.options.resourceOverride && this.webpackWrapper.aotResources[result.resource] === true) {
            result.resource = Path.resolve(Path.dirname(result.resource), this.options.resourceOverride);
        }
        callback(null, result);
    };
    return NgcWebpackPlugin;
}());
exports.NgcWebpackPlugin = NgcWebpackPlugin;
//# sourceMappingURL=plugin.js.map