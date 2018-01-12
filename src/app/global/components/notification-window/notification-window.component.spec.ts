import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NotificationWindowComponent } from './notification-window.component';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { GenericApi } from '../../../core/services/genericapi.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { reducers } from '../../../root-store/app.reducers';

describe('NotificationWindowComponent', () => {
  let component: NotificationWindowComponent;
  let fixture: ComponentFixture<NotificationWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
            NotificationWindowComponent,
            FieldSortPipe,
            TimeAgoPipe            
      ],
      imports: [
          MatIconModule,
          RouterTestingModule,
          HttpClientTestingModule,
          StoreModule.forRoot(reducers)
      ],
      providers: [
          AuthService,
          GenericApi,
          ConfigService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
