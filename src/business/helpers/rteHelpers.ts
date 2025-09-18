export function replaceEmptyRteHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  if (html?.length === 0) {
    return '';
  }

  return html.replace('<p><br/></p>', '');
}
