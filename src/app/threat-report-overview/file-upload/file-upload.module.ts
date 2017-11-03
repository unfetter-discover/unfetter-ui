import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload.component';
import { UploadService } from './upload.service';
import { MatIconModule, MatInputModule, MatButtonModule, MatProgressBarModule, MatCardModule, MatListModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const components = [
  FileUploadComponent,
];

const materialModules = [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressBarModule,
];

const services = [
  UploadService,
];

@NgModule({
  declarations: [
    ...components,
],
imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...materialModules,
  ],
  providers: [
    ...services
  ],
  exports: [
      ...components
  ]
})
export class FileUploadModule { }
