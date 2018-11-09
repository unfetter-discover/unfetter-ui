import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { ContributorListComponent } from './contributor-list.component';
import { GlobalModule } from '../../../global/global.module';

describe('ContributorListComponent', () => {

    let fixture: ComponentFixture<ContributorListComponent>;
    let component: ContributorListComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    GlobalModule,
                ],
                declarations: [
                    ContributorListComponent,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContributorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
