import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalModule } from '../../global/global.module';
import { SideBoardComponent } from './side-board.component';


describe('SideBoardComponent', () => {
  let component: SideBoardComponent;
  let fixture: ComponentFixture<SideBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideBoardComponent],
      imports: [GlobalModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
