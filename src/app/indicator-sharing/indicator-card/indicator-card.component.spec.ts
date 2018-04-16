import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatChipsModule, MatSelectModule, MatMenuModule, MatIconModule, MatCardModule, MatTooltipModule, MatTabsModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { IndicatorCardComponent } from './indicator-card.component';
import { TimeAgoPipe } from '../../global/pipes/time-ago.pipe';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { AddLabelReactiveComponent } from '../../global/components/add-label/add-label.component';
import { AddAttackPatternComponent } from '../add-attack-pattern/add-attack-pattern.component';
import { ChipLinksComponent } from '../../global/components/chip-links/chip-links.component';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../core/services/auth.service';
import { Constance } from '../../utils/constance';
import { mockConfigService } from '../../testing/mock-config-service';
import { ConfigService } from '../../core/services/config.service';

describe('IndicatorCardComponent', () => {
    let component: IndicatorCardComponent;
    let fixture: ComponentFixture<IndicatorCardComponent>;
    let store;

    const mockIndService = {
        // No functions used at current coverage level
    };

    const mockAuthService = {
        getUser: () => {
            return {
                _id: '1234',
                userName: 'Demo-User',
                firstName: 'Demo',
                lastName: 'User',
                organizations: [
                    {
                        'id': Constance.UNFETTER_OPEN_ID,
                        'approved': true,
                        'role': 'STANDARD_USER'
                    }
                ],
            };
        }
    };

    const mockRenderer = {
        listen: (target, event, callback) => {
            return () => {};
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ NO_ERRORS_SCHEMA ],
            declarations: [
                IndicatorCardComponent,
                FieldSortPipe,
                TimeAgoPipe,
                CapitalizePipe,
                ChipLinksComponent,
            ],
            imports: [
                MatButtonModule,
                MatChipsModule,
                MatSelectModule,
                MatMenuModule,
                MatIconModule,
                MatCardModule,
                MatTooltipModule,
                MatTabsModule,
                MatAutocompleteModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: IndicatorSharingService,
                    useValue: mockIndService
                },
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: Renderer2,
                    useValue: mockRenderer
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorCardComponent);
        component = fixture.componentInstance;
        component.indicator = {
            name: 'test indicator',
            id: 'indicator-1234'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
