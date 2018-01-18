import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './assess.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { CreateComponent } from './create/create.component';

import { AssessService } from './services/assess.service';
import { AssessStateService } from './services/assess-state.service';

import { AssessEffects } from './store/assess.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { assessmentReducer } from './store/assess.reducers';
import { AssessLayoutComponent } from './layout/assess-layout.component';

const moduleComponents = [
  AssessLayoutComponent,
  CreateComponent,
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    AssessService,
    AssessStateService,
  ]
})
export class AssessModule { }
