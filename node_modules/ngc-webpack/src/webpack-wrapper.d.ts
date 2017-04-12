/// <reference types="node" />
import { NgcWebpackPlugin } from './plugin';
export declare class WebpackWrapper {
    compiler: any;
    plugin: NgcWebpackPlugin;
    aotResources: any;
    private hasPlugin;
    private constructor(compiler);
    emitOnCompilationSuccess(): void;
    emitOnCompilationError(err: Error): void;
    pathTransformer(path: string): string;
    static fromConfig(webpackConfig: string | any): WebpackWrapper;
    static fromCompiler(compiler: any): WebpackWrapper;
}
