import { handleStripHTML } from '../helpers/stringHelpers';

describe('Strip HTML', () => {
  it('Returns an empty string when null', () => {
    expect(handleStripHTML(null as unknown as string)).toBe('');
  });
  it('Returns an empty string when given an empty string', () => {
    expect(handleStripHTML('')).toBe('');
  });
  it('Removes &amp;', () => {
    expect(handleStripHTML('&amp;')).toBe('&');
  });
  it('Removes "test &amp;"', () => {
    expect(handleStripHTML('test &amp;')).toBe('test &');
  });
  it('Removes <p>', () => {
    expect(handleStripHTML('<p>')).toBe('');
  });
  it('Removes &nbsp;', () => {
    expect(handleStripHTML('<p>')).toBe('');
  });
  it('Removes <p> </p> while leaving internal string;', () => {
    expect(handleStripHTML('<p> inner </p>')).toBe(' inner ');
  });
});
