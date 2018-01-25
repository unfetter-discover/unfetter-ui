// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MatIconModule, MatButtonModule, MatToolbarModule } from '@angular/material';
// import { StoreModule } from '@ngrx/store';

// import { HeaderNavigationComponent } from './header-navigation.component';
// import * as fromRoot from '../../../root-store/app.reducers';
// import { AuthService } from '../../../core/services/auth.service';
// import { CapitalizePipe } from '../../pipes/capitalize.pipe';
// import { mockAuthService } from '../../../testing/mock-auth-service';
// import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
// import { NotificationWindowComponent } from '../notification-window/notification-window.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FieldSortPipe } from '../../pipes/field-sort.pipe';

// describe('HeaderNavigationComponent', () => {
//     let component: HeaderNavigationComponent;
//     let fixture: ComponentFixture<HeaderNavigationComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 HeaderNavigationComponent,
//                 CapitalizePipe,
//                 TimeAgoPipe,
//                 FieldSortPipe,
//                 NotificationWindowComponent
//             ],
//             imports: [
//                 MatIconModule,
//                 MatButtonModule,
//                 MatToolbarModule,
//                 RouterTestingModule,
//                 HttpClientTestingModule,
//                 StoreModule.forRoot(fromRoot.reducers),
//             ],
//             providers: [
//                 { provide: AuthService, userValue: mockAuthService }
//             ],
//             schemas: [ NO_ERRORS_SCHEMA ]
//         })
//         .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(HeaderNavigationComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
