import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { ScrollTrapDirective } from './scroll-trap.directive';

@Component({
  template: `
    <div scrollTrap>
        <hr/>
    </div>
    `
})
class TestScrollTrapComponent {
  public resize() {}
}

describe('ScrollTrapDirective', () => {

    let fixture: ComponentFixture<TestScrollTrapComponent>;
    let component: TestScrollTrapComponent;

    beforeEach(async(() => {
            TestBed.configureTestingModule({
            declarations: [
                TestScrollTrapComponent,
                ScrollTrapDirective,
            ]
        })
        .compileComponents();        
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestScrollTrapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
        const div: Element = fixture.nativeElement.querySelector('div');
        div.dispatchEvent(new WheelEvent('wheel'));
    });

});
