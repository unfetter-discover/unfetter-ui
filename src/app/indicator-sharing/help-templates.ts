export const patternHelp = `
    <h4>Pattern (Required)</h4>
    <p>Pattern accepts a 
        <a href="http://docs.oasis-open.org/cti/stix/v2.0/stix-v2.0-part5-stix-patterning.html" target=_blank>STIX 2.0 pattern</a>
        as an input.  Pattern input will be validated as STIX 2.0 patterns, but invalid patterns may still be submitted to Unfetter.
    </p>
    <h4>Generated Pattern Translations</h4>
    <p>As you type a pattern, Unfetter will attempt to translate the STIX 2.0 pattern into ElasticSearch query strings and Splunk queries.
        It is optional to include these translations in your submission.  Not all valid STIX 2.0 patterns will have translations automatically generated.  The queries follow the <a href="https://car.mitre.org/wiki/Data_Model" target=_blank>CAR Data Model</a> 
        and the <a href="http://docs.splunk.com/Documentation/CIM/4.9.1/User/Overview" target=_blank>Splunk Common Information Model</a>.
    </p>
    <h4>Additional Queries</h4>
    <p class="mb-0">Additional queries allows you to add queries in a language and format of your choosing.</p>
`;

export const observableDataHelp = `
    <h4>Observed Data</h4>
    <p>Observed data follows the <strong>Object, Action, Field</strong> structure of the <a href="https://car.mitre.org/wiki/Data_Model" target=_blank>CAR Data Model</a>.  
    It is applied to both analytics and sensors to help determine which sensors are capable of running an analytic.</p>
`;
