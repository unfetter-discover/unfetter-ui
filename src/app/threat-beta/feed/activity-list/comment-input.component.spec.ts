import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';

import { CommentInputComponent } from './comment-input.component';
import { SimpleMDEConfig } from '../../../global/static/simplemde-config';

describe('CommentInputComponent', () => {

    let fixture: ComponentFixture<CommentInputComponent>;
    let component: CommentInputComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    SimplemdeModule.forRoot({
                        provide: SIMPLEMDE_CONFIG,
                        useValue: SimpleMDEConfig.basicConfig
                    })
                ],
                declarations: [
                    CommentInputComponent,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
