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

        const measurements = [];
        if (dataType.substr(0, 6) === 'course') {
            // If the data type starts with course of action
            const policyOptions = ['No Policy',
                'Informal Policy',
                'Partial Written Policy',
                'Written Policy',
                'Approved Written Policy'
            ];
            const implementationOptions = ['Not Implemented',
                'Parts of Policy Implemented',
                'Implemented on Some Systems',
                'Implemented on Most Systems',
                'Implemented on All Systems'
            ];

            const automationOptions = ['Not Automated',
                'Parts of Policy Automated',
                'Automated on Some Systems',
                'Automated on Most Systems',
                'Automated on All Systems'
            ];

            const reportingOptions = ['Not Reported',
                'Parts of Policy Reported',
                'Reported on Some Systems',
                'Reported on Most Systems',
                'Reported on All Systems'
            ];

            measurements.push(this.createMeasurement('policy', 0, policyOptions));
            measurements.push(this.createMeasurement('implementation', 0, implementationOptions));
            measurements.push(this.createMeasurement('automation', 0, automationOptions));
            measurements.push(this.createMeasurement('reporting', 0, reportingOptions));

        } else if (dataType.substr(0, 6) === 'indica') {
            // Then, assuming its an indicator
            const indicatorOption = ['Nothing',
                'Local Logging',
                'Central Logging, No Alerting',
                'Alerting, but false positives/negatives',
                'Real Time Alerting, No False Positives/Negatives'
            ];

            measurements.push(this.createMeasurement('policy', 0, indicatorOption));

        } else {
            // Then, assuming its an indicator
            const indicatorOption = ['no coverage',
                'some coverage',
                'half coverage',
                'most critical systems covered',
                'all critical systems covered'
            ];

            measurements.push(this.createMeasurement('coverage', 0, indicatorOption));
        }
        return measurements;
    }

    protected displayRisk(risk) {
        return Number((risk) * 100).toFixed(2);
    }

    protected calculateRisk(assessments): number {
        let risk = 0;
        assessments.forEach(
            (assessment) => {
                if (assessment.risk && (typeof assessment.risk === 'number')) {
                    const r = assessment.risk === -1 ? 1 : assessment.risk
                    risk += r;
                }
            });
        return risk / assessments.length;
    }

    protected getRisk(measureObject) {
        let risk = 0;
        let count = 0;
        measureObject.forEach(
            (measurement) => {
                const selected_value = measurement.selected_value;
                risk = risk + parseFloat(selected_value.risk);
                count = count + 1;
            });
        return risk / measureObject.length;
    }

    protected getRiskByName(assessments) {
        if (Array.isArray(assessments)) {
            const riskMap = [];
            assessments.forEach(
                (assessment) => {
                    const measurements = assessment.measurements;
                    measurements.forEach(
                        (measurement) => {
                            const name = measurement.name;
                            const risk = measurement.risk;
                            let riskObject = riskMap.find((n) => n === name);
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
        const measurement: any = {};
        measurement.name = name;
        measurement.options = [];
        options.forEach(
            (label, index) => {
                const data: any = {};
                data.name = label;
                data.risk = 1 - (index / (options.length - 1));
                measurement.options.push(data);
            });

        measurement.selected_value = measurement.options[selectedOption];
        measurement.risk = measurement.selected_value.risk;
        /***measurement.selected_option = selectedOption;**/
        return measurement;
    }

    protected calculateMeasurementsAvgRisk(measurements: any[]) {
        return measurements
            .map((assMes) => assMes.risk)
            .reduce((prev, cur) => prev += cur, 0) /
            measurements.length;
    }

    protected updateQuestionRisk(question, risk) {
        if (question.selected_value === undefined) {
            question.selected_value = {};
        }
        // question.selected_value.risk = risk;
        const matchingOption = question.options.find((q) => q.risk === risk);
        // question.selected_value.name = matchingOption.name;
        question.selected_value = matchingOption;
        question.risk = risk;
    }
}
