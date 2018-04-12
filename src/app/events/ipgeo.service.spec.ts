import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPGeoService } from './ipgeo.service';
import { GenericApi } from '../core/services/genericapi.service';

describe('ipgeo service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [IPGeoService, GenericApi],
        });
    });

    /**
     * Disabled this. We don't want bad connections to kill our builds or Travis runs.
     */
    xit('should lookup a machine', inject([IPGeoService, GenericApi], (service: IPGeoService, api: GenericApi) => {
        const ipaddr = '205.175.221.58'; // one of the services shows a sample using this ip
        service.lookup(ipaddr).subscribe(
            (response) => {
                console.log('We received an IP address lookup response:', response); // leaving this here for other devs
                expect(response).toBeDefined();
                expect(response.length).toBe(1);
                expect(response[0].success).toBeTruthy();
                expect(response[0].ip).toEqual(ipaddr);
                expect(response[0].city).toBeDefined();
            },
            (err) => expect(false).toBeTruthy(`We got an error looking up an IP: ${err}`),
        );
    }));

    it('should fake lookup a machine', inject([IPGeoService], (service: IPGeoService) => {
        const ipaddr = '205.175.221.58'; // one of the services shows a sample using this ip
        const httpMock = TestBed.get(HttpTestingController);
        service.lookup(ipaddr).subscribe(
            (response) => {
                console.log('We received an IP address lookup response:', response); // leaving this here for other devs
                expect(response).toBeDefined();
                expect(response.length).toBe(1);
                expect(response[0].success).toBeTruthy();
                expect(response[0].ip).toEqual(ipaddr);
                expect(response[0].city).toBeDefined();
            },
            (err) => expect(false).toBeTruthy(`We got an error looking up an IP: ${err}`),
        );
        const ipRequest = httpMock.expectOne(`https://ipapi.co/${ipaddr}/json/`);
        ipRequest.flush({
            ip: ipaddr,
            city: 'New Test City',
            country: 'United Earth'
        });
        httpMock.verify();
    }));

    it('should hate bad IP addresses', inject([IPGeoService, GenericApi], (service: IPGeoService, api: GenericApi) => {
        const ipaddr = '205.175.221'; // kind of short...
        service.lookup(ipaddr).subscribe(
            (response) => {
                expect(response).toBeDefined();
                expect(response.success).not.toBeTruthy();
                expect(response.ip).toEqual(ipaddr);
                expect(response.message).toBeDefined();
            },
            (err) => expect(false).toBeTruthy(`We got an error looking up an IP: ${err}`),
        );
    }));

});
