import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


console.log(`environment.production ${environment.production}`);
if (environment.production === true) {
    enableProdMode();
}

/**
 * @see https://github.com/angular/angular-cli/wiki/stories-configure-hmr
 * 
 * @see https://github.com/gdi2290/angular-hmr
 */
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

console.log(`environment.hmr: ${environment.hmr}`);
if (environment.hmr === true) {
    if (module['hot']) {
        // hmrBootstrap(module, bootstrap);
        bootloader(bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap();
}
