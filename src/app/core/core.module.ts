import { NgModule } from '@angular/core';

import { GenericApi } from './services/genericapi.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { WebAnalyticsService } from './services/web-analytics.service';
import { ConfigService } from './services/config.service';
import { UsersService } from './services/users.service';
import { WebsocketService } from './services/web-socket.service';

@NgModule({
    providers: [
        GenericApi,
        AuthGuard,
        AuthService,
        WebAnalyticsService,
        ConfigService,
        UsersService,
        WebsocketService
    ]
})
export class CoreModule { }
