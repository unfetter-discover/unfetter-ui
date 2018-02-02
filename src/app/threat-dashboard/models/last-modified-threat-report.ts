import { LastModifiedStix } from '../../global/models/last-modified-stix';

export class LastModifiedThreatReport extends LastModifiedStix {
    workproductId: string;
    reportIds: string[];
}
