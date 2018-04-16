import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderLogoComponent } from './header-logo.component';

describe('HeaderLogoComponent', () => {
  let component: HeaderLogoComponent;
  let fixture: ComponentFixture<HeaderLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLogoComponent ]
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

  it('should have defaultAccent only when title is empty', () => {
    component.title = '';
    fixture.detectChanges();
    const accentPath = fixture.debugElement.query(By.css('#accentPath'));
    for (let cls in accentPath.classes) {
      if (cls === 'defaultAccent') {
        expect(accentPath.classes[cls]).toBeTruthy();
        continue;
      }
      expect(accentPath.classes[cls]).toBeFalsy();
    }
  });

  it('should have eventsAccent when title is `events`', () => {
    component.title = 'events';
    fixture.detectChanges();
    const accentPath = fixture.debugElement.query(By.css('#accentPath'));
    expect(accentPath.classes.eventsAccent).toBeTruthy();
  });
});
