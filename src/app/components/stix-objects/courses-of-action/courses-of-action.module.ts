import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './courses-of-action.routes';
import { CoursesOfActionComponent } from './courses-of-action.component';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    CoursesOfActionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CoursesOfActionModule {
  public static routes = routes;
}
