import { ExternalReference, KillChainPhase } from '.';

export class Sighting {
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        external_references: ExternalReference[];
        first_seen: Date;
        firstseen_precision: string;
        last_seen: Date;
        lastseen_precision: string;
        count: 0;
        sighting_of_ref: string;
        observed_data_refs: [
          string
        ];
        where_sighted_refs: [
          string
        ];
        summary: string
    };
    constructor() {
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            external_references: [],
            first_seen: new Date(),
            firstseen_precision: '',
            last_seen: new Date(),
            lastseen_precision: '',
            count: 0,
            sighting_of_ref: '',
            observed_data_refs: [
            ''
            ],
            where_sighted_refs: [
            ''
            ],
            summary: ''
        };
    }
}
