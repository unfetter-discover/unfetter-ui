import { NgModule } from '@angular/core';

import { GenericApi } from './services/genericapi.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { WebAnalyticsService } from './services/web-analytics.service';
import { ConfigService } from './services/config.service';

@NgModule({
    providers: [
        GenericApi,
        AuthGuard,
        AuthService,
        WebAnalyticsService,
        ConfigService
    ]
})
export class CoreModule { }
