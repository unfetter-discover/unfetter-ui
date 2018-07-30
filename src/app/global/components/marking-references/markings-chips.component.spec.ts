import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkingsChipsComponent } from './markings-chips.component';

describe('MarkingsChipsComponent', () => {

    let component: MarkingsChipsComponent;
    let fixture: ComponentFixture<MarkingsChipsComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ MarkingsChipsComponent ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkingsChipsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
