export const generateNestedComputedValue = (path: string, obj: { [key: string]: any }): any => {
  const isNested = path.includes('.');
  const [head, ...rest] = path.split('.');
  const remainingPath = rest.join('.');

  return isNested ? generateNestedComputedValue(remainingPath, obj[head]) : obj[path];
};
