import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedComponent } from './related.component';
import { MatCardModule } from '@angular/material';

describe('RelatedComponent', () => {
  let component: RelatedComponent;
  let fixture: ComponentFixture<RelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedComponent ],
      imports: [ MatCardModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
