import { arrayMove } from '../arrayHelpers';

describe('move items around item works', () => {
  it('moves from back to front', () => {
    const arr = [1, 2, 3];
    const oldIndex = arr.length - 1;
    const newIndex = 0;

    const result = arrayMove(arr, oldIndex, newIndex);

    expect(result).toEqual([3, 1, 2]);
  });

  it('moves from front to back', () => {
    const arr = [1, 2, 3];
    const oldIndex = 0;
    const newIndex = arr.length - 1;

    const result = arrayMove(arr, oldIndex, newIndex);

    expect(result).toEqual([2, 3, 1]);
  });

  it('moves into the middle', () => {
    const arr = [1, 2, 3, 4, 5];
    const oldIndex = 0;
    const newIndex = 2;

    const result = arrayMove(arr, oldIndex, newIndex);

    expect(result).toEqual([2, 3, 1, 4, 5]);
  });
});
