import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderLogoComponent } from './header-logo.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../root-store/app.reducers';

describe('HeaderLogoComponent', () => {
  let component: HeaderLogoComponent;
  let fixture: ComponentFixture<HeaderLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLogoComponent ],
      imports: [
        StoreModule.forRoot(reducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
