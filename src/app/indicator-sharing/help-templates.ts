export const patternHelp = `
#### Pseudocode (Required)

Pseudocode describes the analytic. Any format of pseudocode is acceptable, however Unfetter will check pseudocode as
valid [STIX 2 Patterning Language](http://docs.oasis-open.org/cti/stix/v2.0/stix-v2.0-part5-stix-patterning.html).
Valid STIX 2 patterns will yield additional benefits in Unfetter.

#### Generated Pattern Translations

If a valid STIX 2 pattern is entered, Unfetter will attempt to translate the STIX 2 pattern into ElasticSearch query
strings and Splunk queries. It is optional to include these translations in your submission. Not all valid STIX 2
patterns will have translations automatically generated. The queries follow the
[MITRE Cyber Analytics Repository Data Model](https://car.mitre.org/wiki/Data_Model) and the
[Splunk Common Information Model](http://docs.splunk.com/Documentation/CIM/4.9.1/User/Overview).

#### Additional Queries

Additional queries allows you to add queries in a language and format of your choosing.
`;

export const observableDataHelp = `
#### Observed Data

Observed data follows the **Object, Action, Field** structure of the [CAR Data Model](https://car.mitre.org/wiki/Data_Model).  
It is applied to both analytics and sensors to help determine which sensors are capable of running an analytic.

#### Data Sources

The data sources required to run the analytic.
`;
