import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { CalendarModule } from 'primeng/primeng';
import { AssessmentModule } from '../assessment.module';
import { MitigationsComponent } from './mitigations.component';
import { ComponentModule } from '../../../components';
import { AssessmentsService } from '../../assessments.service';

const routes = [
   { path: '', component: MitigationsComponent  }
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    MitigationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    CalendarModule,
    ComponentModule,
    AssessmentModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AssessmentsService
  ]
})
export class MitigationsModule {}
