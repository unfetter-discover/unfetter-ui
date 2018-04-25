import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material';
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
