import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { GenericApi } from './services/genericapi.service';
import { UsersService } from './services/users.service';
import { WebsocketService } from './services/web-socket.service';
import { UserPreferences } from '../models/user/user-preferences';
import { UserPreferencesService } from './services/user-preferences.service';


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
                UserPreferencesService,
                WebsocketService,
                HttpClientModule,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ],
        };
    }
}
