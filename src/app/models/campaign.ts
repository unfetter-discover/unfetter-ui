import { ExternalReference, KillChainPhase } from '.';
export class Campaign {
    public url = 'cti-stix-store-api/campaigns';
    public id: string;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        labels: string[];
        first_seen: Date;
        objective: string;
        timestamp_precision: string;
        
    };
    constructor() {
        this.type = 'campaigns';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            name: '',
            description: '',
            labels: [],
            first_seen: new Date(),
            objective: '',
            timestamp_precision: ''
            
        };
    }
}
