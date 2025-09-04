export function parseUrl(input) {
  if (!input) return '';

  let url = input.trim();

  if (url.startsWith('https://')) {
    url = url.slice(8);
  } else if (url.startsWith('http://')) {
    url = url.slice(7);
  }

  url = url.replace(/\/+$/, '');

  return url;
}
