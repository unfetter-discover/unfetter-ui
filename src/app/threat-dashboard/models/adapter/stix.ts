export class Stix {
    public id: string;
    // tslint:disable-next-line:variable-name
    // public _id: string;
    public name: string;
    public description: string;
    public labels: any[];
    public published: Date;
    public object_refs: string[];
    public type = '';
    public kill_chain_phases: any[];
    public title: string;
    public external_references: any[];
    public created: string;
    public modified: string;
    public created_by_ref: string;
    public granular_markings: any[];
    public x_unfetter_object_actions: string[];

    public stix?: any;

    public toJson(): string {
        return JSON.stringify(this, undefined, '\t');
    }

}
