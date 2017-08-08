import { NgModule } from '@angular/core';

import { GenericApi } from './services/genericapi.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
    imports: [],
    exports: [CapitalizePipe],
    declarations: [CapitalizePipe],
    providers: [GenericApi]
})

export class GlobalModule{}