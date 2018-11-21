import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Article, ThreatBoard } from 'stix/unfetter/index';

import { GenericApi } from '../core/services/genericapi.service';
import { StixUrls } from '../global/enums/stix-urls.enum';
import { RxjsHelpers } from '../global/static/rxjs-helpers';
import { Report } from 'stix';

@Injectable()
export class ThreatDashboardBetaService {
    constructor(private genericApi: GenericApi) { }

    public createArticle(article: Article): Observable<Article> {
        return this.genericApi.post(StixUrls.X_UNFETTER_ARTICLE, { data: { attributes: article } })
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                map((articles) => articles[0])
            );
    }

    public updateArticle(article: Article): Observable<Article> {
        return this.genericApi.patch(`${StixUrls.X_UNFETTER_ARTICLE}/${article.id}`, { data: { attributes: article } })
            .pipe(pluck('attributes'));
    }    

    public createBoard(board: ThreatBoard): Observable<ThreatBoard> {
        return this.genericApi.post(`${StixUrls.X_UNFETTER_THREAT_BOARD}`, { data: { attributes: board } })
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                map((boards) => boards[0])
            );
    }

    public updateBoard(board: ThreatBoard): Observable<ThreatBoard> {
        return this.genericApi.patch(
            `${StixUrls.X_UNFETTER_THREAT_BOARD}/${board.id}`, 
            { data: { attributes: board } }
        )
        .pipe(pluck('attributes'));
    }

    public createReport(report: Report): Observable<Report> {
        return this.genericApi.post(StixUrls.REPORT, { data: { attributes: report } })
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                map((reports) => reports[0])
            );
    }

    public updateReport(report: Report): Observable<Report> {
        return this.genericApi.patch(`${StixUrls.REPORT}/${report.id}`, { data: { attributes: report } })
            .pipe(pluck('attributes'));
    }
}
