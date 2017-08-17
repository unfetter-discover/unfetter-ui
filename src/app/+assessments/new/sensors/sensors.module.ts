import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { SensorsComponent } from './sensors.component';
import { ComponentModule } from '../../../components';
import { AssessmentsService } from '../../assessments.service';
import { AssessmentModule } from '../assessment.module';

const routes = [{ path: '', component: SensorsComponent }];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    SensorsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    ComponentModule,
    AssessmentModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AssessmentsService
  ]
})
export class SensorsModule {}
