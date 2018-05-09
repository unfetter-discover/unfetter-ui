import { AssessKillChainType } from './assess-kill-chain-type';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description kill chain data for risk analysis
 */
export class RiskByKillChain {
    public courseOfActions = [] as AssessKillChainType[];
    public indicators = [] as AssessKillChainType[];
    public sensors = [] as AssessKillChainType[];
}
