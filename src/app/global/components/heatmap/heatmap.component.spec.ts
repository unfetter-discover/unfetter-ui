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
            {batch: 'The Americas', active: null, columns: [[
                {batch: 'Canada', active: false},
                {batch: 'America', active: true},
                {batch: 'Mexico', active: false},
                {batch: 'Brazil', active: true},
            ]]},
            {batch: 'Eurasia', active: null, columns: [[
                {batch: 'Britain', active: true},
                {batch: 'France', active: false},
                {batch: 'Germany', active: true},
                {batch: 'Russia', active: false},
                {batch: 'China', active: false},
                {batch: 'India', active: false},
                {batch: 'Arabia', active: false},
                {batch: 'Greece', active: true},
                {batch: 'Italy', active: false},
            ]]},
            {batch: 'Africa', active: null, columns: [[
                {batch: 'Egypt', active: false},
                {batch: 'Congo', active: false},
            ]]},
            {batch: 'Australonesia', active: null, columns: [[
                {batch: 'Australia', active: true},
                {batch: 'New Zealand', active: false},
                {batch: 'Indonesia', active: false},
                {batch: 'Philippines', active: true},
                {batch: 'Fiji', active: true},
                {batch: 'Bali', active: true},
            ]]},
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
