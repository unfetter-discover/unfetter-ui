import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FirstSentencePipe } from './first-sentence.pipe';
import { RestSentencePipe } from './rest-sentence.pipe';
import { ColumnSizePipe } from './column-size.pipe';
import { RiskColorPipe } from './risk-color.pipe';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    FirstSentencePipe,
    RestSentencePipe,
    ColumnSizePipe,
    RiskColorPipe
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    FirstSentencePipe,
    RestSentencePipe,
    ColumnSizePipe,
    RiskColorPipe
  ]
})
export class PipesModule {}
