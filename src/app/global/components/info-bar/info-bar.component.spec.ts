import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoBarComponent } from './info-bar.component';

describe('InfoBarComponent', () => {
  let component: InfoBarComponent;
  let fixture: ComponentFixture<InfoBarComponent>;

  beforeEach(async(() => {

    const materialModules = [
      MatButtonModule,
    ]
    TestBed.configureTestingModule({
      declarations: [InfoBarComponent],
      imports: [
        ...materialModules,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a close action', () => {
    expect(component.shouldShow).toBeTruthy();
    component.onDismissClick();
    expect(component.shouldShow).toBeFalsy();
  });

  it('should dislay message', () => {
    const customMsg = 'custom message';
    component.message = customMsg;
    fixture.detectChanges();
    const infoBarElement = fixture.debugElement;
    const msgElement = infoBarElement.query(By.css('.info-bar'));
    expect(msgElement.nativeElement).toBeDefined();
    expect(msgElement.nativeElement.textContent).toContain(customMsg);
  });

  it('should dislay complete action', () => {
    component.completeActionUrl = 'https://127.0.0.1/test';
    component.completeBtnMsg = 'click to complete';
    fixture.detectChanges();
    const infoBarElement = fixture.debugElement;
    const msgElement = infoBarElement.query(By.css('.info-bar'));
    expect(msgElement.nativeElement).toBeDefined();
    expect(msgElement.nativeElement.textContent).toContain(component.completeBtnMsg);
  });
});
