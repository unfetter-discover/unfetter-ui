import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesHomeComponent } from './categories-home.component';

describe('CategoriesHomeComponent', () => {
  let component: CategoriesHomeComponent;
  let fixture: ComponentFixture<CategoriesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
