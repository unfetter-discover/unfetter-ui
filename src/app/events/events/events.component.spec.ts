import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fix broken tests
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material';
import { GlobalModule } from '../../global/global.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
=======
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
>>>>>>> fix broken tests

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fix broken tests
  const materialModules = [
    MatSidenavModule
  ];

<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        GlobalModule,
      ],
=======
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ]
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ]
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        GlobalModule,
      ],
>>>>>>> fix broken tests
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
