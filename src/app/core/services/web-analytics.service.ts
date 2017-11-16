import { Injectable } from '@angular/core';

import { GenericApi } from './genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class WebAnalyticsService {

    private webAnalyticsUrl = Constance.WEB_ANALYTICS_URL;

    constructor(private genericApi: GenericApi) { }

    public recordVisit() {
        const recordVisit$ = this.genericApi.get(`${this.webAnalyticsUrl}/visit`)
            .subscribe(
                (res) => {
                    // Do nothing              
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    recordVisit$.unsubscribe();
                }
            );
    }
}
