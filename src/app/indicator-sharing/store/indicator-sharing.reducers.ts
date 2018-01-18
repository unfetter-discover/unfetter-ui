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
    identities: any[],
    searchParameters: {},
    indicatorToSensorMap: {},
    indicatorToApMap: {},
    serverCallComplete: boolean,
    sortBy: string
}

export const initialSearchParameters: SearchParameters = {
    indicatorName: '',
    killChainPhases: [],
    labels: [],
    organizations: [],
    sensors: []
};

const initialState: IndicatorSharingState = {
    indicators: [],
    filteredIndicators: [],
    displayedIndicators: [],
    sensors: [],
    identities: [],
    searchParameters: { ...initialSearchParameters },
    indicatorToSensorMap: {},
    indicatorToApMap: {},
    serverCallComplete: false,
    sortBy: SortTypes.NEWEST
};

const DEFAULT_DISPLAYED_LENGTH: number = 10;

export function indicatorSharingReducer(state = initialState, action: indicatorSharingActions.IndicatorSharingActions): IndicatorSharingState {

    switch (action.type) {
        case indicatorSharingActions.SET_INDICATORS:
            return sortIndicators({
                ...state,
                indicators: action.payload,
                filteredIndicators: action.payload,
                displayedIndicators: initDisplauyedIndicators(action.payload)
            }, state.sortBy);
        case indicatorSharingActions.FETCH_DATA:
            return {
                ...state,
                serverCallComplete: false
            };
        case indicatorSharingActions.FILTER_INDICATORS:
            return sortIndicators(filterIndicators(state, state.searchParameters), state.sortBy);
        case indicatorSharingActions.SORT_INDICATORS:
            return sortIndicators(state, action.payload);
        case indicatorSharingActions.ADD_INDICATOR:
            // TODO update indicatorToSensorMap
            // TODO update filtered & displayed indicatoes
            return {
                ...state,
                indicators: [
                    ...state.indicators,
                    action.payload
                ]
            };
        case indicatorSharingActions.UPDATE_INDICATOR:            
            // const indicatorToUpdate = state.indicators[action.payload.index];
            // const updatedIndicator = {
            //     ...indicatorToUpdate,
            //     ...action.payload.indicator
            // };
            // const iIndicators = [...state.indicators];
            // iIndicators[action.payload.index] = updatedIndicator;
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
            return {
                ...state,
                indicators: indicatorsCopy
            };
        case indicatorSharingActions.SET_SENSORS:
            const indicatorToSensorMap = buildIndicatorToSensorMap(state.indicators, action.payload);
            return {
                ...state,
                sensors: action.payload,
                indicatorToSensorMap
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

function filterIndicators(state, searchParameters) {
    const allIndicators = [...state.indicators];
    let filteredIndicators;
    if (searchParameters.labels.length) {
        filteredIndicators = allIndicators
            .filter((indicator) => {
                if (indicator.labels !== undefined && indicator.labels.length) {
                    let labelPresent = false;
                    indicator.labels
                        .forEach((label) => {
                            if (searchParameters.labels.includes(label)) {
                                labelPresent = true;
                            }
                        });
                    return labelPresent
                } else {
                    return false;
                }
            });
    } else {
        filteredIndicators = [...state.indicators];
    }

    if (searchParameters.organizations.length) {
        filteredIndicators = filteredIndicators
            .filter((indicator) => indicator.created_by_ref !== undefined && searchParameters.organizations.includes(indicator.created_by_ref));
    }

    if (searchParameters.killChainPhases.length) {
        filteredIndicators = filteredIndicators
            .filter((indicator) => !!indicator.kill_chain_phases)
            .filter((indicator) => {
                let found = false;
                indicator.kill_chain_phases.map((e) => e.phase_name).forEach((phase) => {
                    if (searchParameters.killChainPhases.includes(phase)) {
                        found = true;
                    }
                });
                return found;
            });
    }

    if (searchParameters.indicatorName !== '') {
        filteredIndicators = filteredIndicators
            .filter((indicator) => !!indicator.name)
            .filter((indicator) => indicator.name.toLowerCase().indexOf(searchParameters.indicatorName.toLowerCase()) > -1);
    }

    if (searchParameters.sensors.length) {
        filteredIndicators = filteredIndicators
            .filter((indicator) => indicator.metaProperties && indicator.metaProperties.observedData && Object.keys(state.indicatorToSensorMap).includes(indicator.id))
            .filter((indicator) => state.indicatorToSensorMap[indicator.id]
                .map((sensor) => sensor.id)
                .filter((sensorId) => searchParameters.sensors.includes(sensorId)).length > 0
            );
    }

    return {
        ...state,
        filteredIndicators
    };
}

function sortByArrayLengthHelper(a, b, field): number {
    if (a.metaProperties && a.metaProperties[field] && (!b.metaProperties[field] || !b.metaProperties)) {
        return -1;
    } else if ((!a.metaProperties || !a.metaProperties[field]) && b.metaProperties && b.metaProperties[field]) {
        return 1;
    } else if (a.metaProperties && a.metaProperties[field] && b.metaProperties && b.metaProperties[field]) {
        return b.metaProperties[field].length - a.metaProperties[field].length;
    } else {
        return 0;
    }
}

function sortIndicators(state, sortBy) {
    let filteredIndicators = [ ...state.filteredIndicators ];
    switch (sortBy) {
        case SortTypes.NEWEST:
            filteredIndicators = filteredIndicators.sort((a, b) => {
                return (new Date(b.created) as any) - (new Date(a.created) as any);
            });
            break;
        case SortTypes.OLDEST:
            filteredIndicators = filteredIndicators.sort((a, b) => {
                return (new Date(a.created) as any) - (new Date(b.created) as any);
            });
            break;
        case SortTypes.LIKES:
            filteredIndicators = filteredIndicators.sort((a, b) => sortByArrayLengthHelper(a, b, 'likes'));
            break;
        case SortTypes.COMMENTS:
            filteredIndicators = filteredIndicators.sort((a, b) => sortByArrayLengthHelper(a, b, 'comments'));
            break;
    }
    return {
        ...state,
        filteredIndicators,
        sortBy,
        displayedIndicators: initDisplauyedIndicators(filteredIndicators)
    };
}

function buildIndicatorToSensorMap(indicators, sensors): object {
    const indicatorToSensorMap = {};
    const indicatorsWithObservedData = indicators.filter((indicator) => indicator.metaProperties && indicator.metaProperties.observedData);

    indicatorsWithObservedData.forEach((indicator) => {
        const matchingSensorsSet = new Set();

        indicator.metaProperties.observedData.forEach((obsData) => {

            const sensorsFilter = sensors
                .filter((sensor) => {
                    let retVal = false;
                    sensor.metaProperties.observedData.forEach((sensorObsData) => {
                        if (sensorObsData.name === obsData.name && sensorObsData.action === obsData.action && sensorObsData.property === obsData.property) {
                            retVal = true;
                        }
                    });
                    return retVal;
                })
                .forEach((sensor) => matchingSensorsSet.add(sensor));
        });

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
