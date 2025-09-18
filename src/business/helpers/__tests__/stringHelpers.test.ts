import { capitalize, generateCountString, pluralize } from '../stringHelpers';

describe(capitalize.name, () => {
  it('Should return an empty string when argument str is not defined', () => {
    const res = capitalize(null as any);
    expect(res).toEqual('');
  });

  it('Should return an empty string when argument str is an empty string', () => {
    const res = capitalize('');
    expect(res).toEqual('');
  });

  it('Should capitalize an all lowercase string', () => {
    const res = capitalize('testing');
    expect(res).toEqual('Testing');
  });

  it('Should fix casing for a string with other letters capitalized', () => {
    const res = capitalize('tESTING');
    expect(res).toEqual('Testing');
  });

  it('Should capitalize the first letter of each word when multiple words entered in a string', () => {
    const res = capitalize('welcome home');
    expect(res).toEqual('Welcome Home');
  });
});

describe(pluralize.name, () => {
  const defaultText = 'Adult';

  it('pluralizes numbers >1', () => {
    for (let i = 2; i < 10; i++) {
      const res = pluralize(i, defaultText);
      expect(res).toEqual(`${defaultText}s`);
    }
    const largeNumber = 1952;
    const res = pluralize(largeNumber, defaultText);
    expect(res).toEqual(`${defaultText}s`);
  });

  it('pluralizes numbers <1', () => {
    for (let i = 0; i > -10; i--) {
      const res = pluralize(i, defaultText);
      expect(res).toEqual(`${defaultText}s`);
    }
    const largeNumber = -60234;
    const res = pluralize(largeNumber, defaultText);
    expect(res).toEqual(`${defaultText}s`);
  });

  it('does not pluralize 1', () => {
    const res = pluralize(1, defaultText);
    expect(res).toEqual(`${defaultText}`);
  });

  it('pluralizes with a different affix', () => {
    const res = pluralize(2, 'Child', 'ren');
    expect(res).toEqual('Children');
  });
});

describe(generateCountString.name, () => {
  const defaultText = 'Adult';

  it('pluralizes and displays count', () => {
    for (let i = 0; i < 10; i++) {
      const res = generateCountString(i, defaultText);
      if (i === 1) {
        expect(res).toEqual(`${i} ${defaultText}`);
      } else {
        expect(res).toEqual(`${i} ${defaultText}s`);
      }
    }
  });
});
