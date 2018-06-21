
export class AngularHelper {

    /**
     * @description angular track by list function, 
     *  uses the items id iff (if and only if) it exists, 
     *  otherwise uses the index
     * @param {number} index
     * @param { id: any } item
     * @return {number}
     */
    public static genericTrackBy(index: number, item: { id: any }): number {
        return (item && item.id) ? item.id : index;
    }
}
