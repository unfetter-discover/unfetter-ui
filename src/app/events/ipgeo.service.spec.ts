import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf, Observable } from 'rxjs';

import { IPGeoService } from './ipgeo.service';
import { GenericApi } from '../core/services/genericapi.service';
import { RunConfigService } from '../core/services/run-config.service';

describe('ipgeo service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RunConfigService,
                IPGeoService,
                GenericApi,
            ],
        });
    });

    it('should fake lookup a machine', inject([IPGeoService, GenericApi], (service: IPGeoService, api: GenericApi) => {
        const ipaddr = '205.175.221.58'; // one of the services shows a sample using this ip
        const spy = spyOn(api, 'get').and.returnValue(observableOf({
            data: {
                success: true,
                ip: ipaddr,
                provider: 'test',
                city: 'Unfetterville',
            }
        }));
        service.lookup(ipaddr).subscribe(
            (response) => {
                console.log('We received an IP address lookup response:', response);
                expect(spy).toHaveBeenCalled();
                expect(response).toBeDefined();
                expect(response.data).toBeDefined();
                expect(response.data.success).toBeTruthy();
                expect(response.data.ip).toEqual(ipaddr);
                expect(response.data.city).toBeDefined();

                // Now do it again to prove it pulls it out of its internal cache.
                spy.calls.reset();
                service.lookup(ipaddr).subscribe(
                    (response2) => {
                        expect(spy).not.toHaveBeenCalled();
                        expect(response2).toBe(response);
                    },
                    (err) => expect(false).toBeTruthy(`For some reason, second call failed: ${err}`),
                );
            },
            (err) => expect(false).toBeTruthy(`We got an error looking up an IP: ${err}`),
        );
    }));

});
