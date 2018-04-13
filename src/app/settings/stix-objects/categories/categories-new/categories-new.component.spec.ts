import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesNewComponent } from './categories-new.component';

describe('CategoriesNewComponent', () => {
  let component: CategoriesNewComponent;
  let fixture: ComponentFixture<CategoriesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
