/**
 * Report Dashboard Mitigation Mixin to for computed related properties
 * Builds out the referenced objects.
 */
export class Measurements {

    protected changeMeasurement(measurement, selected_value) {
        measurement.selected_value = selected_value;
        measurement.risk = parseFloat(selected_value.risk);
        return measurement;
    }
    /**
     * Build Measurements
     *
     * @param {String} A string representing the data type.  Because it can only be 'indicator' or 'course-of-action'
     * only need to look at the first five characters in the string
     *
     * @return {Object} will build the measurements based on the type
     */

    protected buildMeasurements(dataType) {

        let measurements = [];
        if (dataType.substr( 0, 6 ) === 'course') {
            // If the data type starts with course of action
            const policyOptions = ['No Policy',
                                    'Informal Policy',
                                    'Partial Written Policy',
                                    'Written Policy',
                                    'Approved Written Policy'];
            const implementationOptions = ['Not Implemented',
                                            'Parts of Policy Implemented',
                                            'Implemented on Some Systems',
                                            'Implemented on Most Systems',
                                            'Implemented on All Systems' ];

            let automationOptions = ['Not Automated',
                                    'Parts of Policy Automated',
                                    'Automated on Some Systems',
                                    'Automated on Most Systems',
                                    'Automated on All Systems'];

            let reportingOptions = ['Not Reported',
                                    'Parts of Policy Reported',
                                    'Reported on Some Systems',
                                    'Reported on Most Systems',
                                    'Reported on All Systems'];

            measurements.push(this.createMeasurement('policy', 0, policyOptions));
            measurements.push(this.createMeasurement('implementation', 0, implementationOptions));
            measurements.push(this.createMeasurement('automation', 0, automationOptions));
            measurements.push(this.createMeasurement('reporting', 0, reportingOptions));

        } else if (dataType.substr(0 , 6) === 'indica') {
            // Then, assuming its an indicator
            let indicatorOption = ['Nothing',
                            'Local Logging',
                            'Central Logging, No Alerting',
                            'Alerting, but false positives/negatives',
                            'Real Time Alerting, No False Positives/Negatives'];

            measurements.push(this.createMeasurement('policy', 0, indicatorOption));

        } else {
            // Then, assuming its an indicator
            let indicatorOption = ['no coverage',
                            'some coverage',
                            'half coverage',
                            'most critical systems covered',
                            'all critical systems covered'];

            measurements.push(this.createMeasurement('coverage', 0, indicatorOption));
        }
        return measurements;
    }

    protected displayRisk(risk) {
        return Number( (risk) * 100 ).toFixed(2);
    }

    protected calculateRisk(assessments): number {
        let risk = 0;
        assessments.forEach(
            (assessment) => {
                if (assessment.risk && (typeof assessment.risk === 'number')) {
                    risk = risk + assessment.risk;
                }
        });
        return risk / assessments.length;
    }

    protected getRisk(measureObject) {
        let risk = 0;
        let count = 0;
        measureObject.forEach(
            (measurement) => {
            let selected_value = measurement.selected_value;
            risk = risk + parseFloat(selected_value.risk);
            count = count + 1;
        });
        return risk / measureObject.length;
    }

    protected getRiskByName(assessments) {
        if (Array.isArray(assessments)) {
            let riskMap = [];
            assessments.forEach(
                (assessment) => {
                    let measurements = assessment.measurements;
                    measurements.forEach(
                        (measurement) => {
                                let name = measurement.name;
                                let risk = measurement.risk;
                                let riskObject = riskMap.find((n) => { return n === name; });
                                if (riskObject) {
                                    riskObject.risk = riskObject.risk + risk;
                                    riskObject.count = riskObject.count + 1;
                                } else {
                                    riskObject = {};
                                    riskObject.name = name;
                                    riskObject.risk = risk;
                                    riskObject.count = 1;
                                    riskMap.push(riskObject);
                                }
                        });
                });
            riskMap.forEach(
                (risk) => {
                    risk.risk = risk.risk / risk.count;
            });
            return riskMap;

        } else {
            return false;
        }
    }

    protected createMeasurement(name, selectedOption, options) {
        let measurement: any = {};
        measurement.name = name;
        measurement.options = [];
        options.forEach(
            (label, index) => {
            let data: any = {};
            data.name = label;
            data.risk = 1 - ( index / ( options.length - 1 ));
            measurement.options.push(data);
        });

        measurement.selected_value = measurement.options[selectedOption];
        measurement.risk = measurement.selected_value.risk;
        /***measurement.selected_option = selectedOption;**/
        return measurement;
    }
}
