import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GlobalModule } from '../global/global.module';
import { BaselineGuard } from './baseline.guard';
import { routing } from './baseline.routing';
import { Create3Component } from './create/create3.component';
import { BaselineLayoutComponent } from './layout/baseline-layout.component';
import { ResultModule } from './result/result.module';
import { BaselineStateService } from './services/baseline-state.service';
import { BaselineSummaryService } from './services/baseline-summary.service';
import { BaselineService } from './services/baseline.service';
import { BaselineEffects } from './store/baseline.effects';
import { baselineReducer } from './store/baseline.reducers';

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
    Location
  ]
})
export class BaselineModule { }
