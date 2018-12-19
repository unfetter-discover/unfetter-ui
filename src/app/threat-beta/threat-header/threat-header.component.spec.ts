import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ThreatHeaderComponent } from './threat-header.component';
import { GlobalModule } from '../../global/global.module';

describe('ThreatHeaderComponent', () => {

    let fixture: ComponentFixture<ThreatHeaderComponent>;
    let component: ThreatHeaderComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    GlobalModule,
                    RouterTestingModule
                ],
                declarations: [
                    ThreatHeaderComponent,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreatHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
