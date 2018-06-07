import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TreemapComponent } from './treemap.component';
import { ResizeDirective } from '../../directives/resize.directive';
import { GenericApi } from '../../../core/services/genericapi.service';
import { TreemapOptions } from './treemap.data';

/*
 * Terminating tests with this component. Thanks to Google wanting to call out to _download_ its API, these tests
 * inconsistent lock up and fail. Will be dropping Google's Charting API in the future.
 */
xdescribe('TreemapComponent', () => {

    let component: TreemapComponent;
    let fixture: ComponentFixture<TreemapComponent>;
    let treemap: DebugElement;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    TreemapComponent,
                    ResizeDirective,
                ],
                imports: [
                    MatCardModule,
                    OverlayModule,
                    HttpClientTestingModule,
                ],
                providers: [
                    GenericApi
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreemapComponent);
        treemap = fixture.debugElement.query(By.css('div.tree-map'));
        expect(treemap).toBeTruthy();
        treemap.nativeElement.style.width = '400px';
        treemap.nativeElement.style.height = '400px';
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should merge options', () => {
        let opts: TreemapOptions = {
            headerHeight: -1,
            fontColor: 'black',
            fontFamily: 'Trebuchet',
            fontSize: -1,
            minColor: 'lightBlue',
            midColor: 'blue',
            maxColor: 'darkBlue',
            noColor: null,
            minHighlightColor: 'lightPurple',
            midHighlightColor: 'purple',
            maxHighlightColor: 'darkPurple',
        }

        TreemapOptions.merge(opts, component.options);
        expect(opts.headerHeight).toEqual(0);
        expect(opts.fontColor).toEqual('black');
        expect(opts.fontFamily).toEqual('Trebuchet');
        expect(opts.fontSize).toEqual(6);
        expect(opts.minColor).toEqual('lightBlue');
        expect(opts.midColor).toEqual('blue');
        expect(opts.maxColor).toEqual('darkBlue');
        expect(opts.noColor).toEqual('#ffffff');
        expect(opts.minHighlightColor).toEqual('lightPurple');
        expect(opts.midHighlightColor).toEqual('purple');
        expect(opts.maxHighlightColor).toEqual('darkPurple');
    });

    it('should accept input treemap data', async() => {
        component.data = [
            [ 'Countries', 'Continents', '# Medals' ],
            [ 'Country', '', 0 ],
            [ 'North America', 'Country', 0 ],
            [ 'United States', 'North America', 6 ],
            [ 'Europe', 'Country', 0 ],
            [ 'Britain', 'Europe', 2 ],
            [ 'Germany', 'Europe', 2.5 ],
        ];
        component.ngOnInit();
        fixture.detectChanges();
        component.redraw();

        // TODO see if one of the top nodes exists on the generated chart.
        //      I can't get this to work. The view does not see any generated content within the fixture.
        //      But, hey!, at least the chart gets drawn...
        let map = fixture.nativeElement.querySelector('.tree-map');
        expect(map).toBeTruthy();
        let view = map.querySelector('.tree-map-view');
        expect(view).toBeTruthy();
        let canvas = view.querySelectorAll('svg');
        console.log('canvas', canvas);
        // Something about the way Google does it prevents us from being able to test the canvas...
    });

});
