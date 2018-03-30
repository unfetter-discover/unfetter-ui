import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { GenericApi } from './services/genericapi.service';
import { UsersService } from './services/users.service';
import { WebsocketService } from './services/web-socket.service';


@NgModule({
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                GenericApi,
                AuthGuard,
                AuthService,
                ConfigService,
                UsersService,
                WebsocketService,
                HttpClientModule,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ],
        };
    }
}
