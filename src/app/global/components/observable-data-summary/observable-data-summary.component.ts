import { Component, Input } from '@angular/core';

@Component({
    selector: 'observable-data-summary',
    templateUrl: 'observable-data-summary.component.html',
    styleUrls: ['observable-data-summary.component.scss']
})
export class ObservableDataSummaryComponent {

    @Input() public observedData: any[];

    constructor() { }

    public mapObservedData(observedDataParam: any[]) {
        const retVal = [];
        for (let observedDatum of observedDataParam) {
            let nameFound = retVal.find((item) => item.name === observedDatum.name);
            if (!nameFound) {
                let temp = {
                    name: observedDatum.name,
                    actions: [
                        {
                            actionName: observedDatum.action,
                            properties: [observedDatum.property]
                        }
                    ]
                };
                retVal.push(temp);
            } else {
                let actionFound = nameFound.actions.find((item) => item.actionName === observedDatum.action);
                if (!actionFound) {
                    nameFound.actions.push({
                        actionName: observedDatum.action,
                        properties: [observedDatum.property]
                    });
                } else {
                    actionFound.properties.push(observedDatum.property)
                }
            }
        }
        return retVal;
    }
}
