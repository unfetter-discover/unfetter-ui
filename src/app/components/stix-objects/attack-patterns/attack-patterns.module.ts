import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdButtonModule } from '@angular/material';
import { routes } from './attack-patterns.routes';
import { AttackPatternsComponent } from './attack-patterns.component';

console.log('`Detail` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    AttackPatternsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
     MdButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class AttackPatternsModule {
  public static routes = routes;
}
