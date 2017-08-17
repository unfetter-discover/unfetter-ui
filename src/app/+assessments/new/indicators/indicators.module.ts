import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { CalendarModule } from 'primeng/primeng';
import { IndicatorsComponent } from './indicators.component';
import { ComponentModule } from '../../../components';
import { AssessmentsService } from '../../assessments.service';
import { AssessmentModule } from '../assessment.module';

const routes = [
   { path: '', component: IndicatorsComponent  }
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    IndicatorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    ComponentModule,
    CalendarModule,
    AssessmentModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AssessmentsService
  ]
})
export class IndicatorsModule {}
