import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './sightings.routes';
import { SightingsComponent } from './sightings.component';

console.log('`Sightings` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    SightingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SightingsModule {
  public static routes = routes;
}
