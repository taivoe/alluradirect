import { email, htmlRequired } from '../baseSchemas';

const tests = [
  { value: '', isValid: false },
  { value: '1', isValid: true },
  { value: '1 1', isValid: true },
  { value: '<br/>', isValid: false },
  { value: '<br/>1', isValid: true },
  { value: '<br/><br/><p>', isValid: false },
  { value: '<p><br/></p>', isValid: false },
];

describe('Validation Tests', () => {
  tests.map(({ value, isValid }) => {
    it(`"${value}" - Is Valid : ${isValid ? 'True' : 'False'}`, async () => {
      const isTestValid = await htmlRequired(5000).isValid(value);
      expect(isTestValid).toBe(isValid);
    });
  });
});

describe('email validation schema', () => {
  it('is invalid when passed an empty string', async () => {
    const res = await email.isValid('');
    expect(res).toBe(false);
  });

  it('is valid when passed shortest possible email address', async () => {
    const res = await email.isValid('y@x.c');
    expect(res).toBe(true);
  });

  it('is invalid when passed invalid email address', async () => {
    const res = await email.isValid('y@x');
    expect(res).toBe(false);
  });
});
