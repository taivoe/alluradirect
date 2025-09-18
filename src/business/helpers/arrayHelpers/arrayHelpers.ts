// Adapted from: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
export function arrayMove<T>(arr: T[], oldIndex: number, newIndex: number): T[] {
  const copy = [...arr];
  // Remove the element at the old index
  const cutElem = copy.splice(oldIndex, 1)[0];
  // Insert the element back into the array at the new index
  copy.splice(newIndex, 0, cutElem);
  return copy;
}

export function createEmptyArray(length: number): any[] {
  return [...Array(length)];
}

/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 *
 * Flattens the array with a depth of 1. Use this instead of .flat for browser compatability
 * https://caniuse.com/array-flat
 * */
export function flattenArray<T = any>(arr: T[]) {
  return arr.reduce((acc: any[], val: any) => acc.concat(val), []);
}
