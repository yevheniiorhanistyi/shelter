export const arraysHaveSimilar = (arr1, arr2) => {
  return arr1.every(value => arr2.indexOf(value) === -1) && arr2.every(value => arr1.indexOf(value) === -1);
}