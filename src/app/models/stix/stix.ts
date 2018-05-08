import { StixLabelEnum } from './stix-label.enum';
import { MetaProps } from './meta-props';
import { ExternalReference } from './external_reference';
import { GranularMarking } from './granular-marking';
import { KillChainEnum } from './kill-chain.enum';
import { KillChainPhase } from './kill-chain-phase';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description 
 * @see https://stixproject.github.io/
 * @see https://oasis-open.github.io/cti-documentation/
 */
export class Stix {
    public version = '0';
    public external_references: ExternalReference[];
    public granular_markings: GranularMarking[];
    public name: string;
    public description: string;
    public pattern: string;
    public kill_chain_phases: KillChainPhase[];
    public object_refs?: string[];
    public id?: string;
    public created_by_ref: string;
    public type: StixLabelEnum;
    public valid_from = new Date().toISOString();
    public labels: string[];
    public modified: string;
    public created = new Date().toISOString();
    public metaProperties: MetaProps;
}
