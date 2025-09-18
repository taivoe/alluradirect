// you can't use "enum" as a type, so use this.
type EnumType = { [s: number]: string };

const getEnumMembers = (enumerable: EnumType) => {
  return Object.keys(enumerable).map(key => enumerable[key as any]);
};

// TODO: test
export const getEnumValues = (enumerable: EnumType) => {
  const enumMembers = getEnumMembers(enumerable);

  // we are only interested in the numeric identifiers as these represent the values
  const enumValues: string[] = enumMembers.filter(v => typeof v === 'number');

  return enumValues;
};

// TODO: test
export const getEnumKeys = (enumerable: EnumType) => {
  const enumMembers = getEnumMembers(enumerable);

  // we are only interested in the string identifiers as these represent the values
  const enumValues: string[] = enumMembers.filter(v => typeof v === 'string');

  return enumValues;
};
