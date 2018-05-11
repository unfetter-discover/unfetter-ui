import { KillChainEnum } from './kill-chain.enum';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
 export class KillChainPhase {
     public kill_chain_name: KillChainEnum;
     public phase_name: string;
}
