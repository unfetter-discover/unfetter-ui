import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';

import { HeatmapComponent } from './heatmap.component';
import { GenericApi } from '../../../core/services/genericapi.service';

describe('HeatmapComponent', () => {

    let component: HeatmapComponent;
    let fixture: ComponentFixture<HeatmapComponent>;
    let heatmap: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HeatmapComponent, ],
            imports: [
                HttpClientTestingModule,
                OverlayModule,
            ],
            providers: [
                GenericApi,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeatmapComponent);
        heatmap = fixture.debugElement.query(By.css('div.heat-map'));
        heatmap.nativeElement.style.width = '300px';
        heatmap.nativeElement.style.height = '100px';
        expect(heatmap).toBeTruthy();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept input heatmap data, default settings', async() => {
        component.heatMapData = [
            {title: 'The Americas', value: null, cells: [
                {title: 'Canada', value: false},
                {title: 'America', value: true},
                {title: 'Mexico', value: false},
                {title: 'Brazil', value: true},
            ]},
            {title: 'Eurasia', value: null, cells: [
                {title: 'Britain', value: true},
                {title: 'France', value: false},
                {title: 'Germany', value: true},
                {title: 'Russia', value: false},
                {title: 'China', value: false},
                {title: 'India', value: false},
                {title: 'Arabia', value: false},
                {title: 'Greece', value: true},
                {title: 'Italy', value: false},
            ]},
            {title: 'Africa', value: null, cells: [
                {title: 'Egypt', value: false},
                {title: 'Congo', value: false},
            ]},
            {title: 'Australonesia', value: null, cells: [
                {title: 'Australia', value: true},
                {title: 'New Zealand', value: false},
                {title: 'Indonesia', value: false},
                {title: 'Philippines', value: true},
                {title: 'Fiji', value: true},
                {title: 'Bali', value: true},
            ]},
        ];
        component.ngOnInit();
        fixture.detectChanges();

        let cells: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg g.heat-map-cell');
        console.log('cells', cells);
        expect(cells).toBeTruthy();
        expect(cells.length).toEqual(21);
        expect(Array.from(cells).every(cell => cell.childNodes.length === 1)).toBeTruthy();

        let rects: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg g.heat-map-cell rect');
        console.log('rects', rects);
        expect(Array.from(rects)
            .filter(rect => rect.attributes['fill'].nodeValue ===
                    component.options.heatColors['true'].bg).length).toEqual(9);
    });

});
