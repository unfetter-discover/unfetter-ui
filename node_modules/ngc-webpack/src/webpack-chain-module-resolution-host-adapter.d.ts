import { ModuleResolutionHost } from 'typescript';
import { ModuleResolutionHostAdapter } from '@angular/compiler-cli';
import { WebpackWrapper } from './webpack-wrapper';
export declare class WebpackChainModuleResolutionHostAdapter extends ModuleResolutionHostAdapter {
    webpackWrapper: WebpackWrapper;
    private _loader;
    private _pathTransformer;
    constructor(host: ModuleResolutionHost, webpackWrapper: WebpackWrapper);
    readResource(path: string): Promise<string>;
}
