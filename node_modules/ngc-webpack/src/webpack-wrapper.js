"use strict";
var webpack = require('webpack');
var Path = require('path');
var tsc_wrapped_1 = require('@angular/tsc-wrapped');
var plugin_1 = require('./plugin');
/**
 * Resolve the config to an object.
 * If it's a fn, invoke.
 *
 * Also check if it's a mocked ES6 Module in cases where TS file is used that uses "export default"
 * @param config
 * @returns {any}
 */
function resolveConfig(config) {
    if (typeof config === 'function') {
        return config();
    }
    else if (config.__esModule === true && !!config.default) {
        return resolveConfig(config.default);
    }
    else {
        return config;
    }
}
var WebpackWrapper = (function () {
    function WebpackWrapper(compiler) {
        this.compiler = compiler;
        this.aotResources = {}; //TODO: use Map if in node 5
        this.plugin = this.compiler.options.plugins
            .filter(function (p) { return p instanceof plugin_1.NgcWebpackPlugin; })[0];
        this.hasPlugin = !!this.plugin;
    }
    ;
    WebpackWrapper.prototype.emitOnCompilationSuccess = function () {
        if (this.hasPlugin && typeof this.plugin.options.onCompilationSuccess === 'function') {
            this.plugin.options.onCompilationSuccess.call(this);
        }
    };
    WebpackWrapper.prototype.emitOnCompilationError = function (err) {
        if (this.hasPlugin && typeof this.plugin.options.onCompilationError === 'function') {
            this.plugin.options.onCompilationError.call(this, err);
        }
    };
    WebpackWrapper.prototype.pathTransformer = function (path) {
        this.aotResources[path] = true;
        if (this.plugin && typeof this.plugin.options.pathTransformer === 'function') {
            return this.plugin.options.pathTransformer(path);
        }
        else {
            return path;
        }
    };
    WebpackWrapper.fromConfig = function (webpackConfig) {
        try {
            var config = void 0;
            if (!webpackConfig) {
                webpackConfig = './webpack.config.js';
            }
            if (typeof webpackConfig === 'string') {
                var configPath = Path.isAbsolute(webpackConfig)
                    ? webpackConfig
                    : Path.join(process.cwd(), webpackConfig);
                config = require(configPath);
            }
            else {
                config = webpackConfig;
            }
            var configModule = resolveConfig(config);
            return WebpackWrapper.fromCompiler(webpack(configModule));
        }
        catch (err) {
            throw new tsc_wrapped_1.UserError("Invalid webpack configuration. Please set a valid --webpack argument.\n" + err.message);
        }
    };
    WebpackWrapper.fromCompiler = function (compiler) {
        return new WebpackWrapper(compiler);
    };
    return WebpackWrapper;
}());
exports.WebpackWrapper = WebpackWrapper;
//# sourceMappingURL=webpack-wrapper.js.map