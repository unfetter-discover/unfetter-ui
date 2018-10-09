import { of as observableOf } from 'rxjs';
import * as UUID from 'uuid';

const MockThreatDashboardBetaService = {
    addArticle(article) {
        article.id = `x-unfetter-article--${UUID.v4()}`;
        return observableOf(article);
    },
    updateBoard: (board) => observableOf(board)
};

export default MockThreatDashboardBetaService;
