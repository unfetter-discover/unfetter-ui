import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import * as d3 from 'd3';

import { HeatmapComponent } from './heatmap.component';
import { HeatMapOptions } from './heatmap.data';

describe('HeatmapComponent', () => {

    let component: HeatmapComponent;
    let fixture: ComponentFixture<HeatmapComponent>;
    let heatmap: DebugElement;

    const mockData = [
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HeatmapComponent, ],
            imports: [
                HttpClientTestingModule,
                OverlayModule,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeatmapComponent);
        heatmap = fixture.debugElement.query(By.css('div.heat-map'));
        expect(heatmap).toBeTruthy();
        heatmap.nativeElement.style.width = '300px';
        heatmap.nativeElement.style.height = '100px';
        component = fixture.componentInstance;
        component.options = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should merge options', () => {
        let opts: HeatMapOptions = {
            view: {
                headerHeight: -1,
                minSidePadding: -1,
                minBottomPadding: -1,
            },
            color: {
                maxGradients: 0,
            },
            hover: {
                hoverColor: {bg: ['black', 'white'], fg: 'transparent'},
                hoverDelay: -500,
            },
            text: {
                headerFontSize: -12,
                cellFontSize: -6,
            },
            zoom: {
                minimapFontSize: -3,
                minimapPannerWidth: -1,
                zoomExtent: undefined,
                cellTitleExtent: 6,
            },
        }
        let newopts = HeatMapOptions.merge(opts, component.options);
        expect(newopts.view.headerHeight).toEqual(0);
        expect(newopts.view.minSidePadding).toEqual(0);
        expect(newopts.view.minBottomPadding).toEqual(0);
        expect(newopts.color.maxGradients).toEqual(1);
        expect(newopts.hover.hoverDelay).toEqual(1);
        expect(newopts.hover.hoverColor.bg).toEqual('black');
        expect(newopts.text.headerFontSize).toEqual(0);
        expect(newopts.text.cellFontSize).toEqual(0);
        expect(newopts.zoom.minimapFontSize).toEqual(0);
        expect(newopts.zoom.minimapPannerWidth).toEqual(0);
        expect(newopts.zoom.zoomExtent).toBeDefined();
        expect(newopts.zoom.zoomExtent.length).toEqual(2);
        expect(newopts.zoom.zoomExtent[0]).toEqual(1);
        expect(newopts.zoom.zoomExtent[1]).toEqual(1);
        expect(newopts.zoom.cellTitleExtent).toEqual(1);

        newopts.zoom.zoomExtent[0] = 0;
        newopts.zoom.zoomExtent.pop();
        newopts = HeatMapOptions.merge(newopts, component.options);
        expect(newopts.zoom.zoomExtent.length).toEqual(2);
        expect(newopts.zoom.zoomExtent[0]).toEqual(.01);
        expect(newopts.zoom.zoomExtent[1]).toEqual(1);
        expect(newopts.zoom.cellTitleExtent).toEqual(1);

        (newopts.zoom.zoomExtent as number[]) = [5, 4, 3, 2, 1];
        newopts = HeatMapOptions.merge(newopts, component.options);
        expect(newopts.zoom.zoomExtent.length).toEqual(2);
        expect(newopts.zoom.zoomExtent[0]).toEqual(4);
        expect(newopts.zoom.zoomExtent[1]).toEqual(5);
        expect(newopts.zoom.cellTitleExtent).toEqual(4);
    });

    it('should accept input heatmap data, default settings', () => {
        component.heatMapData = mockData;
        component.ngOnInit();
        fixture.detectChanges();

        let cells: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg g.heat-map-cell');
        expect(cells).toBeTruthy();
        expect(cells.length).toEqual(21);
        expect(Array.from(cells).every(cell => cell.childNodes.length === 1)).toBeTruthy();

        let rects: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg g.heat-map-cell rect');
        expect(Array.from(rects)
            .filter((rect: any) => rect.attributes['fill'].nodeValue ===
                    component.options.color.heatColors['true'].bg).length).toEqual(9);
    });

    it('should draw cell text', () => {
        component.heatMapData = mockData;
        component.options = {
            color: {
                showGradients: false,
                heatColors: Object.assign({}, component.options.color.heatColors, {
                    'gradient': {bg: ['red', 'green'], fg: 'black'},
                }),
            },
            text: {
                showHeaderText: true,
                allowHeaderSplit: true,
                hyphenateHeaders: true,
                showCellText: true,
                allowCellSplit: true,
                hyphenateCells: true,
            },
        }
        component.ngOnInit();
        fixture.detectChanges();

        let texts: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg g.heat-map-cell text');
        expect(Array.from(texts).length).toBeGreaterThan(0);
    });

    it('should draw gradients', () => {
        const gbatch = Math.floor(Math.random() * mockData.length);
        const gcell = Math.floor(Math.random() * (mockData[gbatch].cells.length - 1));
        const gtitle = mockData[gbatch].cells[gcell].title;
        component.heatMapData = mockData.map(batch => {
            return {title: batch.title, value: batch.value, cells: batch.cells.map(cell => Object.assign({}, cell))};
        });
        component.heatMapData[gbatch].value = 'classed';
        component.heatMapData[gbatch].cells[gcell].value = 'test';
        component.heatMapData[gbatch].cells[gcell + 1].value = 'classed';
        component.options = {
            color: {
                batchColors: [
                    {header: {bg: '#e3f2fd', fg: '#333'}, body: {bg: '#e3f2fd', fg: 'black'},
                     border: {width: 2, color: '#f33'}},
                    {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
                    {header: {bg: '.header', fg: '#333'}, body: {bg: 'transparent', fg: '.header'}},
                ],
                heatColors: Object.assign({}, component.options.color.heatColors, {
                    'test': {bg: ['#933', '#339'], fg: 'white'},
                    'nobgs': {bg: [], fg: 'beige'},
                    'onebg': {bg: ['.red'], fg: 'black'},
                    'manybgs': {bg: ['red', 'green', 'blue'], fg: 'black'},
                    'classed': {bg: '.red', fg: '.header'},
                }),
                showGradients: true,
                maxGradients: 2,
            },
        }
        component.ngOnInit();
        fixture.detectChanges();

        /*
         * For some reason, running the test here refuses to write the svg defs. In live, it draws it fine.
         * It does, however, set the gradient URL in the rect, so this test will prove that.
         */
        let grect = fixture.nativeElement.querySelector(`g.heat-map-cell[aria-label="${gtitle}"] rect`);
        expect(grect).not.toBeNull();
        expect(grect.getAttribute('fill')).toMatch(/url\(\#gradient\-\d*\)/);
    });

    it('should create a minimap', async(() => {
        let minimap = fixture.debugElement.query(By.css('div.mini-map'));
        minimap.nativeElement.style.width = '100px';
        minimap.nativeElement.style.height = '50px';

        component.heatMapData = mockData;
        component.options = {
            text: {
                showHeaderText: true,
                allowHeaderSplit: true,
                hyphenateHeaders: true,
                showCellText: true,
                allowCellSplit: true,
                hyphenateCells: true,
            },
            zoom: {
                hasMinimap: true,
                cellTitleExtent: 2,
            },
        };
        component.ngOnInit();
        fixture.detectChanges();

        // testing zooming on the heatmap
        fixture.whenStable().then(() => {
            component.heatmap.workspace.canvas.transition()
                .duration(100).call(component.heatmap.workspace.zoom.transform,
                        d3.zoomIdentity.scale(2.5).translate(300, 300));
            fixture.whenStable().then(() => {
                component.minimap.workspace.canvas.node().dispatchEvent(new Event('click'));
                component.minimap.workspace.canvas.node().dispatchEvent(new Event('click'));
                /* NOTE: clicking not registering */
                fixture.whenStable().then(() => {
                    component.minimap.workspace.panner.transition().duration(1)
                        .call(component.heatmap.workspace.zoom.transform,
                                d3.zoomIdentity.translate(50, 20).scale(.9));
                });
            });
        });
    }));

    it('should handle cell hovers', async(() => {
        const tbatch = Math.floor(Math.random() * mockData.length);
        const tcell = Math.floor(Math.random() * mockData[tbatch].cells.length);
        const target = mockData[tbatch].cells[tcell];
        component.heatMapData = mockData;
        component.options = {hover: {hoverDelay: 1}};
        component.ngOnInit();
        fixture.detectChanges();

        let spy = null;
        component.onHover.subscribe(ev => spy = ev);
        let trect = fixture.nativeElement.querySelector(`g.heat-map-cell[aria-label="${target.title}"] rect`);
        expect(trect).not.toBeNull();
        trect.dispatchEvent(new Event('mouseover'));
        trect.parentElement.dispatchEvent(new Event('mouseover'));
        fixture.whenStable().then(() => {
            expect(spy).not.toBeNull();
            expect(spy.row.title).toBe(target.title);
            trect.dispatchEvent(new Event('mouseout'));
            trect.parentElement.dispatchEvent(new Event('mouseout'));
            expect(spy).toBeNull();
        });
    }));

    it('should handle cell clicks', () => {
        const tbatch = Math.floor(Math.random() * mockData.length);
        const tcell = Math.floor(Math.random() * mockData[tbatch].cells.length);
        const target = mockData[tbatch].cells[tcell];
        component.heatMapData = mockData;
        component.ngOnInit();
        fixture.detectChanges();

        let spy = null;
        component.onClick.subscribe(ev => spy = ev);
        let trect = fixture.nativeElement.querySelector(`g.heat-map-cell[aria-label="${target.title}"] rect`);
        expect(trect).not.toBeNull();
        trect.parentElement.dispatchEvent(new Event('click'));
        expect(spy).not.toBeNull();
        expect(spy.row.title).toBe(target.title);
    });

});
