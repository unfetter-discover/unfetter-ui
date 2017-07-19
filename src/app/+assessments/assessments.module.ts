import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { AssessmentsComponent } from './assessments.component';
import { PageHeaderComponent } from "../components/page/page/header.component";
import { ComponentModule } from "../components";
import { AssessmentsService } from "./assessments.service";

console.log('`AssessmentsComponent` bundle loaded asynchronously');
const routes = [
  { path: '', component: AssessmentsComponent },
  { path: 'assessment/edit/:id', component: AssessmentsComponent }
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    RouterModule.forChild(routes),
    ComponentModule
  ],
  providers: [
    AssessmentsService
  ]
})
export class AssessmentsModule {
  public static routes = routes;
}
