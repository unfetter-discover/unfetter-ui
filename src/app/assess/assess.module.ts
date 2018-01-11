import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './assess.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { CreateComponent } from './create/create.component';

const moduleComponents = [
  CreateComponent,
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules,
    routing
  ],
  declarations: [
    ...moduleComponents,
  ]
})
export class AssessModule { }
