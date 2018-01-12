import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './assess.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { CreateComponent } from './create/create.component';

import { AssessService } from './assess.service';
import { AssessEffects } from './store/assess.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { assessmentReducer } from './store/assess.reducers';

const moduleComponents = [
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
    StoreModule.forFeature('assess', assessmentReducer),
    EffectsModule.forFeature([AssessEffects])
  ],
  declarations: [
    ...moduleComponents,
  ],
  exports: [
    ...moduleComponents,
  ],
  providers: [
    AssessService,
  ]
})
export class AssessModule { }
