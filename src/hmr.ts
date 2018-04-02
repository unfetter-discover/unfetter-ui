import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

const registerHmrHooks = (ngModule: NgModuleRef<any>) => {
    console.log('registerHmrHooks -', ngModule.instance);
    const bootstrapModule = ngModule.instance;
    if (module['hot']) {
        module['hot']['accept']();
        if (bootstrapModule['hmrOnInit'] && module['hot']['data']) {
            bootstrapModule['hmrOnInit'](module['hot']['data'])
        }
        if (bootstrapModule['hmrOnStatus']) {
            module['hot']['apply']((status) => {
                bootstrapModule['hmrOnStatus'](status)
            })
        }
        if (bootstrapModule['hmrOnCheck']) {
            module['hot']['check']((err, outdatedModules) => {
                bootstrapModule['hmrOnCheck'](err, outdatedModules);
            })
        }
        if (bootstrapModule['hmrOnDecline']) {
            module['hot']['decline']((dependencies) => {
                bootstrapModule['hmrOnDecline'](dependencies);
            })
        }
        module['hot']['dispose']((store) => {
            if (bootstrapModule['hmrOnDestroy']) {
                console.log('calling hmrOnDestroy', 1 + 1);
                bootstrapModule['hmrOnDestroy'](store);
            }
            ngModule.destroy();
            if (bootstrapModule['hmrAfterDestroy']) {
                bootstrapModule['hmrAfterDestroy'](store);
            }
        })
    }

    return ngModule;
};

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    bootstrap().then((mod) => {
        ngModule = mod;
        // registerHmrHooks(ngModule);
    });

    module.hot.dispose(() => {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map((c) => c.location.nativeElement);
        const makeVisible = createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
};

