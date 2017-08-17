import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { AssessmentsComponent } from './list/assessments.component';
import { ComponentModule } from '../components';
import { AssessmentsService } from './assessments.service';
import { AssessmentsLayoutComponent } from './assessments-layout.component';

const routes = [
   { path: '', component: AssessmentsLayoutComponent,
        children: [
        { path: '', component: AssessmentsComponent },
        { path: 'indicators',  loadChildren: './new/indicators#IndicatorsModule' },
        { path: 'mitigations', loadChildren: './new/mitigations#MitigationsModule' },
        { path: 'sensors',  loadChildren: './new/sensors#SensorsModule' }
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
