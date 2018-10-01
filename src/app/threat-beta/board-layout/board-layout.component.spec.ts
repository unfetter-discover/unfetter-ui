import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLayoutComponent } from './board-layout.component';

describe('BoardLayoutComponent', () => {
  let component: BoardLayoutComponent;
  let fixture: ComponentFixture<BoardLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
