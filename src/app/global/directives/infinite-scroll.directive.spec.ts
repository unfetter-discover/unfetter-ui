import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

@Component({
  template: `
    <div infiniteScroll (atBottom)="atBottom()">
        <div id="bottom"></div>
    </div>
    `
})
class TestInfiniteScrollComponent {
  public atBottom() {}
}

describe('InfiniteScrollDirective', () => {

    let component: TestInfiniteScrollComponent;
    let fixture: ComponentFixture<TestInfiniteScrollComponent>;
    let inputEl: DebugElement;

    beforeEach(async(() => {
            TestBed.configureTestingModule({
            declarations: [
                TestInfiniteScrollComponent, 
                InfiniteScrollDirective
            ]
        })
        .compileComponents();        
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInfiniteScrollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });
});
