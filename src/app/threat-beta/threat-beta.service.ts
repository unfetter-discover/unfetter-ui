import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Article, ThreatBoard } from 'stix/unfetter/index';

import { GenericApi } from '../core/services/genericapi.service';
import { StixUrls } from '../global/enums/stix-urls.enum';
import { RxjsHelpers } from '../global/static/rxjs-helpers';

@Injectable()
export class ThreatDashboardBetaService {
    constructor(private genericApi: GenericApi) { }

    public addArticle(article: Article): Observable<Article> {
        return this.genericApi.post(StixUrls.X_UNFETTER_ARTICLE, { data: { attributes: article } })
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                map((articles) => articles[0])
            );
    }

    public editArticle(article: Article): Observable<Article> {
        return this.genericApi.patch(`${StixUrls.X_UNFETTER_ARTICLE}/${article.id}`, { data: { attributes: article } })
            .pipe(pluck('attributes'));
    }

    public updateBoard(board: ThreatBoard): Observable<ThreatBoard> {
        return this.genericApi.patch(
            `${StixUrls.X_UNFETTER_THREAT_BOARD}/${board.id}`, 
            { data: { attributes: board } }
        )
        .pipe(pluck('attributes'));
    }

    public createBoard(board: ThreatBoard): Observable<ThreatBoard> {
        return this.genericApi.post(`${StixUrls.X_UNFETTER_THREAT_BOARD}`, { data: { attributes: board } });
    }
}
