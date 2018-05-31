import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BaselineService } from '../../baseline/services/baseline.service';
import { GlobalModule } from '../../global/global.module';
import { AssessGuard } from './assess.guard';
import { routing } from './assess.routing';
import { CreateComponent } from './create/create.component';
import { AssessLayoutComponent } from './layout/assess-layout.component';
import { ResultModule } from './result/result.module';
import { AssessStateService } from './services/assess-state.service';
import { AssessSummaryService } from './services/assess-summary.service';
import { AssessService } from './services/assess.service';
import { AssessEffects } from './store/assess.effects';
import { assessmentReducer } from './store/assess.reducers';

const moduleComponents = [
  AssessLayoutComponent,
  CreateComponent,
];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResultModule,
    GlobalModule,
    ...materialModules,
    routing,
    StoreModule.forFeature('assessment', assessmentReducer),
    EffectsModule.forFeature([AssessEffects])
  ],
  declarations: [
    ...moduleComponents,
  ],
  exports: [
  ],
  providers: [
    AssessGuard,
    AssessService,
    AssessStateService,
    AssessSummaryService,
    BaselineService,
  ]
})
export class AssessModule { }
