import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { GenericApi } from './services/genericapi.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { UsersService } from './services/users.service';
import { WebsocketService } from './services/web-socket.service';
import { AuthInterceptor } from './services/auth-interceptor.service';

@NgModule({
    providers: [
        GenericApi,
        AuthGuard,
        AuthService,
        ConfigService,
        UsersService,
        WebsocketService,
        HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class CoreModule { }
