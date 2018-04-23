import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackPatternChooserComponent } from './attack-pattern-chooser.component';

describe('AttackPatternChooserComponent', () => {

    let component: AttackPatternChooserComponent;
    let fixture: ComponentFixture<AttackPatternChooserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AttackPatternChooserComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AttackPatternChooserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
