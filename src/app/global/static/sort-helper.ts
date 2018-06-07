/**
 * @description generic sort function generators
 */
export class SortHelper {

    public static sortDescByField<T, F extends keyof T>(field: F, caseInsensitive = false): (a: T, b: T) => number {
        if (!field) {
            throw new Error('please provide a sort field');
        }
        
        const sorter = (a: T, b: T) => {
            const val1 = a[field];
            const val2 = b[field];
            if (caseInsensitive && typeof val1 === 'string' && typeof val2 === 'string') {
                if (val1.toUpperCase() > val2.toUpperCase()) {
                    return 1;
                } else if (val1.toUpperCase() < val2.toUpperCase()) {
                    return -1;
                }
            } else {
                if (val1 > val2) {
                    return 1;
                } else if (val1 < val2) {
                    return -1;
                }
            }
            return 0;
        };

        return sorter;
    }

    public static sortAscByField<T, F extends keyof T>(field: F): (a: T, b: T) => number {
        if (!field) {
            throw new Error('please provide a sort field');
        }
        
        const sorter = (a: T, b: T) => {
            const val1 = a[field];
            const val2 = b[field];
            if (val1 > val2) {
                return -1;
            } else if (val1 < val2) {
                return 1;
            }
            return 0;
        };

        return sorter;
    }

    public static sortDesc(): (a: any, b: any) => number {
        const sorter = (a: any, b: any) => {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            }
            return 0;
        };

        return sorter;
    }

    public static sortAsc(): (a: any, b: any) => number {
        const sorter = (a: any, b: any) => {
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1;
            }
            return 0;
        };

        return sorter;
    }

}
