import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule, MdSnackBarModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { CalendarModule } from 'primeng/primeng';
import { PipesModule } from '../../pipes';
import { AssessmentComponent } from './assessment.component';
import { ComponentModule } from '../../components';
import { AssessmentsService } from '../assessments.service';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    MdSnackBarModule,
    ComponentModule,
    CalendarModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    AssessmentComponent
  ],

  providers: [
    AssessmentsService
  ]
})
export class AssessmentModule {}
