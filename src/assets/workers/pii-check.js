// Use basic JavaScript only as this is not transpiled

function validationErrors(inputString) {
  var REGEX_VALIDATORS = [
    {
      regex: /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g,
      name: 'IP Address'
    },
    {
      regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
      name: 'Email'
    }
  ];

  var errors = [];
  for (var regexValidator of REGEX_VALIDATORS) {
    var matches = inputString.match(regexValidator.regex);
    if (matches !== null) {
      errors.push({
        name: regexValidator.name,
        matches: matches
      });
    }
  }
  postMessage(errors);
};

onmessage = function (event) {
  if (event.data.action && event.data.action === 'CLOSE') {
    console.log('PII Check worker closing');
    close();
  } else if (event.data.payload !== undefined) {
    validationErrors(event.data.payload);
  } else {
    console.log('Invalid message sent to PII Check worker');
  }
};
