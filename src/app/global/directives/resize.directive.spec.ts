import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { ResizeDirective } from './resize.directive';

@Component({
  template: `
    <div (resize)="resize()">
        <div id="bottom"></div>
    </div>
    `
})
class TestResizeComponent {
  public resize() {}
}

describe('ResizeDirective', () => {

    let fixture: ComponentFixture<TestResizeComponent>;
    let component: TestResizeComponent;

    beforeEach(async(() => {
            TestBed.configureTestingModule({
            declarations: [
                TestResizeComponent,
                ResizeDirective,
            ]
        })
        .compileComponents();        
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestResizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

});
