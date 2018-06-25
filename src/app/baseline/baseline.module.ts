import { CommonModule } from '@angular/common';
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
import { BaselineEffects } from './store/baseline.effects';
import { baselineReducer } from './store/baseline.reducers';

const moduleComponents = [
  BaselineLayoutComponent,
  Create3Component,
];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
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
  ]
})
export class BaselineModule { }
