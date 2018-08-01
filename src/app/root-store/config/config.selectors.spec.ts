import { getConfigState, getPreferredKillchainPhases, DEFAULT_KILL_CHAIN } from './config.selectors';
import { mockConfig } from '../../testing/mock-store';
import { ConfigState, initialState } from './config.reducers';
import { AppState } from '../../app.service';

describe('config selectors', () => {
    let mockConfigStore: ConfigState;    

    beforeEach(() => {
        mockConfigStore = {
            configurations: mockConfig,
            runConfig: {}
        };
    });

    describe('getConfigState', () => {
        it('should return config State', () => {
            const appInitialState: AppState | any = {
                config: initialState
            };
            expect(getConfigState(appInitialState)).toEqual(initialState);
        });
    })

    describe('getPreferredKillchainPhases', () => {      
        it('should correct phases given a valid KC name', () => {
            const mockPreferredKillChain: string = mockConfig.killChains[0].name;
            const result = getPreferredKillchainPhases.projector(mockConfigStore, mockPreferredKillChain);
            expect(result).toEqual(mockConfig.killChains[0].phase_names);
            
            const mockPreferredKillChain2: string = mockConfig.killChains[1].name;
            const result2 = getPreferredKillchainPhases.projector(mockConfigStore, mockPreferredKillChain2);
            expect(result2).toEqual(mockConfig.killChains[1].phase_names);
        });
        
        it('should return [] with an invalid KC name', () => {
            const result = getPreferredKillchainPhases.projector(mockConfigStore, 'thisIsSoFake');
            expect(result).toEqual([]);
        });
        
        it('should return default phases with no preference', () => {
            const defaultPhases = mockConfig.killChains.find((kc) => kc.name === DEFAULT_KILL_CHAIN).phase_names;
            const result = getPreferredKillchainPhases.projector(mockConfigStore, null);
            expect(result).toEqual(defaultPhases);
        });
    });
});
