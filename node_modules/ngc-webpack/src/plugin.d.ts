/// <reference types="node" />
import { WebpackWrapper } from "./webpack-wrapper";
export declare type PathTransformer = (path: string) => string;
export declare type OnCompilationSuccess = () => void;
export declare type OnCompilationError = (err: Error) => void;
export interface NgcWebpackPluginOptions {
    /**
     * If false the plugin is a ghost, it will not perform any action.
     * This property can be used to trigger AOT on/off depending on your build target (prod, staging etc...)
     *
     * The state can not change after initializing the plugin.
     * @default true
     */
    disabled?: boolean;
    pathTransformer?: PathTransformer;
    onCompilationSuccess?: OnCompilationSuccess;
    onCompilationError?: OnCompilationError;
    /**
     * A path to a tsconfig file, if set the AOT compilation is triggered from the plugin.
     * When setting a tsconfig you do not need to run the compiler from the command line.
     *
     * @default undefined
     */
    tsConfig?: string;
    /**
     * A path to a file (resource) that will replace all resource referenced in @Components.
     * For each `@Component` the AOT compiler compiles it creates new representation for the templates (html, styles)
     * of that `@Components`. It means that there is no need for the source templates, they take a lot of
     * space and they will be replaced by the content of this resource.
     *
     * To leave the template as is set to a falsy value (the default).
     *
     * TIP: Use an empty file as an overriding resource. It is recommended to use a ".js" file which
     * usually has small amount of loaders hence less performance impact.
     *
     * > This feature is doing NormalModuleReplacementPlugin for AOT compiled resources.
     * @default undefined
     */
    resourceOverride?: string;
}
export declare class NgcWebpackPlugin {
    options: NgcWebpackPluginOptions;
    compiler: any;
    webpackWrapper: WebpackWrapper;
    private aotPass;
    private debug;
    constructor(options?: NgcWebpackPluginOptions);
    apply(compiler: any): void;
    run(next: (err?: Error) => any): void;
    beforeResolve(result: any, callback: (err: Error | null, result) => void): void;
    afterResolve(result: any, callback: (err: Error | null, result) => void): void;
}
