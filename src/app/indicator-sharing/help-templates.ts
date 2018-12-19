export const patternHelp = `
#### Pseudocode (Required)

Pseudocode describes the analytic. The following types of pseudocode are accepted:

1. Text - Markdown support included

2. [STIX 2 Patterning Language](http://docs.oasis-open.org/cti/stix/v2.0/stix-v2.0-part5-stix-patterning.html) -
If STIX Patterns are selected, as you type the pattern will be validated, translated into SIEM queries, and the required data objects will be extracted from the pattern.  Not all valid patterns have a translation. Example STIX 2 Pattern: \`[process:pid=3]\`

3. [Sigma](https://github.com/Neo23x0/sigma) - If Sigma is selected, as you type the pattern will be validated and translated into SIEM queries.  Not all valid Sigma signatures have a translation.  Examples can be found [here](https://github.com/Neo23x0/sigma/tree/master/rules).

#### Pseudocode: Automatic Pattern Translations

If a valid STIX 2 pattern or Sigma is entered, Unfetter will attempt to translate it into ElasticSearch query
strings and Splunk queries (and QRadar for Sigma only.) It is optional to include these translations in your submission. Not all valid samples will have translations automatically generated. 

The STIX 2 pattern translated queries follow the
[MITRE Cyber Analytics Repository Data Model](https://car.mitre.org/wiki/Data_Model) and the
[Splunk Common Information Model](http://docs.splunk.com/Documentation/CIM/4.9.1/User/Overview).

#### Implementations

A list of implementations of the pseudocode for given tools/sensors.
`;

export const observableDataHelp = `
#### Observed Data

Observed data follows the **Object, Action, Field** structure of the [CAR Data Model](https://car.mitre.org/wiki/Data_Model).  
It is applied to both analytics and sensors to help determine which sensors are capable of running an analytic.

#### Data Sources

The data sources required to run the analytic.
`;
