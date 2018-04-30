import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticsPaneComponent } from './tactics-pane.component';

describe('TacticsPaneComponent', () => {
  let component: TacticsPaneComponent;
  let fixture: ComponentFixture<TacticsPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticsPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
