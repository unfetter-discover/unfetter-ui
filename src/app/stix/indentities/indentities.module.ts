import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './indentities.routes';
import { IndentitiesComponent } from './indentities.component';

console.log('`IndentitiesComponent` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    IndentitiesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class IndentitiesModule {
  public static routes = routes;
}
