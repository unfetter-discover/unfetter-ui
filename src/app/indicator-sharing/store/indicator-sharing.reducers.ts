import * as indicatorSharingActions from './indicator-sharing.actions';
import * as fromApp from '../../root-store/app.reducers'
import { SearchParameters } from '../models/search-parameters';
import { SortTypes } from '../models/sort-types.enum';

export interface IndicatorSharingFeatureState extends fromApp.AppState {
    indicatorSharing: IndicatorSharingState
};

export interface IndicatorSharingState {
    indicators: any[],
    filteredIndicators: any[],
    displayedIndicators: any[]
    sensors: any[],
    attackPatterns: any[],
    identities: any[],
    intrusionSetsByAttackpattern: {},
    searchParameters: SearchParameters,
    indicatorToSensorMap: {},
    indicatorToApMap: {},
    serverCallComplete: boolean,
    sortBy: SortTypes,
    totalIndicatorCount: number
}

export const initialSearchParameters: SearchParameters = {
    indicatorName: '',
    killChainPhases: [],
    labels: [],
    organizations: [],
    sensors: [],
    attackPatterns: [],
    published: [],
    dataSources: [],
    validStixPattern: false
};

export const initialState: IndicatorSharingState = {
    indicators: [],
    filteredIndicators: [],
    displayedIndicators: [],
    sensors: [],
    attackPatterns: [],
    identities: [],
    intrusionSetsByAttackpattern: {},
    searchParameters: { ...initialSearchParameters },
    indicatorToSensorMap: {},
    indicatorToApMap: {},
    serverCallComplete: false,
    sortBy: SortTypes.NEWEST,
    totalIndicatorCount: 0
};

const DEFAULT_DISPLAYED_LENGTH: number = 10;

