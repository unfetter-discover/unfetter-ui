import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './assess3.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Create3Component } from './create/create3.component';

import { Assess3Guard } from './assess3.guard';
import { AssessService } from './services/assess.service';
import { AssessStateService } from './services/assess-state.service';

import { AssessEffects } from './store/assess.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { assessmentReducer } from './store/assess.reducers';
import { Assess3LayoutComponent } from './layout/assess3-layout.component';
import { ResultModule } from './result/result.module';
import { AssessSummaryService } from './services/assess-summary.service';
import { GlobalModule } from '../global/global.module';

const moduleComponents = [
  Assess3LayoutComponent,
  Create3Component,
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
]

@NgModule({
  imports: [
    CommonModule,
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
    Assess3Guard,
    AssessService,
    AssessStateService,
    AssessSummaryService,
  ]
})
export class Assess3Module { }
