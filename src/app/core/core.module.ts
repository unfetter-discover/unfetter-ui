import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AttackPatternService } from './services/attack-pattern.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { GenericApi } from './services/genericapi.service';
import { UserPreferencesService } from './services/user-preferences.service';
import { UsersService } from './services/users.service';
import { WebsocketService } from './services/web-socket.service';
import { NotificationsService } from './services/notifications.service';
import { SnackBarService } from './services/snackbar.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                MatSnackBarModule,
                GenericApi,
                AuthGuard,
                AuthService,
                AttackPatternService,
                ConfigService,
                UsersService,
                UserPreferencesService,
                WebsocketService,
                NotificationsService,
                HttpClientModule,
                SnackBarService,                
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ],
        };
    }
}
