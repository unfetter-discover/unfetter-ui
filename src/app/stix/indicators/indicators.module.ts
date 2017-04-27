import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './indicators.routes';
import { IndicatorsComponent } from './indicators.component';

console.log('`IndicatorsComponent` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    IndicatorsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class IndicatorsModule {
  public static routes = routes;
}
