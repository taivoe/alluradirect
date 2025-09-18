/* "Hello\nWorld" -> "Hello<br/>World"
  Useful for string values obtained from the MultilineFormField component
*/
export const stringNewlinesToBrTags = (text: string) => {
  if (!text) return '';
  const newlineText = text.split('\n').map(textLine => (textLine.length === 0 ? '<br/>' : textLine));

  return newlineText.join('<br/>');
};

export function toDecimal(text: string, decimalPlaces = 2) {
  const floatValue = parseFloat(text);
  const isValid = !Number.isNaN(floatValue);

  return isValid ? floatValue.toFixed(decimalPlaces).toString() : 'invalid value';
}

export function hasContent(str: string): boolean {
  if (!str) return false;

  return str.length !== 0;
}

export const truncate = (text: string, length: number) => {
  if (!text) return '';

  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  } else return text;
};

export const handleStripHTML = (str: string): string => {
  try {
    if (typeof str !== 'string' || str?.length === 0) {
      return '';
    } else {
      return str
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/&nbsp;/g, '')
        .replace(/&amp;/g, '&');
    }
  } catch (e) {
    return '';
  }
};

// Source: https://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not/15458987
export const isStringHTMLString = (str: string) => {
  return /<[a-z/][\s\S]*>/i.test(str);
};

// This function will strip all HTML and empty spaces
export const handleStripHTMLAndSpaces = (string: string): string => {
  const stripHTML = handleStripHTML(string) ?? '';

  return stripHTML.replace(/ /g, '');
};

/**  Turn a string into first-letter of each word capitalized, rest lowercase form
 *  Example: "TEST" -> "Test", "abc" -> "Abc", "all right" -> "All Right"
 */
export function capitalize(str: string): string {
  if (!str || str?.trim()?.length === 0) {
    return '';
  }

  const trimmedStr = str.trim();

  const words = trimmedStr.split(' ');
  if (words.length > 1) {
    return words.map(word => capitalize(word)).join(' ');
  }

  const [first, ...rest] = trimmedStr;

  return first.toUpperCase() + rest.map(str => str.toLowerCase()).join('');
}

export const snakeCaseToSpace = (s: string): string => {
  return s.replace(/[_-]+/g, ' ');
};

export function pluralize(count: number, text: string, pluralizationAffix = 's'): string {
  if (!text || text?.trim()?.length === 0) return '';

  const isPlural = count !== 1;
  const affix = isPlural ? pluralizationAffix : '';

  return `${text}${affix}`;
}

/** This is used when looking to provide a singular or plural display. For instance 1 Bathroom vs 2 Bathrooms */
export function generateCountString(count: number, text: string, pluralizationAffix = 's'): string {
  if (!text || text?.trim()?.length === 0) return '';

  const pluralForm = pluralize(count, text, pluralizationAffix);

  return `${count} ${pluralForm}`;
}
