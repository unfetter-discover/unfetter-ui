import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './baseline.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Create3Component } from './create/create3.component';

import { BaselineGuard } from './baseline.guard';
import { BaselineService } from './services/baseline.service';
import { BaselineStateService } from './services/baseline-state.service';

import { BaselineEffects } from './store/baseline.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { baselineReducer } from './store/baseline.reducers';
import { BaselineLayoutComponent } from './layout/baseline-layout.component';
import { ResultModule } from './result/result.module';
import { BaselineSummaryService } from './services/baseline-summary.service';
import { GlobalModule } from '../global/global.module';

const moduleComponents = [
  BaselineLayoutComponent,
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
    StoreModule.forFeature('baseline', baselineReducer),
    EffectsModule.forFeature([BaselineEffects])
  ],
  declarations: [
    ...moduleComponents,
  ],
  exports: [
  ],
  providers: [
    BaselineGuard,
    BaselineService,
    BaselineStateService,
    BaselineSummaryService,
  ]
})
export class BaselineModule { }
