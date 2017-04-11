import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './attack-pattern-new.routes';
import { AttackPatternNewComponent } from './attack-patterns-new.component';

console.log('`AttackPatternNew` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    AttackPatternNewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
     RouterModule.forChild(routes),
  ],
})
export class AttackPatternNewModule {
  // public static routes = routes;
}
