import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';

import { HeartbeatComponent } from './heartbeat.component';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs/Observable';
import { HeartbeatStatus } from '../../global/models/heartbeat';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { LoadingSpinnerComponent } from '../../global/components/loading-spinner/loading-spinner.component';

describe('HeartbeatComponent', () => {
    let component: HeartbeatComponent;
    let fixture: ComponentFixture<HeartbeatComponent>;

    const mockAdminService = {
        getHeartbeat: function() {
            return Observable.of({
                attributes: {
                    statuses: [
                        {
                            service: 'unfetter-mock',
                            status: HeartbeatStatus.RUNNING
                        }
                    ]
                }
            });
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatProgressSpinnerModule
            ],
            declarations: [ 
                HeartbeatComponent,
                CapitalizePipe,
                LoadingSpinnerComponent 
            ],
            providers: [
                { provide: AdminService, useValue: mockAdminService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeartbeatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have services', () => {
        const services = component.heartbeats;
        expect(services.length > 0).toBeTruthy();
    });
});
