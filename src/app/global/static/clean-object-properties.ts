// Traverses an object and removes empty properties, objects, or arrays
export function cleanObjectProperties(tempObj, obj) {
    for (let prop in obj) {
        if (Array.isArray(obj[prop])) {
            if (obj[prop].length > 0) {
                tempObj[prop] = [];
                obj[prop].forEach((item, i) => {
                    if (item instanceof Object && !(item instanceof Date)) {
                        tempObj[prop].push(cleanObjectProperties({}, item));
                    } else if (item) {
                        tempObj[prop].push(item);
                    }
                });

                if (tempObj[prop].length === 0) {
                    delete tempObj[prop];
                }
            }
        } else {
            switch ((typeof obj[prop])) {
                case 'object':
                    if (obj[prop] instanceof Date) {
                        tempObj[prop] = obj[prop];
                    } else if (obj[prop] && Object.keys(obj[prop]).length > 0) {
                        tempObj[prop] = {};
                        tempObj[prop] = cleanObjectProperties({}, obj[prop]);
                    } else if (obj[prop] && Object.keys(obj[prop]).length === 0) {
                        delete obj[prop];
                    }
                    break;
                default:
                    if (obj[prop]) {
                        tempObj[prop] = obj[prop];
                    }
                    break;
            }
        }
    }
    return tempObj;
}
