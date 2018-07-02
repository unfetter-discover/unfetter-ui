import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ResultHeaderComponent } from './result-header.component';
import { SummaryCalculationService } from '../summary/summary-calculation.service';

xdescribe('ResultHeaderComponent', () => {
  let component: ResultHeaderComponent;
  let fixture: ComponentFixture<ResultHeaderComponent>;

  const serviceMock = { baseline: {}};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ResultHeaderComponent],
      providers: [
        {
          provide: SummaryCalculationService,
          useValue: serviceMock
        }
      ]
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
    component.published = null;
    let publishButton = fixture.debugElement.query(By.css('#publishButton')).nativeElement;
    let publishArea = fixture.debugElement.query(By.css('.publishText'));
    expect(publishButton).toBeTruthy();
    expect(publishArea).toBeFalsy();

    component.published = new Date(2018, 2);
    fixture.detectChanges();
    publishArea = fixture.debugElement.query(By.css('.publishText')).nativeElement;
    expect(publishArea).toBeTruthy();
    publishButton = fixture.debugElement.query(By.css('#publishButton'));
    expect(publishButton).toBeFalsy();
  });
});
