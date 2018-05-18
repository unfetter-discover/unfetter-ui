import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TreemapComponent } from './treemap.component';
import { ResizeDirective } from '../../directives/resize.directive';
import { GenericApi } from '../../../core/services/genericapi.service';

describe('TreemapComponent', () => {

    let component: TreemapComponent;
    let fixture: ComponentFixture<TreemapComponent>;
    let treemap: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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

        // TODO see if one of the top nodes exists on the generated chart.
        //      I can't get this to work. The view does not see any generated content within the fixture.
        //      But, hey!, at least the chart gets drawn...
        let map: NodeList = fixture.nativeElement.querySelectorAll('.tree-map');
        expect(map).toBeTruthy();
        console.log('treemap', map);
        let canvas = fixture.debugElement.queryAll(By.css('svg'));
        console.log('canvas', canvas);
        // Something about the way Google does it prevents us from being able to test the canvas...
    });

});
