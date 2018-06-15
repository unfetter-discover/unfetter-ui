
import { of as observableOf,  Observable  } from 'rxjs';

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  public preloadedModules: string[] = [];

  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
     // console.log('Preloaded: ' + route.path);

      return load();
    } else {
      return observableOf(null);
    }
  }
}
