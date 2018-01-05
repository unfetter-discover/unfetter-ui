import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SpeedDialComponent } from './speed-dial.component';
import { SpeedDialItem } from './speed-dial-item';

describe('SpeedDialComponent', () => {
  let component: SpeedDialComponent;
  let fixture: ComponentFixture<SpeedDialComponent>;

  beforeEach(async(() => {
    const matModules = [
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
    ];

    TestBed.configureTestingModule({
      declarations: [SpeedDialComponent],
      imports: [...matModules]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit clicks of mini Fab btns', () => {
    const item = new SpeedDialItem('add', 'add');
    component.itemClickedEmitter.subscribe((e: SpeedDialItem) => {
      expect(e).toBeDefined();
      expect(e.isMatIcon).toBeTruthy();
      expect(e.matIcon).toEqual('add');
      expect(e.name).toEqual('add');
    });

    component.onMiniFabClick(item);
  });

  it('should emit clicks of toggle open state', () => {
    // start off closed
    expect(component.open).toBeFalsy();
    let testFireCount = 0;
    let expectedOpenState = true;
    component.toggleEmitter.subscribe((e: boolean) => {
      expect(e).toBeDefined();
      expect(e).toEqual(expectedOpenState);
      expectedOpenState = !expectedOpenState;
      testFireCount += 1;
    });
    // emit open close events
    component.onToggle();
    component.onToggle();
    expect(testFireCount).toBe(2);
  });
});
