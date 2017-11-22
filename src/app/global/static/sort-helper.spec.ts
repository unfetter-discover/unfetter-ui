import { SortHelper } from './sort-helper';

describe('Sort Helper Spec', () => {

  const strArr = ['c', 'b', '1', 'a'];
  const numberArr = [100, 200, 1, 40];
  const objectArr = [
    { key1: 'a', key2: 111 },
    { key1: 'b', key2: 222 },
    { key1: '1', key2: 333 },
  ]

  beforeEach(() => {
    expect(strArr).toBeDefined();
    expect(strArr.length).toBeGreaterThan(2);
    expect(numberArr).toBeDefined();
    expect(numberArr.length).toBeGreaterThan(2);
    expect(objectArr).toBeDefined();
    expect(objectArr.length).toBeGreaterThan(2);
  });

  it('sort helper should sort string[] descending', () => {
    const sortDescFunc = SortHelper.sortDesc();
    const sortedArr = strArr.sort(sortDescFunc);
    expect(sortedArr).toBeDefined();
    expect(sortedArr.length).toEqual(strArr.length);
    expect(ensureAllGtEqPrev(sortedArr)).toBeTruthy();
  });

  it('sort helper should sort string[] ascending', () => {
    const sortAscendingFunc = SortHelper.sortAsc();
    const sortedArr = strArr.sort(sortAscendingFunc);
    expect(sortedArr).toBeDefined();
    expect(sortedArr.length).toEqual(strArr.length);
    expect(ensureAllGtEqPrev(sortedArr)).toBeFalsy();
  });

  it('sort helper should sort number[] descending', () => {
    const sortDescFunc = SortHelper.sortDesc();
    const sortedArr = numberArr.sort(sortDescFunc);
    expect(sortedArr).toBeDefined();
    expect(sortedArr.length).toEqual(numberArr.length);
    expect(ensureAllGtEqPrev(sortedArr)).toBeTruthy();
  });

  it('sort helper should sort number[] ascending', () => {
    const sortAscendingFunc = SortHelper.sortAsc();
    const sortedArr = numberArr.sort(sortAscendingFunc);
    expect(sortedArr).toBeDefined();
    expect(sortedArr.length).toEqual(numberArr.length);
    expect(ensureAllGtEqPrev(sortedArr)).toBeFalsy()
  });

  it('sort helper should sort object[] descending by field, requires a field name', () => {
    try {
      const sortDescFunc = SortHelper.sortDescByField(undefined);
      throw new Error('sort desc by field should throw an error on undefined');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('sort helper should sort object[] descending by field', () => {
    const field = 'key1';
    const sortDescFunc = SortHelper.sortDescByField(field);
    const sortedArr = objectArr.sort(sortDescFunc);
    expect(sortedArr).toBeDefined();
    expect(sortedArr.length).toEqual(objectArr.length);

    let prev = sortedArr[0];
    const sorted = sortedArr.every((el) => {
      const gtOrEq = el[field] >= prev[field];
      prev = el;
      return gtOrEq ? true : false;
    });
    expect(sorted).toBeTruthy();
  });

  it('sort helper should sort object[] ascending by field', () => {
    const field = 'key1';
    const sortAscendingFunc = SortHelper.sortAscByField(field);
    const sortedArr = objectArr.sort(sortAscendingFunc);
    expect(sortedArr).toBeDefined();
    expect(sortedArr.length).toEqual(objectArr.length);

    let prev = sortedArr[0];
    const sorted = sortedArr.every((el) => {
      const gtOrEq = el[field] >= prev[field];
      prev = el;
      return gtOrEq ? true : false;
    });
    expect(sorted).toBeFalsy();
  });

  /**
   * @description ensure all the elements are >= then previous
   * @param arr
   * @return {boolean} true if all elements >= otherwise false
   */
  const ensureAllGtEqPrev = (arr: any[]) => {
    if (!arr) {
      return true;
    }

    let prev = arr[0];
    return arr.every((el) => {
      const gtOrEq = el >= prev;
      prev = el;
      return gtOrEq ? true : false;
    });
  }
});