export function indicatorSharingReducer(state = initialState, action: indicatorSharingActions.IndicatorSharingActions): IndicatorSharingState {

    switch (action.type) {
        case indicatorSharingActions.SET_INDICATORS:
            return {
                ...state,
                indicators: action.payload,
                filteredIndicators: action.payload,
                displayedIndicators: initDisplauyedIndicators(action.payload)
            };
        case indicatorSharingActions.SET_FILTERED_INDICATORS:
            return {
                ...state,
                filteredIndicators: action.payload,
                displayedIndicators: initDisplauyedIndicators(action.payload)
            };
        case indicatorSharingActions.SET_TOTAL_INDICATOR_COUNT:
            return {
                ...state,
                totalIndicatorCount: action.payload
            };
        case indicatorSharingActions.FETCH_DATA:
            return {
                ...state,
                serverCallComplete: false
            };
        case indicatorSharingActions.SET_SORTBY:
            return {
                ...state,
                sortBy: action.payload
            };
        case indicatorSharingActions.ADD_INDICATOR:
            // TODO update indicatorToSensorMap
            // TODO update filtered & displayed indicatoes
            return {
                ...state,
                indicators: [
                    ...state.indicators,
                    action.payload
                ],
                totalIndicatorCount: (state.totalIndicatorCount + 1)
            };
        case indicatorSharingActions.UPDATE_INDICATOR:
            const indicatorToUpdateIndex = state.indicators.findIndex((indicator) => indicator.id === action.payload.id);
            if (indicatorToUpdateIndex > -1) {
                const iIndicators = [...state.indicators];
                iIndicators[indicatorToUpdateIndex] = action.payload;
                const retVal = {
                    ...state,
                    indicators: iIndicators
                };

                // update in filteredIndicators
                const filteredIndicatorToUpdateIndex = state.filteredIndicators.findIndex((indicator) => indicator.id === action.payload.id);
                if (filteredIndicatorToUpdateIndex > -1) {
                    const fIndicators = [...state.filteredIndicators];
                    fIndicators[filteredIndicatorToUpdateIndex] = action.payload;
                    retVal.filteredIndicators = fIndicators;
                }

                // update in displayed indicators
                const displayedIndicatorToUpdateIndex = state.displayedIndicators.findIndex((indicator) => indicator.id === action.payload.id);
                if (displayedIndicatorToUpdateIndex > -1) {
                    const dIndicators = [...state.displayedIndicators];
                    dIndicators[displayedIndicatorToUpdateIndex] = action.payload;
                    retVal.displayedIndicators = dIndicators;
                }

                return retVal;
            } else {
                console.log('Did not find indicator to update;');
                return state;
            }            
        case indicatorSharingActions.DELETE_INDICATOR:
            // const indicatorsCopy = [...state.indicators];
            // indicatorsCopy.splice(action.payload, 1);
            const indicatorsCopy = [...state.indicators];
            const deleteIndex = indicatorsCopy.findIndex((indicator) => indicator.id === action.payload);
            if (deleteIndex > -1) {
                indicatorsCopy.splice(deleteIndex, 1);
            }

            const filteredIndicatorsCopy = [...state.indicators];
            const filteredDeleteIndex = filteredIndicatorsCopy.findIndex((indicator) => indicator.id === action.payload);
            if (filteredDeleteIndex > -1) {
                filteredIndicatorsCopy.splice(filteredDeleteIndex, 1);
            }

            const displayedIndicatorsCopy = [...state.indicators];
            const displayedDeleteIndex = displayedIndicatorsCopy.findIndex((indicator) => indicator.id === action.payload);
            if (displayedDeleteIndex > -1) {
                displayedIndicatorsCopy.splice(displayedDeleteIndex, 1);
            }

            return {
                ...state,
                indicators: indicatorsCopy,
                filteredIndicators: filteredIndicatorsCopy,
                displayedIndicators: displayedIndicatorsCopy,
                totalIndicatorCount: (state.totalIndicatorCount - 1)
            };
        case indicatorSharingActions.SET_SENSORS:
            const indicatorToSensorMap = buildIndicatorToSensorMap(state.indicators, action.payload);
            return {
                ...state,
                sensors: action.payload,
                indicatorToSensorMap
            };
        case indicatorSharingActions.SET_ATTACK_PATTERNS:
            return {
                ...state,
                attackPatterns: action.payload
            };
        case indicatorSharingActions.SET_IDENTITIES:
            return {
                ...state,
                identities: action.payload
            };
        case indicatorSharingActions.SET_INDICATOR_TO_AP_MAP:
            return {
                ...state,
                indicatorToApMap: action.payload
            };
        case indicatorSharingActions.SET_INTRUSION_SETS_BY_ATTACK_PATTERN:
            return {
                ...state,
                intrusionSetsByAttackpattern: action.payload
            };
        case indicatorSharingActions.SET_SEARCH_PARAMETERS:
            return {
                ...state,
                searchParameters: {
                    ...state.searchParameters,
                    ...action.payload
                }
            };
        case indicatorSharingActions.CLEAR_SEARCH_PARAMETERS:
            return {
                ...state,
                searchParameters: { ...initialSearchParameters },
                filteredIndicators: [ ...state.indicators ]
            };
        case indicatorSharingActions.CLEAR_DATA:
            return initialState;
        case indicatorSharingActions.SHOW_MORE_INDICATORS:
            const currentLength = state.displayedIndicators.length;
            const displayedIndicators = [
                ...state.displayedIndicators,
                ...state.filteredIndicators.slice(currentLength, currentLength + DEFAULT_DISPLAYED_LENGTH)
            ];
            return {
                ...state,
                displayedIndicators
            };
        case indicatorSharingActions.UPDATE_SOCIAL:        
            const indicatorIndex = state.indicators.findIndex((indicator) => indicator.id === action.payload.stixId);
            if (indicatorIndex > -1) {
                const iIndicators = [...state.indicators];

                let updatedIndicator = iIndicators[indicatorIndex];
                if (!updatedIndicator.metaProperties) {
                    updatedIndicator.metaProperties = {};
                }
                switch (action.payload.type) {
                    case 'COMMENT':
                        if (!updatedIndicator.metaProperties.comments) {
                            updatedIndicator.metaProperties.comments = [];
                        }
                        updatedIndicator.metaProperties.comments.unshift(action.payload.body);
                        break;
                }

                iIndicators[indicatorIndex] = updatedIndicator;
                const retVal = {
                    ...state,
                    indicators: iIndicators
                };

                // update in filteredIndicators
                const filteredIndicatorToUpdateIndex = state.filteredIndicators.findIndex((indicator) => indicator.id === updatedIndicator.id);
                if (filteredIndicatorToUpdateIndex > -1) {
                    const fIndicators = [...state.filteredIndicators];
                    fIndicators[filteredIndicatorToUpdateIndex] = updatedIndicator;
                    retVal.filteredIndicators = fIndicators;
                }

                // update in displayed indicators
                const displayedIndicatorToUpdateIndex = state.displayedIndicators.findIndex((indicator) => indicator.id === updatedIndicator.id);
                if (displayedIndicatorToUpdateIndex > -1) {
                    const dIndicators = [...state.displayedIndicators];
                    dIndicators[displayedIndicatorToUpdateIndex] = updatedIndicator;
                    retVal.displayedIndicators = dIndicators;
                }

                return retVal;
            } else {
                console.log('Did not find indicator to update;');
                return state;
            } 
        case indicatorSharingActions.SET_SERVER_CALL_COMPLETE:
            return {
                ...state,
                serverCallComplete: action.payload
            };
        default:
            return state;
    }
}

function buildIndicatorToSensorMap(indicators, sensors): object {
    const indicatorToSensorMap = {};
    const indicatorsWithObservedData = indicators.filter((indicator) => indicator.metaProperties && indicator.metaProperties.observedData && indicator.metaProperties.observedData.length);

    indicatorsWithObservedData.forEach((indicator) => {
        const matchingSensorsSet = new Set();

        sensors
            .filter((sensor) => {
                let retVal = true;
                indicator.metaProperties.observedData.forEach((obsData) => {
                    let sensorMatch = false;
                    sensor.metaProperties.observedData.forEach((sensorObsData) => {
                        if (sensorObsData.name === obsData.name && sensorObsData.action === obsData.action && sensorObsData.property === obsData.property) {
                            sensorMatch = true;
                        }
                    });
                    if (!sensorMatch) {
                        retVal = false;
                    }
                });                
                return retVal;
            })
            .forEach((sensor) => matchingSensorsSet.add(sensor));
    

        const matchingSensors = Array.from(matchingSensorsSet);

        if (matchingSensors.length) {
            indicatorToSensorMap[indicator.id] = matchingSensors;
        }
    });

    return indicatorToSensorMap;
}

function initDisplauyedIndicators(filteredIndicators: any[]) {
    return [...filteredIndicators.slice(0, DEFAULT_DISPLAYED_LENGTH)];
}
