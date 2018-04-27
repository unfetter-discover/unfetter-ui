import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import * as d3 from 'd3';

import { HeatmapComponent } from './heatmap.component';
import { HeatmapOptions } from './heatmap.data';

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
        let opts: HeatmapOptions = {
            view: {
                headerHeight: -1,
                minSidePadding: -1,
                minBottomPadding: -1,
            },
            color: {
                maxGradients: 0,
            },
            hover: {
                color: {bg: ['black', 'white'], fg: 'transparent'},
                delay: -500,
            },
            text: {
                headers: {
                    fontSize: -12,
                },
                cells: {
                    fontSize: -6,
                },
            },
            zoom: {
                zoomExtent: null,
                cellTitleExtent: 6,
                minimap: {
                    text: {
                        fontSize: -3,
                    },
                    panner: {
                        width: -1,
                        color: 'bleu'
                    },
                },
            },
        }

        let newopts = HeatmapOptions.merge(opts, component.options);
        expect(newopts.view.headerHeight).toEqual(0);
        expect(newopts.view.minSidePadding).toEqual(0);
        expect(newopts.view.minBottomPadding).toEqual(0);
        expect(newopts.color.maxGradients).toEqual(1);
        expect(newopts.hover.delay).toEqual(1);
        expect(newopts.hover.color.bg).toEqual('black');
        expect(newopts.text.headers.fontSize).toEqual(0);
        expect(newopts.text.cells.fontSize).toEqual(0);
        expect(newopts.zoom.minimap.text.fontSize).toEqual(0);
        expect(newopts.zoom.minimap.panner.width).toEqual(1);
        expect(newopts.zoom.zoomExtent).toBeNull();
        expect(newopts.zoom.cellTitleExtent).toEqual(1);

        newopts.zoom.zoomExtent = [0, 0];
        newopts.zoom.zoomExtent.pop();
        newopts = HeatmapOptions.merge(newopts, component.options);
        expect(newopts.zoom.zoomExtent.length).toEqual(2);
        expect(newopts.zoom.zoomExtent[0]).toEqual(0.01);
        expect(newopts.zoom.zoomExtent[1]).toEqual(1);

        (newopts.zoom.zoomExtent as number[]) = [5, 4, 3, 2, 1];
        newopts = HeatmapOptions.merge(newopts, component.options);
        expect(newopts.zoom.zoomExtent.length).toEqual(2);
        expect(newopts.zoom.zoomExtent[0]).toEqual(4);
        expect(newopts.zoom.zoomExtent[1]).toEqual(5);
        expect(newopts.zoom.cellTitleExtent).toEqual(4);
    });

    it('should accept input heatmap data, default settings', () => {
        component.data = mockData;
        fixture.detectChanges();

        let cells: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg.heat-map-canvas g.heat-map-cell');
        expect(cells).toBeTruthy();
        expect(cells.length).toEqual(21);
        expect(Array.from(cells).every(cell => cell.childNodes.length === 1)).toBeTruthy();

        let rects: NodeList = fixture.nativeElement.querySelectorAll('.heat-map svg.heat-map-canvas g.heat-map-cell rect');
        expect(Array.from(rects)
            .filter((rect: any) => rect.attributes['fill'].nodeValue ===
                    component.options.color.heatColors['true'].bg).length).toEqual(9);
    });

    it('should draw cell text', () => {
        component.data = mockData;
        component.options = {
            color: {
                showGradients: false,
                heatColors: Object.assign({}, component.options.color.heatColors, {
                    'gradient': {bg: ['red', 'green'], fg: 'black'},
                }),
            },
            text: {
                headers: {
                    showText: true,
                    allowSplit: true,
                    hyphenate: true,
                },
                cells: {
                    showText: true,
                    allowSplit: true,
                    hyphenate: true,
                },
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
        component.data = mockData.map(batch => {
            return {title: batch.title, value: batch.value, cells: batch.cells.map(cell => Object.assign({}, cell))};
        });
        component.data[gbatch].value = 'classed';
        component.data[gbatch].cells[gcell].value = 'test';
        component.data[gbatch].cells[gcell + 1].value = 'classed';
        component.options = {
            color: {
                batchColors: [
                    {
                        header: {bg: '#e3f2fd', fg: '#333', border: {width: 2, color: '#f33'}},
                        body: {bg: '#e3f2fd', fg: 'black'}
                    },
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
        component.data = mockData;
        component.options = {
            text: {
                headers: {
                    showText: true,
                    allowSplit: true,
                    hyphenate: true,
                },
                cells: {
                    showText: true,
                    allowSplit: true,
                    hyphenate: true,
                },
            },
            zoom: {
                cellTitleExtent: 2,
            },
        };
        component.ngOnInit();
        fixture.detectChanges();

        // testing zooming on the heatmap
        fixture.whenStable().then(() => {
            component.helper['heatmap'].workspace.canvas.transition()
                .duration(100).call(component.helper['heatmap'].workspace.zoom.transform,
                        d3.zoomIdentity.scale(2.5).translate(300, 300));
            fixture.whenStable().then(() => {
                component.helper['minimap'].workspace.canvas.node().dispatchEvent(new Event('click'));
                component.helper['minimap'].workspace.canvas.node().dispatchEvent(new Event('click'));
                /* NOTE: clicking not registering */
                fixture.whenStable().then(() => {
                    component.helper['minimap'].workspace.panner.transition().duration(1)
                        .call(component.helper['heatmap'].workspace.zoom.transform,
                                d3.zoomIdentity.translate(50, 20).scale(.9));
                });
            });
        });
    }));

    it('should handle cell hovers', async(() => {
        const tbatch = Math.floor(Math.random() * mockData.length);
        const tcell = Math.floor(Math.random() * mockData[tbatch].cells.length);
        const target = mockData[tbatch].cells[tcell];
        component.data = mockData;
        component.options = {hover: {delay: 1}};
        component.ngOnInit();
        fixture.detectChanges();

        let spy = null;
        component.hover.subscribe(ev => spy = ev);
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
        component.data = mockData;
        component.ngOnInit();
        fixture.detectChanges();

        let spy = null;
        component.click.subscribe(ev => spy = ev);
        let trect = fixture.nativeElement.querySelector(`g.heat-map-cell[aria-label="${target.title}"] rect`);
        expect(trect).not.toBeNull();
        trect.parentElement.dispatchEvent(new Event('click'));
        expect(spy).not.toBeNull();
        expect(spy.row.title).toBe(target.title);
    });

});
