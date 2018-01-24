import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpWindowComponent } from './help-window.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

describe('HelpWindowComponent', () => {
  let component: HelpWindowComponent;
  let fixture: ComponentFixture<HelpWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpWindowComponent ],
      imports: [
        MatIconModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
