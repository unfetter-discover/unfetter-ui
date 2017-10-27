import { KillChainEntry } from '../kill-chain-table/kill-chain-entry';
import { IntrusionSet } from '../../models/intrusion-set';
import { ThreatDashboardIntrusion } from './threat-dashboard-intrusion';

export interface ThreatDashboard {
    killChainPhases: Array<Partial<KillChainEntry>>;
    intrusionSets: ThreatDashboardIntrusion[];
    totalAttackPatterns: number;
    coursesOfAction: any[];
};  
