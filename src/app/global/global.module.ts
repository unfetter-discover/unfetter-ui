import { NgModule } from '@angular/core';

import { GenericApi } from './services/genericapi.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';

@NgModule({
    imports: [],
    exports: [CapitalizePipe, SophisticationPipe],
    declarations: [CapitalizePipe, SophisticationPipe],
    providers: [GenericApi]
})

export class GlobalModule {}
