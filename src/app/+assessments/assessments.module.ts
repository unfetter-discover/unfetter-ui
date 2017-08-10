import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { AssessmentsComponent } from './list/assessments.component';
import { PageHeaderComponent } from '../components/page/page/header.component';
import { ComponentModule } from '../components';
import { AssessmentsService } from './assessments.service';
import { AssessmentsLayoutComponent } from './assessments-layout.component';

console.log('`AssessmentsComponent` bundle loaded asynchronously');
const routes = [
   { path: '', component: AssessmentsLayoutComponent,
        children: [
        { path: '', component: AssessmentsComponent },
        { path: 'indicators',  loadChildren: './indicators#IndicatorsModule' },
        { path: 'mitigations', loadChildren: './mitigations#MitigationsModule' },
        { path: 'sensors',  loadChildren: './sensors#SensorsModule' }
        ]
    }
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentsComponent,
    AssessmentsLayoutComponent
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
