import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ResultHeaderComponent } from './result-header.component';

describe('ResultHeaderComponent', () => {
  let component: ResultHeaderComponent;
  let fixture: ComponentFixture<ResultHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ResultHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a published string and no PUBLISH button if create date is known', () => {
    component.created = null;
    let publishButton = fixture.debugElement.query(By.css('#publishButton')).nativeElement;
    let publishArea = fixture.debugElement.query(By.css('.publishText'));
    expect(publishButton).toBeTruthy();
    expect(publishArea).toBeFalsy();

    component.created = new Date(2018, 2);
    fixture.detectChanges();
    publishArea = fixture.debugElement.query(By.css('.publishText')).nativeElement;
    expect(publishArea).toBeTruthy();
    publishButton = fixture.debugElement.query(By.css('#publishButton'));
    expect(publishButton).toBeFalsy();
  });

  it('should have a disabled PUBLISH button (for now) and a tooltip explaining', () => {
    const publishButton = fixture.debugElement.query(By.css('#publishButton')).nativeElement;
    expect(publishButton.disabled).toBe(true);
    const publishDiv = fixture.debugElement.query(By.css('#publishWrapper')).nativeElement;
    expect(publishDiv.getAttribute('mattooltip')).toBe('Future Baseline Functionality');
  });
});
